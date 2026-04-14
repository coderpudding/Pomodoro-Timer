const setTimerRef = { id: null };
let state = "work";
let pause = false;
let timer;

const progress = document.getElementById("pomodoro-progress");
const clock = document.getElementById("timer");
const status = document.getElementById("status");
const switchOn = document.getElementById("switchOn");
const switchPause = document.getElementById("switchPause");
const pomodoroVal = document.getElementById("pomodoro-val");
const breakVal = document.getElementById("break-val");
const sliderPomodoro = document.getElementById("slider-pomodoro");
const sliderBreak = document.getElementById("slider-break");

sliderPomodoro.addEventListener("input", () => {
  pomodoroVal.textContent = sliderPomodoro.value;
});
sliderBreak.addEventListener("input", () => {
  breakVal.textContent = sliderBreak.value;
});

function progressTimer(elapsed, duration) {
  return (elapsed / duration) * 100;
}

function startTimer(duration, breakTime) {
  timer = duration - 1;
  setTimerRef.id = setInterval(() => {
    if (pause) return;
    const min = String(Math.floor(timer / 60)).padStart(2, "0");
    const sec = String(timer % 60).padStart(2, "0");
    clock.textContent = `${min}:${sec}`;
    const elapsed = state === "work" ? duration - timer : breakTime - timer;
    const total = state === "work" ? duration : breakTime;
    progress.style.width = progressTimer(elapsed, total) + "%";

    if (--timer < 0) {
      if (state === "work") {
        state = "break";
        status.textContent = "break";
        timer = breakTime;
      } else {
        status.textContent = "work";
        state = "work";
        timer = duration;
      }
    }
  }, 1000);
}

switchOn.addEventListener("click", () => {
  const btnText = switchOn.querySelector("span").textContent;
  const minutes = parseInt(sliderPomodoro.value);
  const breakTime = parseInt(sliderBreak.value);
  clock.textContent = `${String(minutes).padStart(2, "0")}:00`;

  if (btnText === "start") {
    status.textContent = "working";
    status.style.color = "#FF0";
    switchOn.querySelector("span").textContent = "stop";
    switchOn.querySelector("i").className = "fa fa-stop";
    switchPause.disabled = false;
    startTimer(60 * minutes, 60 * breakTime);
  } else {
    status.textContent = "--";
    clearInterval(setTimerRef.id);
    progress.style.width = "0";
    pause = false;
    state = "work";
    switchOn.querySelector("span").textContent = "start";
    switchOn.querySelector("i").className = "fa fa-play";
    switchPause.disabled = true;
    switchPause.querySelector("span").textContent = "pause";
    switchPause.querySelector("i").className = "fa fa-pause";
  }
});

switchPause.addEventListener("click", () => {
  pause = !pause;
  const spanText = switchPause.querySelector("span").textContent;
  if (spanText === "pause") {
    switchPause.querySelector("span").textContent = "resume";
    switchPause.querySelector("i").className = "fa fa-play";
  } else {
    switchPause.querySelector("span").textContent = "pause";
    switchPause.querySelector("i").className = "fa fa-pause";
  }
});
