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

function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out!");
  window.location.href = "../index.html";
}

