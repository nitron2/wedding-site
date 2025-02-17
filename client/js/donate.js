import { getDisasterImageBlob, getAllNeedsOfADisaster, submitDonations, getDisasterById} from './server-interface.js'

let donations = []

document.addEventListener('DOMContentLoaded', async function() {
    // Function to create cards in the cardContainer

    // Create URLSearchParams object from the current URL's query string
    const params = new URLSearchParams(window.location.search);

    // Get the value of the 'data' parameter
    const disasterId = params.get('disasterId');

    // Optionally, you can display the data on the page
    // Ensure you have an element with the id 'dataDisplay' in your HTML
    if (disasterId) {
        // Decare Decall Define  
        let disaster = await getDisasterById(disasterId)
        disaster = disaster[0] //TODO: Find a better way to inex this. HB
        let cityParagraph = document.getElementById('city')
        let typeParagraph = document.getElementById('type')
        let disasterImage = document.getElementById('disaster-image')
        let blob = await getDisasterImageBlob(disaster)
        const imageObjectURL = URL.createObjectURL(blob)
        const imageElement = document.createElement('img')
        let needs = await getAllNeedsOfADisaster(disaster)

        cityParagraph.textContent = disaster.city
        typeParagraph.textContent = disaster.type
    
        imageElement.src = imageObjectURL
        disasterImage.src = imageObjectURL 
    
        for (const need of needs){
            addNeedsRow(need)
        }
    }
})

// Define
function addNeedsRow(need){
    let row = `<tr scope="row" class="need-row-${need.id}">
                    <td>${need.name}</td>
                    <td id="quantity-${need.id}" data-need_id="${need.id}">${need.quantity_filled} / ${need.quantity_max}</td>
                    <td>
                        <button class="btn btn-secondary" data-need_id="${need.id}" id="donate-one-${need.id}">+1</button>
                        <button class="btn btn-secondary" data-need_id="${need.id}" id="donate-twenty-five-${need.id}">+25</button>
                        <button class="btn btn-primary" data-need_id="${need.id}" id="donate-fifty-${need.id}">+50</button>
                        <button class="btn btn-danger" data-need_id="${need.id}" id="donate-one-hundred-${need.id}">+100</button>
                    </td>
                </tr>` 
    $('#needs-table').append(row)

    $(`#donate-one-${need.id}`).on('click', function() {addDonation(need.id, 1)})
    $(`#donate-twenty-five-${need.id}`).on('click', function() {addDonation(need.id, 25)})
    $(`#donate-fifty-${need.id}`).on('click', function() {addDonation(need.id, 50)})
    $(`#donate-one-hundred-${need.id}`).on('click', function() {addDonation(need.id, 100)})
}

async function addDonation(needId, amountToAdd){
    let quantityHtmlElement = $(`#quantity-${needId}`)
    let currentNeedQuantityText = quantityHtmlElement.text()
    let indexOfSlash = currentNeedQuantityText.indexOf("/");
    if (indexOfSlash !== -1) {
        let quantityMax = parseInt(currentNeedQuantityText.substring(indexOfSlash + 2), 10) //Gets "int5000" from "100 / 5000"
        let quantityInitial = parseInt(currentNeedQuantityText.substring(0, indexOfSlash -1), 10) //Gets "int100" from "100 / 5000"
        if (quantityInitial < quantityMax) {
            let quantityNew = quantityInitial + amountToAdd
            if (quantityNew >= quantityMax) {
                quantityNew = quantityMax
                amountToAdd = quantityMax - quantityInitial
            }
            quantityHtmlElement.text(quantityNew + " / " + quantityMax)
            donations.push([needId, amountToAdd])
        }
    } else {
        console.log("Character not found in string.")
    }
}


$(`#done`).on('click', function() {
    try{
        submitDonations(donations)
        window.location.href = 'index.html';
    } catch(error) {
        location.reload()
    }
})

