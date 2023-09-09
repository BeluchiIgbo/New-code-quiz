// Declare global variables 
var currentQuestionIndex = 0;
var time = questions.length * 15;
var TimerclockId;

var questionsEl = document.getElementById("questions");
var TimerclockEl = document.getElementById("time");
var answerchoicesEl = document.getElementById("answerchoices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var correctanswerEl = document.getElementById("correctanswer");

function startQuiz() {
  var startScreenEl = document.getElementById("starter-screen");
  startScreenEl.setAttribute("class", "hidden");
  questionsEl.removeAttribute("class");
  TimerclockId = setInterval(clockTick, 1000);
  TimerclockEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("title-question");
  titleEl.textContent = currentQuestion.title;

  answerchoicesEl.innerHTML = "";

  currentQuestion.answerchoices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    answerchoicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    TimerclockEl.textContent = time;
    correctanswerEl.textContent = "Wrong Answer!";
  } else {
    correctanswerEl.textContent = "Correct Answer!";
  }

  correctanswerEl.setAttribute("class", "correctanswer");
  setTimeout(function () {
    correctanswerEl.setAttribute("class", "correctanswer hidden");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(TimerclockId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hidden");
}

function clockTick() {
  time--;
  TimerclockEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;