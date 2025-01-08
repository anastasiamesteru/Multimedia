let timeLeft = 30;
let isHard = false;
let easyWin=false;

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

// let puzzleImage = new Image();
// let puzzlePieces = [];
// let puzzleGrid = 3; // default size for 'easy' (3x3)
//we have 4x4 grid for medium
//we have 5x5 grid for hard


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

  document.getElementById("timerSound").pause();
  document.getElementById("timerSound").currentTime = 0;

}

function initializeLevelButtons() {
 // document.getElementById("introSound").play();

  document.getElementById("easyBtn").addEventListener("click", function () {
    $("#puzzle-container").removeAttr("style");
    document.getElementById("mediumBtn").disabled = true;
    document.getElementById("hardBtn").disabled = true;
    easyWin=true;
    // setDifficulty(3);
    // canva.addEventListener("load",  (e) =>{
    //     context.drawImage(poza,10,10);
    // } )
  });

  document.getElementById("mediumBtn").addEventListener("click", function () {
    $("#puzzle-container").removeAttr("style");
    $("#timer-container").removeAttr("style");
    $("#timer").removeAttr("style");
    $(".btn-success").removeAttr("style");
    $(".btn-danger").removeAttr("style");
    $("#poza1").attr("style", "display:none");
    $("#poza2").attr("style", "display:none");
    $("#poza3").attr("style", "display:none");
    $("#poza4").attr("style", "display:none");
    $("#poza5").attr("style", "display:none");
    $("#poza6").attr("style", "display:none");
    $("#poza7").attr("style", "display:none");
    $("#poza8").attr("style", "display:none");
    $("#poza9").attr("style", "display:none");
    document.getElementById("easyBtn").disabled = true;
    document.getElementById("hardBtn").disabled = true;
    easyWin=true;
    timer();

    //setDifficulty(4);
  });

  document.getElementById("hardBtn").addEventListener("click", function () {
    $(".alert-danger").removeAttr("style")
    $("#timer-container").removeAttr("style");
    $("#timer").removeAttr("style");
    $(".btn-success").removeAttr("style");
    $(".btn-danger").removeAttr("style");
    document.getElementById("startBtn").disabled=true;
    document.getElementById("resetBtn").disabled=true;

    setTimeout( ()=>{  $(".alert-danger").hide();
    $(".hearts").removeAttr("style");
    $("#lives1").removeAttr("style");
    $("#lives2").removeAttr("style");
    $("#lives3").removeAttr("style");
    $(".hearts").css("display", "block");
    $("#lives1").attr("style", "display:inline-block");
    $("#lives2").attr("style", "display:inline-block");
    $("#lives3").attr("style", "display:inline-block");
    $("#puzzle-container").removeAttr("style");
   
    $("#poza1").attr("style", "display:none");
    $("#poza2").attr("style", "display:none");
    $("#poza3").attr("style", "display:none");
    $("#poza4").attr("style", "display:none");
    $("#poza5").attr("style", "display:none");
    $("#poza6").attr("style", "display:none");
    $("#poza7").attr("style", "display:none");
    $("#poza8").attr("style", "display:none");
    $("#poza9").attr("style", "display:none");
    document.getElementById("mediumBtn").disabled = true;
    document.getElementById("easyBtn").disabled = true;
    document.getElementById("startBtn").disabled=false;
    document.getElementById("resetBtn").disabled=false;


    isHard = true;
    easyWin=true;
    //setDifficulty(5);

  },2300)
timer();

//


  });
}

function setDifficulty(gridSize) {
  puzzleGrid = gridSize;
  canvas.width = 350;
  canvas.height = 350;
  //drawPuzzle();
}

function myStopFunction() {
  clearTimeout(myTimeout);
}

function timer() {
  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");

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
        if(counter<9){
            triggerGameOver();

        }
      }
    }, 1000);
    showpuzzle();
    document.getElementById("timerSound").play(); 

  }

  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
}

function showpuzzle(){
    $("#poza1").removeAttr("style");
    $("#poza2").removeAttr("style");
    $("#poza3").removeAttr("style");
    $("#poza4").removeAttr("style");
    $("#poza5").removeAttr("style");
    $("#poza6").removeAttr("style");
    $("#poza7").removeAttr("style");
    $("#poza8").removeAttr("style");
    $("#poza9").removeAttr("style");

}
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

