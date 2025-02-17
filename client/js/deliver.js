import { getAllNeeds, getDisasterById, setNeedStatus} from './server-interface.js';

/**************************************************************************
*   The use of Enumeration types help minitage SQL syntax-related errors
*   See fema.sql so see SQL Enum implementation. 
*   So, it seems, Enums need to be implemented in many different languages. 
*   In PHPmyAdmin, this results in a dropdown menu for this field in 
*   needs table. HB
***************************************************************************/

const NEED_STATUS = { 
    IN_WAREHOUSE: 'in_warehouse',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered'
};

document.addEventListener('DOMContentLoaded', async function() {
    let needs = await getAllNeeds()
    for (const need of needs){
        await addNeedsRow(need)
    }
})

/************************************************************************ 
*   jquery was, essentially required here. It is used to asign "metadata"
*   to specific buttons in the table indicating need membership.
*
*   This metadata is then used to update the database. HB
*************************************************************************/
// Wondering why we use jquery here: "<td id="quantity-${need.id}" data-need_id="${need.need.id}">${need.quantity_filled}</td>"" HB

async function addNeedsRow(need){
    let disaster = await getDisasterById(need.disaster_id)
    disaster = disaster[0] // TODO: Find better way to index this. HB
    if (!disaster) return
    if (!disaster.city) return
    if (!disaster.type) return
    if(need.status == NEED_STATUS.IN_WAREHOUSE || need.status == NEED_STATUS.IN_TRANSIT) {
        let dataCells = `<tr scope="row" class="need-row-${need.id}">
                            <td>${need.name}</td>
                            <td id="quantity-${need.id}" data-need_id="${need.id}">${need.quantity_filled}</td>
                            <td id="warehouse-${need.id}" data-need_id="${need.id}">${need.warehouse}</td>
                            <td id="destination-${need.id}" data-need_id="${need.id}">${disaster.city}</td>
                            <td id="disaster-${need.id}" data-need_id="${need.id}">${disaster.type}</td>
                            <td>
                                <button type="button" class="btn btn-primary" data-need_id="${need.id}" id="pick-up-${need.id}">Pick Up</button>
                                <button type="button" class="btn btn-success" data-need_id="${need.id}" id="deliver-${need.id}">Mark Delivered</button>
                            </td>
                        </tr>`
                   
        $('#needs-table').append(dataCells)
        updateButtons(need, need.status)

        $(`#pick-up-${need.id}`).on('click', async function() {
            await updatePage(need, NEED_STATUS.IN_TRANSIT)
        })

        $(`#deliver-${need.id}`).on('click', async function() {
            await updatePage(need, NEED_STATUS.DELIVERED)
        })
    }
}

// Trying to order functions in order of their abstraction per Uncle Bob. HB
async function updatePage(need, status) {
    try {
        await setNeedStatus(need, status)
        updateButtons(need, status)
        if (status == NEED_STATUS.DELIVERED) {
            location.reload()
        }
    } catch(error){
        console.log(error)
    }
}

function updateButtons(need, status) {
    if (status == NEED_STATUS.IN_WAREHOUSE) {
        // Use of bootstrap to disable and enable buttons here. HB
        $(`#deliver-${need.id}`).prop('disabled', true)
        $(`#pick-up-${need.id}`).prop('disabled', false)
    } else if (status == NEED_STATUS.IN_TRANSIT) {
        // And here. HB
        $(`#deliver-${need.id}`).prop('disabled', false)
        $(`#pick-up-${need.id}`).prop('disabled', true)
    }
}


