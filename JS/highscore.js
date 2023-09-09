function handleEndQuiz() {
    var existingScores = JSON.parse(localStorage.getItem("scores"));
    if (existingScores === null) {
      existingScores = [];
    }
    existingScores.push(window.score);
    document.getElementById("question").innerHTML = "";
    document.getElementById("score").innerHTML = window.score;
    document.getElementById("timerclock").innerHTML = "";
    window.score = 0;
    localStorage.setItem("view-scores", JSON.stringify(existingScores));
    //html scores
    for (var i = 0; i < existingScores.length; i++) {
      //show score on screen
      var listItem = document.createElement("li");
      listItem.innerHTML = existingScores[i];
      document.getElementById("view-scores").append(listItem);
    }
    window.timer = 90;
    currentQuestion = 0;
    var startAgain = document.createElement("button");
    startAgain.setAttribute("id", "start-again");
    startAgain.innerHTML = "Start Again";
  
    startAgain.addEventListener("click", function () {
      displayTimer();
      displayQuestion();
      startAgain.parentNode.removeChild(startAgain);
      document.getElementById("view-scores").innerHTML = "";
    });
    document.querySelector("#prompt_display").appendChild(startAgain);
  }