function showNextFormTest(a, b) {
    for (var i = 1; i <= 10; i++) { // Assuming you have 10 forms, adjust if needed
        var formID = document.getElementById("form" + a + i);

        if (formID) {
            formID.style.display = i === b ? "block" : "none";
        }
    }
}

function resetPage() {
    // Reload the current page
    location.reload();
}

function createListItem(selectedRadioBtn) {
    var numberOfItems = 5;

    // Get the <ul> element by its ID
    var myList = document.getElementById("vList" + selectedRadioBtn.charAt(selectedRadioBtn.length - 1));


    // Clear existing items in the list
    myList.innerHTML = "";

    // Create and append <li> elements to the <ul>
    for (var i = 1; i <= numberOfItems; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = "Item " + i + " - " + selectedRadioBtn;
        myList.appendChild(listItem);
    }
}

// Event listener for radio buttons
document.querySelectorAll('input[name="optionsBttn"]').forEach(function(radioBtn) {
    radioBtn.addEventListener("change", function() {
        // Your code here when the radio button state changes
        createListItem(this.id);
    });
});

