// Questions Array
const question = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Last Name" },
  { question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create a Password", type: "password" }
];

// Transition times
const shakeTime = 100; //Shake transition time
const switchTime = 200; // Transition between questions

// Init Position at first question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

prevBtn.addEventListener("click", () => console.log("clicked"));

// EVENTS

// Get question on DOM load
document.addEventListener("DOMContentLoaded", getQuestion);

// Next button click
nextBtn.addEventListener("click", validate);

// Input field enter click
inputField.addEventListener("keyup", e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS

// Get question from array and add to maarkup
function getQuestion() {
  // Get Question
  inputLabel.innerHTML = question[position].question;
  // Get current type
  inputField.type = question[position].type || "type";
  // Get current answer
  inputField.value = question[position].answer || "";
  // Focus on  element
  inputField.focus();

  // Set progress bar width - variable to the question length
  progress.style.width = (position * 100) / question.length + "%";

  // Add user icon or back arrow depeding on question
  prevBtn.className = position ? "fa fa-arrow-left" : "fa fa-user";

  showQuestion();
}

// Display question to user
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// Hide question from user
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
  // make sure pattern matches if there is one
  if (!inputField.value.match(question[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field input fail
function inputFail() {
  formBox.className = "error";
  // Repeat Shake motion - Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field input pass
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store answer in array
  question[position].answer = inputField.value;

  // Increment Position
  position++;

  // If new question, hide current and get next
  if (question[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove if no more questions
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";

    // Form Complete
    formComplete();
  }
}

// All fields complete - Show h1 end
function formComplete() {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        question[0].answer
      }. You are registered and will get an email shortly.`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
