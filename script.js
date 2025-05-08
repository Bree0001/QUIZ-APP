import { generalKnowledgeQuestions } from './generalKnowledgeQuestions.js';
import { javascriptQuestions } from './javascriptQuestions.js';

const generalKnowledgeBtn = document.getElementById("general-knowledge-qstns");
const javascripQuestionsBtn = document.getElementById("js-qstns");
const startQuizButton = document.getElementById("start-quiz-btn");
const landingPage = document.querySelector(".first-page-section");
const nextButton = document.getElementById("next-question-btn");
const questionDisplay = document.getElementById("question-text");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-section");
const choiceButtons = document.querySelectorAll("#choices-section button");
const timerDisplay = document.getElementById("timer");

let selectedCategory;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let currentQuestion;
let timer;
let timeLeft = 5;

function startTimer() {
  timeLeft = 5;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoFailQuestion();
    }
  }, 1000);
}

function autoFailQuestion() {
  choiceButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });
  nextButton.disabled = false;
}

function displayQuestion() {
  clearInterval(timer);
  nextButton.disabled = true;
  choiceButtons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
  });

  if (selectedCategory === "general") {
    currentQuestion = generalKnowledgeQuestions[currentQuestionIndex];
  } else if (selectedCategory === "javascript") {
    currentQuestion = javascriptQuestions[currentQuestionIndex];
  }

  questionDisplay.textContent = currentQuestion.question;

  currentQuestion.choices.forEach((option, index) => {
    choiceButtons[index].textContent = option;
    choiceButtons[index].dataset.correct = option === currentQuestion.correctAnswer;
  });

  startTimer();
}

generalKnowledgeBtn.addEventListener("click", () => {
  selectedCategory = "general";
  startQuizButton.style.display = "inline-block";
});

javascripQuestionsBtn.addEventListener("click", () => {
  selectedCategory = "javascript";
  startQuizButton.style.display = "inline-block";
});

startQuizButton.addEventListener("click", () => {
  landingPage.style.display = "none";
  questionContainer.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;

  totalQuestions = selectedCategory === "general"
    ? generalKnowledgeQuestions.length
    : javascriptQuestions.length;

  displayQuestion();
});

choicesContainer.addEventListener("click", (event) => {
  const clickedButton = event.target;
  if (!clickedButton.matches("button")) return;

  clearInterval(timer);
  choiceButtons.forEach(btn => btn.disabled = true);

  const isCorrect = clickedButton.dataset.correct === "true";

  if (isCorrect) {
    clickedButton.classList.add("correct");
    score++;
  } else {
    clickedButton.classList.add("wrong");
    choiceButtons.forEach(btn => {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      }
    });
  }

  nextButton.disabled = false;
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    displayQuestion();
  } else {
    questionContainer.style.display = "none";
    alert(`Quiz finished! Your score is ${score} out of ${totalQuestions}`);
    location.reload();
  }
});
