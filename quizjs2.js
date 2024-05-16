const quizData = [
    {
        question: "Qu'est-ce qu'un trou noir ?",
        options: ['Une étoile détruite après avoir été percutée par une météorite.', 'Une boule de gaz si concentré que la lumière ne plus la traverser.', 'Une déchirure de l espace-temps.', 'je ne sais pas'],
        answer: 'Une étoile détruite après avoir été percutée par une météorite',
    },
    {
        question: 'Qu est-ce qu un trou noir ?',
        options: ['Une partie du corps.', 'Un corps de l espace.', 'une personne', 'un gateau '],
        answer: 'Un corps de l espace.',
    },
    {
        question: "Comment s'appelle la planète la plus proche de la Terre ?",
        options: ['Ils sont transparents.', ' Ce sont des boules de gaz noires.', 'Ils sont tellement denses qu ils absorbent la lumière.'
            , 'C est de la roche noire.'],
        answer: 'Vénus',
    },
    {
        question: "C'est de la roche noire.",
        options: ['On flotterait dans le vide.', ' On exploserait.', 'On serait expulsé de l autre côté.', 'On serait atomisé'],
        answer: 'On serait atomisé',
    },
    {
        question: "Quelque chose peut-il se poser sur un trou noir ?",
        options: [
            'oui',
            'oui car cest tellurique',
            'non ',
            'non car il absorbe les objets',
        ],
        answer: 'non car il absorbe les objets',
    },
    {
        question: "Quand le premier trou noir a-t-il été photographié ??",
        options: ['1925', '1845', '2000', '1971'],
        answer: '1971',
    },
    {
        question: " Qui a découvert Titan, un satellite de Saturne ?",

        options: [
            ' Jean-Dominique Cassini.',
            ' Christiaan Huygens',
            'Isaac Newton',
            ' Johannes Kepler',
        ],
        answer: ' Christiaan Huygens.',
    },
    {
        question: 'Un trou noir absorbera-t-il peut-être un jour la Terre ??',
        options: ['oui', 'non', 'impossible', 'on ne sais pa sencore'],
        answer: 'oui',
    },
    {
        question: 'combien ya t il de trous noirs dans l univers',
        options: [
            '10',
            ' des milliers',
            ' des milliards',
            ' 99999',
        ],
        answer: 'des milliards',
    },
    {
        question: ' quelle est la couleur du trou noir ?',
        options: ['noir', ' bleu', 'blanc', ' il n a pas de couleur'],
        answer: 'il n a pas de couleur',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();



Resources