//Define the quiz array
//Define the variables
var clearBtn = document.querySelector("#clear-button");
var scoresDisplay = document.querySelector("#scores-display");
var scoresTable = document.querySelector("#scores-table");
var scoresChild;
var currentPage = document.location.href;
var allScores = JSON.parse(localStorage.getItem("allScores")) || [];

//Add an event for on load to update the scores



function renderScores() {
    if(allScores.length > 0){
        scoresTable.removeAttribute("class");
        scoresTable.setAttribute("class","table table-responsive");

        var data = allScores.sort(compareValues("score", "desc"));
        //Display all the updated scores from the allScores array
        for(var i=0; i < data.length; i++){
            var tr = document.createElement("tr");
            var tdName = document.createElement("td");
            var tdScore = document.createElement("td");
            var tdDate = document.createElement("td");
            tdName.textContent = data[i].name
            tdScore.textContent = data[i].score
            tdDate.textContent = data[i].date
            tr.appendChild(tdName);
            tr.appendChild(tdScore);
            tr.appendChild(tdDate);
            scoresDisplay.appendChild(tr);

        }
    }   

}

renderScores();


function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }