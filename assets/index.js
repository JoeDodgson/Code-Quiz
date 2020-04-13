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
      title: "What does CSS stand for?",
      choices: ["Cascading Style Sheet","Conveying Sheet Styles","Common Serial Styling","Cross Style Scripting"],
      answer: "Cascading Style Sheet"
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
    },
    {
      title:
        "What does HTML stand for?",
      choices: ["HyperText Media Language", "HyperText Markup Language", "Hyperspace Transfer Motion Language", "Hotmail"],
      answer: "HyperText Markup Language"
    },
    {
      title:
        "In the Bootstrap grid layout convention, how many columns are there on a page?",
      choices: ["6", "8", "12", "24"],
      answer: "12"
    },
    {
      title:
        "Which of these is not a valid value of the CSS 'positioning' property?",
      choices: ["static", "inline", "sticky", "inherit"],
      answer: "inline"
    },
    {
        title:
          "What standards organisation created the HTML5 markup language?",
        choices: ["Massachusetts Institute of Technology (MIT)", "World Wide Web Consortium (W3C)", "Defense Advanced Research Projects Agency (DARPA)", "The Internet Control Group (ICG)"],
        answer: "World Wide Web Consortium (W3C)"
      },
      {
          title:
            "Which of the following is not a valid HTML5 tag?",
          choices: ["<div>", "<end>", "<code>", "<embed>"],
          answer: "<end>"
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
var scoresDisplay = document.querySelector("#scores-display");
var scoresChild;
var userCorrectScore = document.querySelector("#user-correct-score");
var userTimeScore = document.querySelector("#user-time-score");
var userTotalScore = document.querySelector("#user-total-score");
var correctScoreContainer = document.querySelector("#correct-score-container");
var timeScoreContainer = document.querySelector("#time-score-container");
var totalScoreContainer = document.querySelector("#total-score-container");
var enterAndSubmitContainer = document.querySelector("#enter-and-submit");
var questionText = document.querySelector("#question");
var nameInput = document.querySelector("#name-input");
var currentPage = document.location.href;
var shuffledQuestions = [];
var username;
var secondsLeft;
var interval;
var correctScore = 0;
var timeScore;
var totalScore;
var questionIndex;
var oldScores;
var today;
var allScores;

// Function which pulls the scores from the local storage
function getAllScores() {
    // If the allScores array is empty, then initialise it as an empty array
    if(!localStorage.getItem("allScores")){
        allScores = [];
    }
    else{
        allScores = JSON.parse(localStorage.getItem("allScores"));
    }
}

// Upon loading the page, pull the scores from the local storage
getAllScores();

// Randomly shuffle the questions and answers
function shuffleQuestions(questions){
    var i, j, k, l, x, y;
    var shuffledQuestions = questions;
    for (i = shuffledQuestions.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = shuffledQuestions[i];
        shuffledQuestions[i] = shuffledQuestions[j];
        shuffledQuestions[j] = x;
        for (k = shuffledQuestions[i].choices.length - 1; k > 0; k--){
            l = Math.floor(Math.random() * (k + 1));
            y = shuffledQuestions[i].choices[k];
            shuffledQuestions[i].choices[k] = shuffledQuestions[i].choices[l];
            shuffledQuestions[i].choices[l] = y;
        }
    }   
    return shuffledQuestions;
}

// Clicking the start button activates the start quiz function
startBtn.addEventListener("click", startQuiz);

// Start quiz function starts the timer and shows the questions
function startQuiz(){
    shuffledQuestions = shuffleQuestions(questions);
    startTimer();
    intro.setAttribute("style","display:none;");
    countdownContainer.setAttribute("style","display:block;");
    questionsChoices.setAttribute("style","display:block;");
    correctScore = 0;
    questionIndex = 0;
    renderQuestion();
    //Set the first question and answer
};

// Start timer function sets the time to 60 and begins the countdown
function startTimer(){
    secondsLeft = 60;
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

// Function which is triggered by the seconds left reaching 0 or reaching the end of the questions
function endQuiz(){

    // Hide the questions and choices
    questionsChoices.setAttribute("style","display:none;"); 

    // Display the score summary
    submitScore.setAttribute("style","display:block;");

    // Hide the countdown
    countdownContainer.setAttribute("style","display:none;");

    // Timestamp of when the user finished the quiz
    today = new Date();

    dateOfEntryArray = [
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        today.getDate(),
        today.getMonth(),
        today.getFullYear()
    ]

    //Add a zero in front of the hour, minute, seconds, date and month if less than 10
    dateOfEntryArray.forEach(formatDate);

    // Turn the timestamp of finishing the quiz into a string
    dateOfEntry = dateOfEntryArray[0] + ":" + dateOfEntryArray[1] + ":" + dateOfEntryArray[2] + " on " + dateOfEntryArray[3] + "-" + dateOfEntryArray[4] + "-" + dateOfEntryArray[5];
    
    // If the time score was not assigned (i.e. seconds left reached 0) then set timeScore to 0
    if(typeof timeScore !== "num"){
        timeScore = 0;
    }

    // Add that to the correct score to give the total score
    totalScore = correctScore + timeScore;
    
    // Populate the score fields
    userTimeScore.textContent = timeScore;
    userCorrectScore.textContent = correctScore;
    userTotalScore.textContent = totalScore;

    // Display the breakdown of the scores (correct score, time bonus and total score) at 1 seconds interval
    setTimeout(function(){
        correctScoreContainer.setAttribute("class","score-breakdown row;");
        correctScoreContainer.setAttribute("style","");
        
        setTimeout(function(){
            timeScoreContainer.setAttribute("class","score-breakdown row;");
            timeScoreContainer.setAttribute("style","");
            
            setTimeout(function(){
                totalScoreContainer.setAttribute("class","score-breakdown row;");
                totalScoreContainer.setAttribute("style","margin-bottom: 30px;");
                
                setTimeout(function(){
                    enterAndSubmitContainer.setAttribute("class","score-breakdown row;");
                    enterAndSubmitContainer.setAttribute("style","");
                    }, 1000
                    ); 

            }, 1000
            ); 

        }, 1000
        ); 

    }, 1000
    ); 
}

function formatDate(item, index, arr){
    if(arr[index] < 10){
        arr[index] = "0" + arr[index];
    }
}

// Shows the number of seconds remaining in the top right hand corner of the page
function renderTime(){
    countdownDisplay.textContent = secondsLeft;
}

// Shows the nexy question and choices from the shuffled questions array
function renderQuestion(){

    //Populate the question text
    questionText.textContent = shuffledQuestions[questionIndex].title;
    choicesChild = choices.firstElementChild;

    //Clear out the previous question's choices
    while(choicesChild) {
        choices.removeChild(choicesChild);
        choicesChild = choices.firstElementChild;
    }
    
    //Populate this question's choices
    for(var i=0; i < shuffledQuestions[questionIndex].choices.length; i++){
        var newLi = document.createElement("li");
        newLi.textContent = shuffledQuestions[questionIndex].choices[i];
        choices.appendChild(newLi);
    }
}

// Event listener triggers depending on which choice the user clicks on
choices.addEventListener("click",function(){

    // If the user clicks the correct answer, change color to green and add 1 to the correct score
    if(event.target.textContent === shuffledQuestions[questionIndex].answer){
        event.target.setAttribute("style","background-color: #00e300") ;
        correctScore++;
    }
    // If the user clicks an incorrect answer, change color to red and subtract 5 seconds from the time left
    else{
        event.target.setAttribute("style","background-color: #e30000") ;
        secondsLeft -= 5;
    }

    // Allow the user to see the background-colour for a fraction of a seconds before displaying the next question
    setTimeout(function(){

        // If this is the final questions in the array, then pause for a fraction of the second
        if (questionIndex === shuffledQuestions.length - 1) {
            setTimeout(function(){
            }, 200);

            // Then hide the questions and choices from display
            questionsChoices.setAttribute("style","display:none;");

            // Calculate the time bonus score - divide remaining seconds by 10 and round down
            timeScore = Math.floor( secondsLeft / 10);

            // Set the seconds left to 0 to trigger the endQuiz function
            secondsLeft = 0;
        }

        // Move onto the next question and display the next question
        else {
            questionIndex ++;
            renderQuestion();
        }
    }, 200
    );
})

// Add an event listener for the Submit button
submitBtn.addEventListener("click",function(){

    // Prevent default actions from happening - e.g. page flickering
    event.preventDefault();

    // If the content of the entry field is blank, alert the user
    if(nameInput.value == ""){
        alert("You must enter a name to submit a score");
    }
    // Store the user's name and score in local storage, then redirect to the Highscores page
    else{
        username = nameInput.value;

        // Update the scores array and update the scores displayed in scores.html
        updateScores();

        // Redirect user to the Highscores page
        window.location.href = "./scores.html";
    }
});

// Define the function which adds the user's score to the allScores array
function updateScores() {
 
    // Insert the new score into the allScores array
    // If the allScores array is empty, set the 0 index item of the array to the user's score
    if(allScores.length === 0 && allScores[0] == ""){
        allScores[0] = {
            name: username,
            score: totalScore,
            date: dateOfEntry,
        }
    }
    // Else push the user's score into the end of the array
    else{
        allScores.push({
            name: username,
            score: totalScore,
            date: dateOfEntry,
        });
    }

    // Then store the updated allScores array into the local storage
    localStorage.setItem("allScores",JSON.stringify(allScores));
}
