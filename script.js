let currentQuestion = 0;
let score = 0;
let timer;
let questions;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

// Load questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startButton.style.display = 'inline-block';
    })
    .catch(error => console.error('Error loading questions:', error));

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    loadQuestion();
    startTimer();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const currentQ = questions[currentQuestion];
        questionElement.textContent = currentQ.question;
        optionsContainer.innerHTML = '';

        currentQ.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });

    } else {
        endQuiz();
    }
}

function checkAnswer(index) {
    const currentQ = questions[currentQuestion];
    if (index === currentQ.correct) {
        score++;
    }

    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    let time = 60;
    timer = setInterval(() => {
        time--;
        timerElement.textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    questionElement.textContent = 'Time Up!';
    optionsContainer.innerHTML = `<p>Your Score: ${score}/${questions.length}</p>`;
    restartButton.style.display = 'inline-block';
}