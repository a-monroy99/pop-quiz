var timerInterval = document.querySelector(".time-left");
var startBtn = document.querySelector(".startBtn");
var highScore = document.querySelector(".points");
var mainEl = document.querySelector("main");
var head = document.getElementsByTagName("header");
var choicesEl = document.getElementById('choices')
var currentQuestionIndex = 0

//List of my trivia questions
var triviaIndex;

var triviaQuestions = [ 
    {
        questions: "What President was a licensed bartender?",
        answers: [
            "George Washington",
            "Abraham Lincoln",
            "Benjamin Franklin",
            "John Adams",
        ],
        correctAnswer: "2",
    },

    {
        questions: "What was America's first national park?",
        answers: [
            "Grand Canyon National Park",
            "Zion National Park",
            "Yellowstone National Park",
            "Glacier National Park",
        ],
        correctAnswer: "3",
    },

    {
        questions: "What is Starbucks' logo?",
        answers: [
            "Siren",
            "Unicorn",
            "Cyclops",
            "A Crown",
        ],
        correctAnswer: "1",
    },

    {
        questions: "Which three zodiac sign are summer signs?",
        answers: [
            "Cancer, Leo, Virgo",
            "Sagitarius, Scorpio, Libra",
            "Aquarius, Pices, Gemini",
            "All of the above",
        ],
        correctAnswer: "1",
    },

    {
        questions: "What animal breathes through its butt",
        answers: [
            "Ottter",
            "Dolphin",
            "Alligator",
            "Turtle",
        ],
        correctAnswer: "4",
    }
]

//This function is to properly load the questions from page to page
function loadQuestion() {
    
    var currentQuestion = triviaQuestions[currentQuestionIndex]
    console.log(currentQuestion)
    var question = triviaQuestions[triviaIndex];
    
    document.getElementsByClassName("questions")[0].textContent = question.questions;
    
    
   
   choicesEl.innerHTML = ""
   for (let i = 0; i < currentQuestion.answers.length; i++) {
    var choice = currentQuestion.answers[i]
    
    var choiceNode = document.createElement('button')
    choiceNode.setAttribute("class", "choices")
    choiceNode.setAttribute("value", choice)
    choiceNode.textContent = i + 1 + '.' + choice
    
    choicesEl.appendChild(choiceNode)
    
    
   }
};

function questionClick (event) {
    var buttonEl = event.target
        if (!buttonEl.matches(".choices")) {
            return;
        }
        if (buttonEl.value !== triviaQuestions[currentQuestionIndex].answers) {
            secondsLeft -= 15
            if (secondsLeft == 0) {
                
            }
        } else {
            console.log("Test")
        }
        currentQuestionIndex++
        if (secondsLeft <= 0 || currentQuestionIndex === triviaQuestions.length) {
            console.log("Lol")
          } else {
            loadQuestion();
          }
}

//Starting the game will trigger a series of quesitons to show up
//Click to start game
var secondsLeft = 60;
startBtn.addEventListener("click", function() {
     document.querySelector(".quiz").setAttribute("class", "show");
     document.querySelector(".main").setAttribute("class", "hide");
     var time = setInterval(function() {
        secondsLeft--;
        timerInterval.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(time)
        }
     }, 1000);
     triviaIndex = 0;
     loadQuestion();
});

choicesEl.onclick = questionClick