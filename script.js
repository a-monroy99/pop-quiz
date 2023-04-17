var timerInterval = document.querySelector(".time-left");
var startBtn = document.querySelector(".startBtn");
var highScore = document.querySelector(".points");
var mainEl = document.querySelector("main");
var head = document.getElementsByTagName("header");
var choicesEl = document.getElementById('choices')
var questionEl = document.getElementById("questions")
var currentQuestionIndex = 0
var winCounter = 0

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
        correctAnswer: "Abraham Lincoln",
    },

    {
        questions: "What was America's first national park?",
        answers: [
            "Grand Canyon National Park",
            "Zion National Park",
            "Yellowstone National Park",
            "Glacier National Park",
        ],
        correctAnswer: "Yellowstone National Park",
    },

    {
        questions: "What is Starbucks' logo?",
        answers: [
            "Siren",
            "Unicorn",
            "Cyclops",
            "A Crown",
        ],
        correctAnswer: "Siren",
    },

    {
        questions: "Which three zodiac sign are summer signs?",
        answers: [
            "Cancer, Leo, Virgo",
            "Sagitarius, Scorpio, Libra",
            "Aquarius, Pices, Gemini",
            "All of the above",
        ],
        correctAnswer: "Cancer, Leo, Virgo",
    },

    {
        questions: "What animal breathes through its butt",
        answers: [
            "Ottter",
            "Dolphin",
            "Alligator",
            "Turtle",
        ],
        correctAnswer: "Turtle",
    }
]

//This function is to properly load the questions from page to page
function loadQuestion() {
    // stores questions object
    var currentQuestion = triviaQuestions[currentQuestionIndex]
    var question = triviaQuestions[triviaIndex];

    // console.log("question " + question.questions)
    questionEl.textContent = triviaIndex + 1 + "." + question.questions
        // for (let q = 0; q < question.questions.length; q++) {
        //     // stores string of qth index in questions array of strings
        //     var presentQuestion = question.questions[q]
        //     questionEl.setAttribute("value", presentQuestion)
        //     questionEl.textContent = q + 1 + '.' + presentQuestion
        // }
    
    
    
    console.log(questionEl)
    
        
    choicesEl.innerHTML = ""
        for (let i = 0; i < currentQuestion.answers.length; i++) {
            var choice = currentQuestion.answers[i]
                console.log(choice)
            var choiceNode = document.createElement('button')
            choiceNode.setAttribute("class", "choices")
            choiceNode.setAttribute("value", choice)
            choiceNode.textContent = i + 1 + '.' + choice
            choicesEl.appendChild(choiceNode)
        }
};

function questionClick (event) {
    //created var = buttonEl to allow an event to fire and run through a series of if statements once button is clicked
    var buttonEl = event.target
        //if on the event 
        if (!buttonEl.matches(".choices")) {
            return;
        }
            //clicking the right answer will load the next question. If the answer is incorrect, it will penalize 15 secs from your time
            //else the next question will load
            console.log(triviaQuestions[currentQuestionIndex].correctAnswer)
            if (buttonEl.value !== triviaQuestions[currentQuestionIndex].correctAnswer) {
                secondsLeft -= 15
            } else {
                winCounter++
                loadQuestion();
            }
            //TODO: add game over/lose game page 
            if (secondsLeft == 0) {
                return;
            }
        //trivia++ and currentQuestionIndex++ allow for the value to increment by one
        triviaIndex++
        currentQuestionIndex++
        //if you finish the questions before the time ends, then you will redirected to 
        if (secondsLeft <= 0 || currentQuestionIndex === triviaQuestions.length) {
            renderScore();
            clearInterval(secondsLeft);
          } else {
            loadQuestion();
          }
}

//when done with questions you can enter initials
function renderScore() {
    document.querySelector(".show").setAttribute("class", "hide")
    document.querySelector(".dont-display").setAttribute("class", "display")
    h3 = document.getElementsByClassName("h3")[0]
    h3.textContent = "All Done!"
}

//once highscore button is clicked, render new page and score list with intials (local storage)
highScore.addEventListener("click", function(e) {
    //document.querySelector(".").setAttribute("class", "hide");
    //document.querySelector(".quiz").setAttribute("class", "show");
    
});
//inside highscore page, add exit button to return to main page 

//Starting the game will trigger a series of quesitons to show up
//Click to start game
var secondsLeft = 60;
startBtn.addEventListener("click", function() {
     document.querySelector(".quiz").setAttribute("class", "show");
     document.querySelector(".main").setAttribute("class", "hide");
     const time = setInterval(function() {
        secondsLeft--;
        timerInterval.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(time)
        }
     }, 1000);
     triviaIndex = 0;
     loadQuestion();
});

//When we click on a button, it fires the questionClick event
choicesEl.onclick = questionClick