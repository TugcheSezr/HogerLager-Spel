const spelers = [ //Hier komt alle spelers
    { naam: "Speler 1", punten: 0 },
    { naam: "Speler 2", punten: 0 },
    { naam: "Speler 3", punten: 0 },
    { naam: "Speler 4", punten: 0 },
    { naam: "Speler 5", punten: 0 },
    { naam: "Speler 6", punten: 0 }
];

//Hier gaat spelerkeuze
let computerDobbelsteen, spelerKeuze = null, huidigeSpelerIndex = 0;

//Speler informatie in de gebruikersinterface tonen
const spelersContainer = document.getElementById('spelers-container');

const dobbelsteenGooiButton = document.getElementById('dobbelsteen-gooi');
const goButton = document.getElementById('go');
const hogerButton = document.getElementById('hoger'); 
const lagerButton = document.getElementById('lager');
const resultaatDiv = document.getElementById('resultaat');

// Spelers tonen in de interface
function spelersTonen() {
    spelersContainer.innerHTML = '';
    spelers.forEach(speler => {
        const spelerDiv = document.createElement('div');
        spelerDiv.classList.add('speler');
        spelerDiv.innerHTML = `${speler.naam}: ${speler.punten} punten`;
        spelersContainer.appendChild(spelerDiv);
    });
}

// Dobbelsteen gooien functie
function dobbelsteenGooien() {
    return Math.floor(Math.random() * 6) + 1;
}

// Klikken naar ga button
goButton.addEventListener('click', () => {
    computerDobbelsteen = dobbelsteenGooien(); // dobbelsteen computer
    dobbelsteenGooiButton.disabled = false; // aktiveer button
    goButton.disabled = true; // activeer ga button
});

// Dobbelsteen gooien
dobbelsteenGooiButton.addEventListener('click', () => {
    const spelerDobbelsteen = dobbelsteenGooien(); // speler gooit een dobbelsteen
    //HTML code voegen toe de JS
    resultaatDiv.innerHTML = `<div class="dobbelsteen" style="animation: roll 1s;">${spelerDobbelsteen}</div>`;
    
    // Maak het hoger of lager button actief
    hogerButton.disabled = false;
    lagerButton.disabled = false;

    dobbelsteenGooiButton.disabled = true; // Maak de dobbelsteen inactief
});

// Klik op hoger button
hogerButton.addEventListener('click', () => {
    spelerKeuze = 'hoger';
    beslissing();
});

// Klik op lager button
lagerButton.addEventListener('click', () => {
    spelerKeuze = 'lager';
    beslissing();
});

// Bepaald de winnaar
function beslissing() {
    hogerButton.disabled = true; // Maak de hoger button inactief
    lagerButton.disabled = true; // Maak de lager button inactief
 
     // spelers kiezen controleren hoger of lager
    if ((spelerKeuze === 'hoger' && computerDobbelsteen > 3) || 
        (spelerKeuze === 'lager' && computerDobbelsteen <= 3)) {
        
        // als de speler verliest
        resultaatDiv.innerHTML += `<br><strong style = "color:lightgreen;">${spelers[huidigeSpelerIndex].naam} heeft goede raad gegeven! De computer heeft verloren. Daarom krijg een punt! </strong>`;
        spelers[huidigeSpelerIndex].punten++; // speler krijg 1 punt
    } else{
        // als de speler verliest
        resultaatDiv.innerHTML += `<br><strong style = "color:red;"> ${spelers[huidigeSpelerIndex].naam} heeft foute raad gegeven! De computer heeft gewonnen. Daarom drink een drankje! </strong>`;
    }

    // Spelers controleren
    huidigeSpelerIndex++;
    if (huidigeSpelerIndex >= spelers.length) {
        huidigeSpelerIndex = 0; // Ga naar start
    }

    // Als een speler 5 punt gehaald
    if (spelers.some(speler => speler.punten >= 5)) {
        let winnaar = spelers.find(speler => speler.punten >= 5);
        resultaatDiv.innerHTML += `<br><strong style = "color:cyan;"> ${winnaar.naam} heeft het spel gewonnen met 5 punten! Je mag iemand kiezen om een drankje te drinken!</strong>`;
        dobbelsteenGooiButton.disabled = true; // Als het spel klaar is, maakt het button inactief

        // Resetten om het spel opnieuw te starten
        const opnieuwButton = document.createElement('button');
        opnieuwButton.innerHTML = '&#x21bb; Speel opnieuw';
        opnieuwButton.classList.add('opnieuw-button');
        resultaatDiv.appendChild(opnieuwButton);

        // button om aan het spel opnieuw te starten
        opnieuwButton.addEventListener('click', resetSpel);
    } else {
        goButton.disabled = false; // Activeer nog een keer ga button
    }

    // Spelers update
    spelersTonen();
}

// het spel resetten
function resetSpel() {
    // resetten alle spelers punten
    spelers.forEach(speler => {
        speler.punten = 0; // op hier gaat resetten
    });

    // Het spel komt opnieuw starten
    resultaatDiv.innerHTML = '';
    huidigeSpelerIndex = 0;
    goButton.disabled = false;
    dobbelsteenGooiButton.disabled = true;
    
    // Gaat komen dat alle spelers punten zoals de begin
    spelersTonen();
}
// spelers zien wanneer het spel begint.
spelersTonen();