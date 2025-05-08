import {generalKnowledgeQuestions} from './generalKnowledgeQuestions.js';
import {javascriptQuestions} from './javascriptQuestions.js';

const generalKnowledgeBtn = document.getElementById("general-knowledge-qstns");
const javascripQuestionsBtn = document.getElementById("js-qstns");
const startQuizButton = document.getElementById("start-quiz-btn");
const landingPage = document.getElementById("first-page-section");
const nextButton = document.getElementById("next-question-btn");

let selectedCategory;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;

function displayQuestion() {
  let currentQuestion;
  if (selectedCategory === "general") {
    currentQuestion = generalKnowledgeQuestions[currentQuestionIndex];
  } else if (selectedCategory === "javascript") {
    currentQuestion = javascriptQuestions[currentQuestionIndex];
  }
  const questionText = currentQuestion.question;
  const questionDisplay = document.getElementById('question-text');
  questionDisplay.textContent = questionText;
}

generalKnowledge.addEventListener("click", function () {
  selectedCategory = "general";
  startQuizButton.style.display = "inline-block";});

javascripQuestions.addEventListener("click", function () {
  selectedCategory = "javascript";
  startQuizButton.style.display = "inline-block";});

startQuizButton.addEventListener("click", function () {
  landingPage.style.display = "none";
  displayQuestion();
});

nextButton.addEventListener("click", function () {
  currentQuestionIndex++;
  displayQuestion();});

