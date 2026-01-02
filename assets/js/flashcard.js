const params = new URLSearchParams(window.location.search);
const subject = params.get("subject") || "HTML";
const flashcardsData = {
  HTML: [
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "What is the purpose of HTML?", answer: "To structure content on the web" },
    { question: "What is a hyperlink?", answer: "A link to another page or resource" },
    { question: "What is semantic HTML?", answer: "HTML that conveys meaning, e.g., header, article" },
    { question: "Why is HTML important?", answer: "It is the backbone of all web pages" }
  ],
  CSS: [
    { question: "What does CSS stand for?", answer: "Cascading Style Sheets" },
    { question: "What is the purpose of CSS?", answer: "To style and layout HTML elements" },
    { question: "Difference between inline, internal, and external CSS?", answer: "Different ways to apply styles to HTML" },
    { question: "What is the difference between relative and absolute positioning?", answer: "Relative moves element relative to normal position; absolute positions it with respect to parent or page" },
    { question: "What is the difference between 'id' and 'class' selectors?", answer: "'id' is unique per page; 'class' can be reused" }
  ],
  JavaScript: [
    { question: "What is JavaScript used for?", answer: "To add interactivity to web pages" },
    { question: "Difference between var, let, and const?", answer: "'var' is function-scoped; 'let' and 'const' are block-scoped; 'const' cannot be reassigned" },
    { question: "What is an event in JavaScript?", answer: "An action that occurs in the browser, like click or keypress" },
    { question: "What is a function?", answer: "A block of code designed to perform a particular task" },
    { question: "Difference between == and ===?", answer: "== compares values; === compares value and type" }
  ],
  Java: [
    { question: "What is Java?", answer: "A high-level, object-oriented programming language" },
    { question: "Why is Java platform-independent?", answer: "Because of the Java Virtual Machine (JVM)" },
    { question: "What is a class in Java?", answer: "A blueprint for creating objects" },
    { question: "What is an object in Java?", answer: "An instance of a class" },
    { question: "What is inheritance?", answer: "A mechanism where one class acquires the properties of another class" }
  ],
  Python: [
    { question: "What is Python?", answer: "A high-level, interpreted programming language" },
    { question: "What are Python’s key features?", answer: "Simple syntax, dynamically typed, interpreted, and versatile" },
    { question: "What is a list in Python?", answer: "An ordered collection of items" },
    { question: "What is a function in Python?", answer: "A block of reusable code to perform a task" },
    { question: "What is a module in Python?", answer: "A file containing Python definitions and functions to be used in other programs" }
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

