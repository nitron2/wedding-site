
// TODO: Look into this: Not sure if it's better to throw everything inside the DOMConentLoaded listener or not. HB
document.addEventListener('DOMContentLoaded', function() {
    const needs = document.getElementById('needs');
    let rowCount = 1;

    // Form submission handling.  HB
    /*
    *   This form is designed in such a way that disaster basic info, needs, and image
    *   can all be added on the same page. Initial testing saw this uploading in multiple parts
    *   and it was both less user-friendly and hard to debug.
    * 
    *   The ability to append many items in one form submission is very useful here,
    *   as we are using Multer, a multipart form submission library.
    */
    document.getElementById('createDisasterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        const city = document.getElementById('city').value
        const type = document.getElementById('type').value
        console.log('city:' + city)
        formData.append('city', city)
        formData.append('type', type)
    
        const tableData = [];
        const rows = document.querySelectorAll('#needs tr');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const rowData = [];
            inputs.forEach(input => {
                // Push the value of the input, or an empty string if the input is null
                rowData.push(input.value || '');
            });
            tableData.push(rowData);
        });
  
        formData.append('tableData', JSON.stringify(tableData)); // Add table data as a string
         
        // TODO: Refactor this to be inside of server-intferface.js, like the rest of the 
        // front end. HB
        console.log("FormData:" + formData);
        // TODO: Un hard-code localhost:port.
        fetch('http://127.0.0.1:5003/create-disaster', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert('Everything uploaded successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error uploading data');
        });
    });

    // Driver code for visually allowing to add multiple needs in a table.
    needs.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT') {
            addNewRowIfNeeded();
        }
    });

    // Note, inputs are not set to required, as adding need to diaster is optional HB
    function addNewRowIfNeeded() {
        const lastRow = needs.querySelector('tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        const allFilled = Array.from(inputs).every(input => input.value !== '');
        
        if (allFilled) {
            rowCount++;
            const newRow = needs.insertRow(-1);
            const newCell1 = newRow.insertCell(0);
            const newCell2 = newRow.insertCell(1);
    
            newCell1.innerHTML = `<input type="text" id="need${rowCount}-name">`;
            newCell2.innerHTML = `<input type="text" id="need${rowCount}-quantity">`;
        }
    }

});


  