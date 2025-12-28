function signup() {
  let email = document.getElementById("signupEmail")?.value.trim();
  let password = document.getElementById("signupPassword")?.value.trim();
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      alert("Email already registered");
      return;
    }
  }
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", email);

  alert("Signed up successfully!");
  window.location.href = "dashboard.html";
}
function login() {
  let email = document.getElementById("loginEmail")?.value.trim();
  let password = document.getElementById("loginPassword")?.value.trim();

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      localStorage.setItem("currentUser", email);
      alert("Login successful!");
      window.location.href = "dashboard.html";
      return;
    }
  }

  alert("Wrong email or password");
}

// Navigation code
function goFlashcardSubjects() {
  window.location.href = "flashcard-subjects.html";
}

function goToFlashcards(subjectName) {
  window.location.href = `flashcards.html?subject=${subjectName}`;
}

function goToCreateYourOwn() {
  window.location.href = "create-subject.html";
}

function goQuiz() {
  window.location.href = "quiz.html";
}

//  Logout code
function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out!");
  window.location.href = "../index.html";
}

// Flashcard logic
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

//code for quiz
document.addEventListener("DOMContentLoaded", () => {

  const quizData = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Tool Markup Language",
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Transfer Markup Language"
      ],
      correct: 1
    },
    {
      question: "Which tag is used for links?",
      options: ["<a>anchor", "paragraph", "division", "span"],
      correct: 0
    },
    {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax",
      "Computer Style Sheet"
    ],
    correct: 0
  },
  {
    question: "Property to change text color?",
    options: ["color", "font-color", "text-color", "background-color"],
    correct: 0
  },

  {
    question: "Which keyword declares a variable in JS?",
    options: ["var", "let", "const", "All of the above"],
    correct: 3
  },
  {
    question: "How do you write a function in JS?",
    options: [
      "function myFunc() {}",
      "def myFunc():",
      "func myFunc() {}",
      "function:myFunc()"
    ],
    correct: 0
  },

  {
    question: "How do you declare a variable in Python?",
    options: [
      "var x = 5",
      "x = 5",
      "int x = 5",
      "let x = 5"
    ],
    correct: 1
  },
  {
    question: "How to define a function in Python?",
    options: [
      "def myFunc():",
      "function myFunc() {}",
      "func myFunc():",
      "myFunc def():"
    ],
    correct: 0
  },
  {
    question: "Which is the correct syntax to declare a main method in Java?",
    options: [
      "public static void main(String[] args)",
      "def main():",
      "function main()",
      "main(){}"
    ],
    correct: 0
  },
  {
    question: "Which data type is used to store true/false in Java?",
    options: ["int", "String", "boolean", "char"],
    correct: 2
  }
];
  let currentIndex = 0;
  let score = 0;

  const questionText = document.getElementById("questionText");
  const optionsForm = document.getElementById("options");
  const submitBtn = document.getElementById("submitBtn");
  const nextBtn = document.getElementById("nextBtn");

  function loadQuestion() {
    const current = quizData[currentIndex];
    questionText.innerText = current.question;
    optionsForm.innerHTML = "";

    current.options.forEach((opt, index) => {
      const div = document.createElement("div");
      div.className = "option";

      div.innerHTML = `
        <input type="radio" name="answer" value="${index}" id="opt${index}">
        <label for="opt${index}">${opt}</label>
      `;

      optionsForm.appendChild(div);
    });

    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
  }

  submitBtn.onclick = () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return alert("Select an option ");

    const answer = parseInt(selected.value);
    const correct = quizData[currentIndex].correct;

    const options = document.querySelectorAll(".option");

    options.forEach((opt, i) => {
      if (i === correct) opt.classList.add("correct");
      if (i === answer && answer !== correct) opt.classList.add("wrong");
    });

    if (answer === correct) score++;

    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
  };

  nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < quizData.length) {
      loadQuestion();
    } else {
      questionText.innerText = `Quiz Finished Score: ${score}/${quizData.length}`;
      optionsForm.innerHTML = "";
      submitBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  };

  loadQuestion();
});
