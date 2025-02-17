import { getAllDisasters, getAllNeedsOfADisaster, getDisasterImageBlob } from './server-interface.js'

document.addEventListener('DOMContentLoaded', async function() {
    const disasters = await getAllDisasters();
    console.log("disasters: " + disasters)
    console.log(disasters[0])
    if (disasters) {
         initializeBlankCards('cardContainer', disasters.length)
        await populateDisasterCards(disasters)
    }
})
    
function initializeBlankCards(containerId, numberOfCards) {
    var cardContainer = document.getElementById(containerId);
    for (var i = 1; i <= numberOfCards; i++) {
        var card = document.createElement('div');
        card.className = 'card';

        cardContainer.appendChild(card);
    }
}

/**
 *  All elements that query database or any part of back-end 
 *  for data should be asyncronous. HB
 */

async function populateDisasterCards(disasters) {
    for (let i = 0; i <= disasters.length; i++) { 
        let disaster = disasters[i]
        let card = document.getElementById('cardContainer').querySelector(`.card:nth-child(${i+1})`);
        if (disaster && card) {
            createDisasterCard(card, disaster)
        }
    }
}

async function createDisasterCard(card, disaster) {
    let cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    addHeaderToCard(cardContainer, disaster.city)
    addHeaderToCard(cardContainer, disaster.type)
    await addImageToCard(cardContainer, disaster)
    await addNeedsToCard(cardContainer, disaster)
    addDonateButtonToCard(disaster.id, cardContainer)
    card.appendChild(cardContainer);
}

function addHeaderToCard(cardContainer, text) {
    let paragraph = document.createElement('p');
    paragraph.textContent = text;
    cardContainer.appendChild(paragraph);
}

async function addImageToCard(cardContainer, disaster) {
    let blob = await getDisasterImageBlob(disaster)
    const imageObjectURL = URL.createObjectURL(blob)
    const imageElement = document.createElement('img')
    imageElement.src = imageObjectURL
    cardContainer.appendChild(imageElement)
}

async function addNeedsToCard(cardContainer,disaster) {
    let needs = await getAllNeedsOfADisaster(disaster)
    if (needs) {
        for(const need of needs) {
            console.log('need:')
            console.log(need)
            let needParagraph = document.createElement('p');
            needParagraph.textContent = need.name + ": " + need.quantity_filled + "/" + need.quantity_max;
            cardContainer.appendChild(needParagraph);
        }
    }
}

function addDonateButtonToCard(disasterId, cardContainer) {
    let donate = document.createElement('button');
    donate.textContent = "Donate";
    donate.addEventListener('click', function() {
        window.location.href = `donate.html?disasterId=${encodeURIComponent(disasterId)}`;
    });
    cardContainer.appendChild(donate);
}
    


    