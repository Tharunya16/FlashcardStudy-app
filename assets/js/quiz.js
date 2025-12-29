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
