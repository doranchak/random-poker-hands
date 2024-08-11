const cardContainer = document.getElementById('card-container');
const freezeButton = document.getElementById('freezeButton');

let intervalId;
let freeze = false;
const predeterminedHands = [
    [2, 3, 4, 5, 6],
    [22, 23, 24, 25, 13],
];
let phIndex = 0;
const cardImages = []; // Array to store preloaded images
const MS = 100;

function preloadImages() {
    for (let i = 0; i < 52; i++) {
        const img = new Image();
        img.src = `front-${i}.png`;
        cardImages.push(img);
    }
}

function getRandomCardImage() {
    const randomIndex = Math.floor(Math.random() * 52);
    return cardImages[randomIndex].src;
}

function dealRandomCards() {
    if (freeze) return;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.backgroundImage = `url(${getRandomCardImage()})`;
    });
}

function freezeDeal() {
    freeze = !freeze;

    if (freeze) {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.backgroundImage = `url(${cardImages[predeterminedHands[phIndex][index]].src})`;
        });
    
        clearInterval(intervalId);
        freezeButton.innerHTML = "Unfreeze";
        phIndex = (phIndex + 1) % predeterminedHands.length;
    } else {
        intervalId = setInterval(dealRandomCards, MS);
        freezeButton.innerHTML = "Freeze Deal";

    }
}

freezeButton.addEventListener('click', freezeDeal);

// Preload images and start the animation after loading is complete
window.onload = () => {
    preloadImages();
    intervalId = setInterval(dealRandomCards, MS);
};
