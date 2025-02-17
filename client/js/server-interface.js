/**
 *  This file exists to make all other client-side code cleaner.
 *  
 *  According to this Medium article:
 * 
 *  https://medium.com/swlh/restful-api-design-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-e37a8416e2a0
 *  the GET method is the only one that does not require 
 *   header and body specifications, but I don't do this at all in my non GET methods. Research this further.  HB
 * 
 *  */ 

//TODO: Undo hard coding for host and port for all of these!
export async function getAllDisasters() {
    try {
        const response = await fetch('http://127.0.0.1:5003/get-all-disasters');
        const data = await response.json(); // Parse the JSON from the response
        return Object.values(data)[0]; // Assuming the structure needs this
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

//TODO: Un hard-code localhost:port. HB
export async function getAllNeeds() {
    try {
        const response = await fetch('http://127.0.0.1:5003/get-all-needs')
        const data = await response.json(); // Parse the JSON from the response
        return Object.values(data)[0]; // Assuming the structure needs this
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

//TODO: Un hard-code localhost:port. HB
export async function getDisasterImageBlob(disaster) {
    try {
        console.log("Dis:" + disaster.picture)
        const response = await fetch(`http://127.0.0.1:5003/get-disaster-image?imageName=${encodeURIComponent(disaster.picture)}`);
        const blob = await response.blob(); // Parse the JSON from the response
        return blob;
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

// TODO: refactor the name of this to  getAllNeedsByDisaster()
export async function getAllNeedsOfADisaster(disaster) {
    try {
        const response = await fetch(`http://127.0.0.1:5003/get-all-needs-of-a-disaster?disasterId=${encodeURIComponent(disaster.id)}`);
        const data = await response.json(); // Parse the JSON from the response
        return Object.values(data)[0]; // Assuming the structure needs this
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

//TODO: Un hard-code localhost:port. HB
export async function getDisasterById(disasterId) {
    try {
        const response = await fetch(`http://127.0.0.1:5003/get-disaster-by-id?disasterId=${encodeURIComponent(disasterId)}`);
        const data = await response.json(); // Parse the JSON from the response
        return Object.values(data)[0]; // Assuming the structure needs this
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

//TODO: Un hard-code localhost:port. HB
export async function submitDonations(donations) {
    await fetch('http://127.0.0.1:5003/submit-donations', {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donations),
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => console.log(data)) // Log the response data
        .catch((error) => {
            console.log('Error:', error);}
        );
}

//TODO: Un hard-code localhost:port. HB
export async function setNeedStatus(need, status) {
    fetch("http://127.0.0.1:5003/set-need-status", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id' : need.id,
            'status' : status
        })    
    })
    .then(response => {
        console.log('Raw response:', response);
        return response.json()
    })
    .catch((error) => console.log('Error:', error))
}
