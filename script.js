const questions = {
  Science: [
    { q: "What is H2O?", a: ["Water", "Oxygen", "Hydrogen", "Carbon"], correct: 0 },
    { q: "What planet is closest to the Sun?", a: ["Earth", "Venus", "Mercury", "Mars"], correct: 2 },
    { q: "What is the speed of light?", a: ["300 km/s", "300,000 km/s", "300 m/s", "300,000 m/s"], correct: 1 },
  ],
  Maths: [
    { q: "What is 2 + 2?", a: ["3", "4", "5", "6"], correct: 1 },
    { q: "What is 10 / 2?", a: ["2", "3", "4", "5"], correct: 3 },
    { q: "What is 7 x 3?", a: ["21", "18", "24", "19"], correct: 0 },
  ],
  English: [
    { q: "Which is a noun?", a: ["Run", "Dog", "Quickly", "Blue"], correct: 1 },
    { q: "What is a verb?", a: ["Quickly", "Run", "Dog", "Blue"], correct: 1 },
    { q: "Which is an adjective?", a: ["Blue", "Dog", "Run", "Cat"], correct: 0 },
  ],
};

const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const restartBtn = document.getElementById("restart-btn");
const skipBtn = document.getElementById("skip-btn");
const stopBtn = document.getElementById("stop-btn");
const nextBtn = document.getElementById("next-btn");

let currentTopic = "";
let currentQuestion = 0;
let score = 0;
let totalQuestions = 0;
let selectedQuestions = [];

document.getElementById("topic-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const topic = document.querySelector('input[name="topic"]:checked').value;
  startQuiz(topic);
});

function startQuiz(topic) {
  currentTopic = topic;
  selectedQuestions = topic === "Random"
    ? Object.values(questions).flat()
    : questions[topic];
  totalQuestions = selectedQuestions.length;
  currentQuestion = 0;
  score = 0;

  startPage.style.display = "none";
  quizPage.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= totalQuestions) return showResults();

  const question = selectedQuestions[currentQuestion];
  questionText.textContent = `${currentQuestion + 1}. ${question.q}`;
  optionsContainer.innerHTML = question.a
    .map(
      (option, index) =>
        `<label><input type="radio" name="option" value="${index}"> ${
          String.fromCharCode(97 + index)
        }. ${option}</label>`
    )
    .join("");

  updateProgress();
}

function updateProgress() {
  const percentage = ((currentQuestion / totalQuestions) * 100).toFixed(0);
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;
}

optionsContainer.addEventListener("change", (e) => {
  if (e.target.name === "option") {
    nextBtn.disabled = false;
  }
});

nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    checkAnswer(selectedOption.value);
  }
});

function checkAnswer(selectedOption) {
  const question = selectedQuestions[currentQuestion];
  if (parseInt(selectedOption) === question.correct) score++;
  currentQuestion++;
  nextBtn.disabled = true;
  loadQuestion();
}

skipBtn.addEventListener("click", () => {
  currentQuestion++;
  loadQuestion();
});

stopBtn.addEventListener("click", showResults);

function showResults() {
  quizPage.style.display = "none";
  resultPage.style.display = "block";
  scoreText.textContent = `${score} / ${totalQuestions}`;

  setTimeout(() => {
    answersContainer.innerHTML = selectedQuestions
      .map(
        (q, index) =>
          `<p><strong>${index + 1}. ${q.q}</strong><br>Correct Answer: ${
            q.a[q.correct]
          }</p>`
      )
      .join("");
  }, 4000);
}

restartBtn.addEventListener("click", () => location.reload());