var counter = 0;
var counterHard=0;
//let timerId = null;
//let timeLeft = 30;
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var img = document.getElementById(data);
  var canvas = document.getElementById("puzzleCanvas");
  var ctx = canvas.getContext("2d");

  // Draw the image on canvas at drop position
  var rect = canvas.getBoundingClientRect();
  var x = ev.clientX - rect.left - img.width / 2;
  var y = ev.clientY - rect.top - img.height / 2;
  if (data == "poza1") {
    if (x <= 100 && y <= 90) {
      x = 10;
      y = 30;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 
    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 
    }
  }
  if (data == "poza2") {
    if (x >= 30 && x <= 190 && y <= 50) {
      x = 111;
      y = 30;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  }
  if (data == "poza3") {
    if (x >= 120 && x <= 500 && y <= 50) {
      x = 200;
      y = 30;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  }
  if (data == "poza4") {
    if (x <= 100 && y <= 180 && y >= 50) {
      x = 10;
      y = 120;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  }
  if (data == "poza5") {
    if (x >= 50 && x <= 190 && y <= 180 && y >= 50) {
      x = 111;
      y = 120;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  }
  if (data == "poza6") {
    if (x >= 120 && x <= 500 && y <= 180 && y >= 50) {
      x = 200;
      y = 120;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  }
  if (data == "poza7") {
    if (x <= 90 && y <= 300 && y >= 150) {
      x = 10;
      y = 210;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  }
  if (data == "poza8") {
    if (x >= 50 && x <= 200 && y <= 260 && y >= 150) {
      x = 110;
      y = 192;
      ctx.drawImage(img, x, y);
      img.style.display = "none";

      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  }
  if (data == "poza9") {
    if (x >= 120 && x <= 500 && y <= 260 && y >= 150) {
      x = 223;
      y = 210;
      ctx.drawImage(img, x, y);
      img.style.display = "none";
      counter++;
      document.getElementById("correctSound").play(); 

    }
    else{
        counterHard++;
        document.getElementById("wrongSound").play(); 

    }
  } 
  if (counter == 9) {
    resetTimer();
  }

  if(counterHard==1){
   $("#lives1").hide();
  }
  if(counterHard==2){
    $("#lives2").hide();
   }
   if(counterHard==3){
    $("#lives3").hide();
   }

    if(counterHard==3 && isHard==true){
       
         $("#puzzleCanvas").hide();
        
        $("#timer-container").removeAttr("style");
        $("#timer").removeAttr("style");
        $(".btn-success").removeAttr("style");
        $(".btn-danger").removeAttr("style");
        $("#poza1").attr("style", "display:none");
        $("#poza2").attr("style", "display:none");
        $("#poza3").attr("style", "display:none");
        $("#poza4").attr("style", "display:none");
        $("#poza5").attr("style", "display:none");
        $("#poza6").attr("style", "display:none");
        $("#poza7").attr("style", "display:none");
        $("#poza8").attr("style", "display:none");
        $("#poza9").attr("style", "display:none");
        //$("#gameOver").removeAttr("style");
        $("#timer-container").hide();
        $("#timer").hide();
        
        // Hide buttons and images
        $(".btn-success").hide();
        $(".btn-danger").hide();
        $("#easyBtn").hide();
        $("#mediumBtn").hide();
        triggerGameOver();
        $("#gameOver").removeAttr("style");

        resetTimer();
      }

    

    if(counter==9 && easyWin==true){
        resetTimer();
        setTimeout( ()=>{ 

        $("#puzzleCanvas").hide();
        
        $("#timer-container").removeAttr("style");
        $("#timer").removeAttr("style");
        $(".btn-success").removeAttr("style");
        $(".btn-danger").removeAttr("style");
        $("#poza1").attr("style", "display:none");
        $("#poza2").attr("style", "display:none");
        $("#poza3").attr("style", "display:none");
        $("#poza4").attr("style", "display:none");
        $("#poza5").attr("style", "display:none");
        $("#poza6").attr("style", "display:none");
        $("#poza7").attr("style", "display:none");
        $("#poza8").attr("style", "display:none");
        $("#poza9").attr("style", "display:none");
        //$("#gameOver").removeAttr("style");
        $("#timer-container").hide();
        $("#timer").hide();
        
        // Hide buttons and images
        $(".btn-success").hide();
        $(".btn-danger").hide();
        $("#easyBtn").hide();
        $("#mediumBtn").hide();
        $(".hearts").hide();
        $("#lives1").hide();
        $("#lives2").hide();
        $("#lives3").hide();
        $(".animated-text").removeAttr("style");
        $(".confetti-piece").removeAttr("style");
    }, 1000);
    document.getElementById("winSound").play(); 


    }

  console.log(isHard,"ishard???");
}

function triggerGameOver() {
    const gameOverDiv = document.getElementById('gameOver');

    gameOverDiv.classList.add('show');
    $("#puzzleCanvas").hide();
        
    $("#timer-container").removeAttr("style");
    $("#timer").removeAttr("style");
    $(".btn-success").removeAttr("style");
    $(".btn-danger").removeAttr("style");
    $("#poza1").attr("style", "display:none");
    $("#poza2").attr("style", "display:none");
    $("#poza3").attr("style", "display:none");
    $("#poza4").attr("style", "display:none");
    $("#poza5").attr("style", "display:none");
    $("#poza6").attr("style", "display:none");
    $("#poza7").attr("style", "display:none");
    $("#poza8").attr("style", "display:none");
    $("#poza9").attr("style", "display:none");
    //$("#gameOver").removeAttr("style");
    $("#timer-container").hide();
    $("#timer").hide();
    
    // Hide buttons and images
    $(".btn-success").hide();
    $(".btn-danger").hide();
    $("#easyBtn").hide();
    $("#mediumBtn").hide();
    $("#gameOver").removeAttr("style");

    document.getElementById("loseSound").play(); 
  }

