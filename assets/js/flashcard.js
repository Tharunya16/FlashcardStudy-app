const params = new URLSearchParams(window.location.search);
const subject = params.get("subject") || "HTML";
const flashcardsData = {
  HTML: [
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "Tag used for links?", answer: "<a>anchor tag" }
  ],
  CSS: [
    { question: "What does CSS stand for?", answer: "Cascading Style Sheets" },
    { question: "Property for text color?", answer: "color" }
  ],
  JavaScript: [
    { question: "JS is interpreted or compiled?", answer: "Interpreted" },
    { question: "Function syntax?", answer: "function myFunc() {}" }
  ]
};

let currentIndex = 0;
const cards = flashcardsData[subject] || [];
const flashcardDiv = document.getElementById("flashcard");

function showCard() {
  if (!flashcardDiv) return;

  if (cards.length === 0) {
    flashcardDiv.innerHTML = "No flashcards available";
    return;
  }

  const card = cards[currentIndex];
  flashcardDiv.classList.remove("flipped");

  flashcardDiv.innerHTML = `
    <div class="question">${card.question}</div>
    <div class="answer">${card.answer}</div>
    <button class="flip-btn" type="button">Flip</button>
  `;

  const flipBtn = flashcardDiv.querySelector(".flip-btn");
  flipBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    flashcardDiv.classList.toggle("flipped");
  });
}

function nextCard() {
  if (!flashcardDiv) return;
  currentIndex = (currentIndex + 1) % cards.length;
  showCard();
}

function backCard() {
  if (!flashcardDiv) return;
  if (flashcardDiv.classList.contains("flipped")) {
    flashcardDiv.classList.remove("flipped");
    return;
  }

  if (currentIndex > 0) {
    currentIndex = currentIndex - 1;
    showCard();
  } else {
    window.location.href = "flashcard-subjects.html";  
  }
}

if (flashcardDiv) {
  showCard();
}

// Create own card code
let flashcardsData2 = {
  HTML: [ { question: "What does HTML stand for?", answer: "HyperText Markup Language" } ],
  CSS: [ { question: "What does CSS stand for?", answer: "Cascading Style Sheets" } ]
};

const modal = document.getElementById("createCardModal");
const openBtn = document.getElementById("createCardBtn");
const closeBtn = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveCardBtn");

if (openBtn && modal) {
  openBtn.onclick = () => { modal.style.display = "flex"; };
}
if (closeBtn && modal) {
  closeBtn.onclick = () => { modal.style.display = "none"; };
}

if (saveBtn) {
  saveBtn.onclick = () => {
    const subject = document.getElementById("subjectInput")?.value.trim();
    const question = document.getElementById("questionInput")?.value.trim();
    const answer = document.getElementById("answerInput")?.value.trim();

    if (subject && question && answer) {
      if (flashcardsData2[subject]) {
        flashcardsData2[subject].push({ question, answer });
      } else {
        flashcardsData2[subject] = [{ question, answer }];
      }

      alert("Card added successfully! ");

      document.getElementById("subjectInput").value = "";
      document.getElementById("questionInput").value = "";
      document.getElementById("answerInput").value = "";

      modal.style.display = "none";
    } else {
      alert("Please fill all fields!");
    }
  };
}

window.onclick = (e) => {
  if (modal && e.target === modal) modal.style.display = "none";
};

