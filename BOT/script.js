const questions = [
    {
        questionText: "What is a phishing attack?",
        options: [
            "An attack to steal personal information by pretending to be a legitimate entity",
            "A type of malware that encrypts files",
            "A method to gain unauthorized access to a network",
            "A technique to intercept and alter communication between two parties"
        ],
        correctAnswerIndex: 0
    },
    {
        questionText: "Which of the following is a strong password?",
        options: [
            "123456",
            "password",
            "P@ssw0rd123",
            "qwerty"
        ],
        correctAnswerIndex: 2
    },
    {
        questionText: "What is ransomware?",
        options: [
            "Malware that locks or encrypts a victim's files and demands payment to unlock them",
            "A tool for monitoring network traffic",
            "Software that protects against viruses",
            "A method to bypass security protocols"
        ],
        correctAnswerIndex: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const answersDiv = document.getElementById('answers');
    const feedbackElement = document.getElementById('feedback');

    questionElement.innerText = question.questionText;
    answersDiv.innerHTML = '';
    feedbackElement.innerText = '';
    document.getElementById('next-button').style.display = 'none'; // Hide "Next" button initially

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.className = 'answer-button';
        button.onclick = () => handleAnswer(index);
        answersDiv.appendChild(button);
    });
}

function handleAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswerIndex;
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    if (isCorrect) {
        score++;
        correctSound.play();
        showFeedback('Correct!', 'success');
        document.getElementById('next-button').style.display = 'none'; // Keep "Next" hidden
        setTimeout(proceedToNextQuestion, 2000); // Proceed after 2 seconds
    } else {
        incorrectSound.play();
        showFeedback(`Incorrect. The correct answer was: ${question.options[question.correctAnswerIndex]}`, 'error');
        document.getElementById('next-button').style.display = 'block'; // Show "Next" button
        // No timeout; wait for user to click "Next"
    }
}

function proceedToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayScore();
    }
}

function showFeedback(message, type) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerText = message;
    feedbackElement.className = `feedback ${type}`;
}

function displayScore() {
    const questionElement = document.getElementById('question');
    const answersDiv = document.getElementById('answers');

    questionElement.innerText = 'Quiz Completed!';
    answersDiv.innerHTML = `Your score is ${score} out of ${questions.length}.`;
    document.getElementById('next-button').style.display = 'none'; // Hide "Next" button

    // Add a "Restart" button
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Quiz';
    restartButton.id = 'restart-button';
    restartButton.onclick = restartQuiz;
    answersDiv.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion(); // Load the first question again
    document.getElementById('next-button').style.display = 'none'; // Hide "Next" button initially
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});