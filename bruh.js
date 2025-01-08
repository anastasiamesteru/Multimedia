let timeLeft = 30;
let isHard = false;
let easyWin = false;
let timerId = null;

$(document).ready(function () {
  initializeLevelButtons();
  $(".has-animation").each(function (index) {
    $(this)
      .delay($(this).data("delay"))
      .queue(function () {
        $(this).addClass("animate-in");
        setTimeout(() => {
          $("#alertmsg").removeAttr("style");
          $(this).attr("style", "display:none");
        }, 3300);

        setTimeout(() => {
          $("#alertmsg").attr("style", "display:none");
          $("#buttons").removeAttr("style");
          $(this).attr("style", "display:none");
        }, 4300);
      });
  });
});

function resetTimer() {
  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");

  clearInterval(timerId);

  timerId = null;
  timeLeft = 30;
  timerDisplay.textContent = formatTime(timeLeft);
  timerDisplay.classList.remove(
    "completed",
    "animate__animated",
    "animate__bounce"
  );
  startBtn.disabled = false;
}

function initializeLevelButtons() {
  document.getElementById("easyBtn").addEventListener("click", function () {
    $("#puzzle-container").removeAttr("style");
    document.getElementById("mediumBtn").disabled = true;
    document.getElementById("hardBtn").disabled = true;
    easyWin = true;
  });

  document.getElementById("mediumBtn").addEventListener("click", function () {
    $("#puzzle-container").removeAttr("style");
    enableMediumSettings();
    timer();
  });

  document.getElementById("hardBtn").addEventListener("click", function () {
    enableHardSettings();
    timer();
  });
}

function enableMediumSettings() {
  $("#timer-container").removeAttr("style");
  $(".btn-success").removeAttr("style");
  $(".btn-danger").removeAttr("style");
  $("#puzzle-container img").hide();
  document.getElementById("easyBtn").disabled = true;
  document.getElementById("hardBtn").disabled = true;
  easyWin = true;
}

function enableHardSettings() {
  $(".alert-danger").removeAttr("style");
  $("#timer-container").removeAttr("style");
  $(".btn-success").removeAttr("style");
  $(".btn-danger").removeAttr("style");
  document.getElementById("startBtn").disabled = true;
  document.getElementById("resetBtn").disabled = true;

  setTimeout(() => {
    $(".alert-danger").hide();
    $(".hearts").show();
    $(".hearts img").css("display", "inline-block");
    $("#puzzle-container").removeAttr("style");
    $("#puzzle-container img").hide();
    document.getElementById("mediumBtn").disabled = true;
    document.getElementById("easyBtn").disabled = true;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("resetBtn").disabled = false;
    isHard = true;
    easyWin = true;
  }, 2300);
}

function timer() {
  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");

  function startTimer() {
    if (timerId) return;
    startBtn.disabled = true;
    timerDisplay.classList.remove("completed");

    timerId = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = null;
        timerDisplay.classList.add(
          "completed",
          "animate__animated",
          "animate__bounce"
        );
        startBtn.disabled = false;
        if (counter < 9) {
          triggerGameOver();
        }
      }
    }, 1000);
    showpuzzle();
    playTimerSound();
  }

  startBtn.addEventListener("click", startTimer);
  document.getElementById("resetBtn").addEventListener("click", resetTimer);
}

function showpuzzle() {
  $("#puzzle-container img").show();
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function triggerGameOver() {
  const gameOverDiv = document.getElementById("gameOver");
  gameOverDiv.classList.add("show");
  $("#puzzle-container").hide();
  $(".btn-success, .btn-danger").hide();
  playLoseSound();
}

// Drag-and-drop puzzle logic
var counter = 0;
var counterHard = 0;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const img = document.getElementById(data);
  const canvas = document.getElementById("puzzleCanvas");
  const ctx = canvas.getContext("2d");

  const rect = canvas.getBoundingClientRect();
  const x = ev.clientX - rect.left - img.width / 2;
  const y = ev.clientY - rect.top - img.height / 2;

  // Check positions and draw the image on the canvas
  // Add game logic for tracking counters and updating UI

  if (counter === 9 && easyWin) {
    playWinSound();
  }

  if (counterHard === 3 && isHard) {
    triggerGameOver();
  }
}

// Sound effects
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const timerSound = document.getElementById("timerSound");
const loseSound = document.getElementById("loseSound");
const winSound = document.getElementById("winSound");

function playCorrectSound() {
  correctSound.play();
}

function playWrongSound() {
  wrongSound.play();
}

function playTimerSound() {
  timerSound.play();
}

function playLoseSound() {
  loseSound.play();
}

function playWinSound() {
  winSound.play();
}
