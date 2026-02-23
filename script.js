const flashcards = [
    { question: "¿Capital de Francia?", answer: "París" },
    { question: "¿2 + 2?", answer: "4" },
    { question: "¿Lenguaje para páginas web?", answer: "HTML" }
];

let currentIndex = 0;

const front = document.getElementById("front");
const back = document.getElementById("back");
const card = document.getElementById("card");
const progress = document.getElementById("progress");

function showCard() {
    front.textContent = flashcards[currentIndex].question;
    back.textContent = flashcards[currentIndex].answer;
    progress.textContent = `Tarjeta ${currentIndex + 1} de ${flashcards.length}`;
    card.classList.remove("flipped");
}

card.addEventListener("click", () => {
    card.classList.toggle("flipped");
});

function nextCard() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        showCard();
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        showCard();
    }
}

showCard();