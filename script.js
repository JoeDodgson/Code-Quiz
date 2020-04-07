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
var nameInput = document.querySelector("#name-input");
var currentPage = document.location.href;
var username;
var secondsLeft;
var interval;
var scoreTotal = 0;
var questionIndex;
var allScores;
var oldScores;
var today;

//Clicking the start button activates the start quiz function
startBtn.addEventListener("click", startQuiz);

//Start quiz function starts the timer and shows the questions
function startQuiz(){
    startTimer();
    intro.setAttribute("style","display:none;");
    countdownContainer.setAttribute("style","display:block;");
    questionsChoices.setAttribute("style","display:block;");
    scoreTotal = 0;
    questionIndex = 0;
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
    countdownContainer.setAttribute("style","display:none;");
    today = new Date();
    dateOfEntry = today.getHours() + ":" + today.getMinutes() + " on " + today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear()
}

function renderTime(){
    countdownDisplay.textContent = secondsLeft;
}

function renderQuestion(){
    //Populate the question text
    questionText.textContent = questions[questionIndex].title;
    choicesChild = choices.firstElementChild;
    //Clear out the previous question's choices
    while(choicesChild) {
        choices.removeChild(choicesChild);
        choicesChild = choices.firstElementChild;
    }
    
    //Populate this question's choices
    for(var i=0; i < questions[questionIndex].choices.length; i++){
        var newLi = document.createElement("li");
        newLi.textContent = questions[questionIndex].choices[i];
        choices.appendChild(newLi);
    }
}

choices.addEventListener("click",function(){
    if(event.target.textContent === questions[questionIndex].answer){
        event.target.setAttribute("style","background-color: #00e300") ;
        scoreTotal++;
    }
    else{
        event.target.setAttribute("style","background-color: #e30000") ;
        secondsLeft -= 5;
    }
    //Allow the user to see the background-colour for a fraction of a seconds before displaying the next question
    setTimeout(function(){
        if (questionIndex === questions.length - 1) {
            endQuiz();
        }
        else {
            questionIndex++;
            renderQuestion();
        }
    }, 200
    );
})

submitBtn.addEventListener("click",function(){
    //If the content of the entry field is blank, alert the user
    if(nameInput.value == ""){
        alert("You must enter a name to submit a score");
    }
    //Store the user's name and score in local storage, then redirect to the Highscores page
    else{
        debugger
        username = nameInput.value;
        localStorage.setItem(username, scoreTotal);
        window.location.href = "./scores.html";
        //Update the scores show in scores.html
        updateScores();
        console.log("will not reach");
        console.log("will not reach");
    }

}
)

function updateScores() {

    //retrieve scores from the local storage
    allScores = localStorage.getItem(JSON.parse("allScores"));

    //Add the new score into the allScores object, but putting it into score order
    allScores[allScores.length] = {
    name: username,
    score: scoreTotal,
    date: dateOfEntry,
    };

    //Update the scores on the scores.html page

    //Set the updated allscores scores on the local storage
    localStorage.setItem("allScores", JSON.stringify(allScores));


}


