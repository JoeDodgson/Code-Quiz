//Define the quiz array
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
];

//Define the variables
var intro = document.querySelector("#introduction");
var questionsChoices = document.querySelector("#questions-choices");
var submitScore = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start-button");
var submitBtn = document.querySelector("#submit-button");
var countdownContainer = document.querySelector("#countdown-container");
var countdownDisplay = document.querySelector("#countdown-display");
var choices = document.querySelector("#choices");
var choicesChild = choices.firstElementChild;
var userScore = document.querySelector("#user-score");
var questionText = document.querySelector("#question");
var secondsLeft;
var interval;
var scoreTotal = 0;
var questionNum;

//Clicking the start button activates the start quiz function
startBtn.addEventListener("click", startQuiz);

//Start quiz function starts the timer and shows the questions
function startQuiz(){
    startTimer();
    intro.setAttribute("style","display:none;");
    countdownContainer.setAttribute("style","display:block;");
    questionsChoices.setAttribute("style","display:block;");
    scoreTotal = 0;
    questionNum = 1;
    renderQuestion();
    //Set the first question and answer
};

//Start timer function sets the time to 100 and begins the countdown
function startTimer(){
    secondsLeft = 100;
    interval = setInterval(function() {
        secondsLeft--;
        renderTime();
        if(secondsLeft < 1){
            clearInterval(interval);
            endQuiz();
        }
        else{}
    }, 1000);
}

function endQuiz(){
    questionsChoices.setAttribute("style","display:none;"); 
    submitScore.setAttribute("style","display:block;");
    scoreTotal += Math.floor( secondsLeft / 5);
    userScore.textContent = scoreTotal;
}

function renderTime(){
    countdownDisplay.textContent = secondsLeft;
}

function renderQuestion(){
    questionText.textContent = questions[questionNum].title;
    // prevNumChoices = 4;
    // for(var i=0; i < prevNumChoices; i++){
    //     console.log(choices.children[0]);
    // }
    while(choicesChild) {
        choices.removeChild(choicesChild);
        choicesChild = choices.firstElementChild;
    }
    
    for(var i=0; i < questions[questionNum].choices.length; i++){
        var newLi = document.createElement("li");
        newLi.textContent = questions[questionNum].choices[i];
        choices.appendChild(newLi);
    }
}


  
//Containers to turn on / off:
    //#introduction
    //#questions-choices
    //#submit-score
  
//Buttons:
    //#start-button
    //#submit-button
  
//Fields to populate with data:
    //#countdown
    //#question
    //#answers
    //#user-score