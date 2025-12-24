// ---------------------------
// Configuration
// ---------------------------
const SHEET_ID = '1z1HM1RjkY1cHyUmx28jf7j7tAiKZhGiRZAbwp8yXhUs';
const API_KEY = 'AIzaSyAF6TUG3E2NhDn88m7hFyCsOXOI0zdjsYg';
const RANGE = 'Sheet1!A2:A';

// ---------------------------
// Game state
// ---------------------------
let remainingQuestions = [];
let currentQuestion = null;
let lastSkippedQuestion = null;

// ---------------------------
// Load questions from Google Sheets
// ---------------------------
async function loadQuestionsFromSheet() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      setQuestionText("No questions found!");
      return;
    }

    remainingQuestions = data.values.map(row => row[0]);
    showRandomQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
    setQuestionText("Failed to load questions.");
  }
}

// ---------------------------
// Utilities
// ---------------------------
function setQuestionText(text) {
  const questionEl = document.querySelector('.question');

  // Fade out
  questionEl.classList.add('fade-out');

  // After fade-out, update text and fade back in
  setTimeout(() => {
    questionEl.textContent = `🦌 ${text}`;
    questionEl.classList.remove('fade-out');
  }, 200);
}

function getRandomQuestion() {
  if (remainingQuestions.length === 0) return null;

  let candidates = remainingQuestions;

  // Temporarily exclude last skipped question
  if (lastSkippedQuestion && remainingQuestions.length > 1) {
    candidates = remainingQuestions.filter(q => q !== lastSkippedQuestion);
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

// ---------------------------
// Game actions
// ---------------------------
function showRandomQuestion() {
  const next = getRandomQuestion();

  if (!next) {
    setQuestionText("All questions answered!");
    return;
  }

  currentQuestion = next;
  lastSkippedQuestion = null; // reset skip block
  setQuestionText(currentQuestion);
}

function skipQuestion() {
  if (!currentQuestion) return;

  lastSkippedQuestion = currentQuestion;
  showRandomQuestion();
}

function nextQuestion() {
  if (!currentQuestion) return;

  // Permanently remove answered question
  remainingQuestions = remainingQuestions.filter(q => q !== currentQuestion);
  currentQuestion = null;

  showRandomQuestion();
}

// ---------------------------
// Event listeners
// ---------------------------
document.querySelector('#skip-btn').addEventListener('click', skipQuestion);
document.querySelector('#next-btn').addEventListener('click', nextQuestion);

// ---------------------------
// Start game
// ---------------------------
loadQuestionsFromSheet();