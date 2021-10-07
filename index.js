// You got this! 💫

let longBreak = document.getElementById("long-break-btn")
let shortBreak = document.getElementById("short-break-btn")
let work = document.getElementById("work-btn")
let timeDisplay = document.getElementById("base-timer-label")
let pauseTimer = document.getElementById("pause-timer")
let playTimer = document.getElementById("play-timer")
let StopAlarm = document.getElementById("stop-alarm")
let timeOut;

longBreak.addEventListener('click', function () { startTimer(15) })
shortBreak.addEventListener('click', function () { startTimer(5) })
work.addEventListener('click', function () { startTimer(25) })



function startTimer(time){
    clearInterval(timeOut)
    let timerSec = time //*60
    showTime(timerSec)
    
    let mySound = new sound("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
    mySound.stop()
    
    timeOut = setInterval(function(){
        if(timerSec == 0){
            mySound.play()
            clearInterval(timerSec)
            showTime(0)
            setCircleDasharray(283)
        }else{
            mySound.stop()
            timerSec--
            showTime(timerSec)
            setCircleDasharray(calculateTimeFraction(timerSec, time))
        }
    },1000);     
}

function showTime(timerSec){
    let minutes = pad(Math.floor(timerSec/60))
    let seconds = pad(timerSec % 60)
    
    let time = `${minutes}:${seconds}`
    timeDisplay.innerText = time
    document.title = 'Timer'+time
}

function pad(number){
    return number < 10 ? `0${number.toString()}`: number
}

const COLOR_CODES = {
  info: {
    color: "green"
  }
};

let remainingPathColor = COLOR_CODES.info.color

document.getElementById("app").innerHTML = `
    <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>`
function calculateTimeFraction(timeLeft, timeLimit){
    return timeLeft/(timeLimit) //* 60)
}

function setCircleDasharray(number) {
  const circleDasharray = `${(
    number * 283
  ).toFixed(0)} 283`;
  document.getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
