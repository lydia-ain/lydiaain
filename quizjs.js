const quizData = [
    {
        question: "Combien y a-t-il d'étoiles dans notre système solaire ?",
        options: ['Il y a une seule étoile dans le système solaire !', 'Il y a trente étoiles dans le système solaire !', 'Notre système solaire comporte 100 000 étoiles !', 'Il n y a pas d étoile dans le système solaire !'],
        answer: 'Il y a une seule étoile dans le système solaire !',
    },
    {
        question: 'Combien y a-t-il de planètes dans notre système solaire ?',
        options: ['une centaine de planéte', 'trois planetes', 'une seule planéte', 'Huit planètes'],
        answer: 'Huit planètes',
    },
    {
        question: "Comment s'appelle la planète la plus proche de la Terre ?",
        options: ['Mercure',' Mars','Vénus','Saturne','La Lune'],
        answer: 'Vénus',
    },
    {
        question: "Quelle est la distance Terre-Lune ?",
        options: ['394 000 km', ' 300 000 km.', '  386 000 km', '384 000 km'],
        answer: '384 000 km',
    },
    {
        question: "Laquelle de ces planètes n'est pas tellurique ?",
        options: [
            'Terre',
            'Mars',
            'Uranus',
            'Mercure',
        ],
        answer: 'Uranus',
    },
    {
        question: "Combien y a-t-il d'objets dans le catalogue Messier?",
        options: ['1', '10', '120', '110'],
        answer: '110',
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
        question: 'quelle planete est connu comme la planete rouge?',
        options: ['Mars', 'Venus', 'Mercure', 'Uranus'],
        answer: 'Mars',
    },
    {
        question: 'Quel est le diamètre du Soleil ?',
        options: [
            ' 3 904 398 km',
            ' 1 392 684 km',
            ' 10 143 859 km',
            ' 7 456 298 km',
        ],
        answer: '1 392 684 km',
    },
    {
        question: ' Comment nomme-t-on en Russie quelqu’un qui voyage dans l’espace ?',
        options: ['Taïkonaute',' Cosmonaute','Spationaute',' Astronaute'],
        answer: 'Astronaute',
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