const startButtonEl = document.querySelector('#start');
const stopButtonEl = document.querySelector('#stop');
const inputEl = document.querySelector('input');
const timerEl = document.querySelector('span');
const formEl = document.querySelector('form');
const CURRENT_TIMER = "currentTimer";

function startTimer() {
  if (localStorage.getItem(CURRENT_TIMER) === null) {
    localStorage.setItem(CURRENT_TIMER, inputEl.value);
  }

  createTimerAnimator(+localStorage.getItem(CURRENT_TIMER));

  [inputEl.disabled, startButtonEl.disabled] = [true, true];
  [stopButtonEl.hidden, startButtonEl.hidden, inputEl.hidden] = [false, true, true];
}

function stopTimer() {
  clearInterval(window.interval);

  localStorage.clear();

  timerEl.innerText = "";

  [inputEl.disabled, startButtonEl.disabled] = [false, false];
  [stopButtonEl.hidden, startButtonEl.hidden, inputEl.hidden] = [true, false, false];
}


window.onload = () => {
  if (localStorage.getItem(CURRENT_TIMER) !== null) {
    startTimer();
  }
}

function createTimerAnimator(seconds) {
  window.interval = setInterval(() => {

    if (+localStorage.getItem(CURRENT_TIMER) <= 0) {
      return stopTimer();
    }

    timerEl.innerText = new Date(seconds * 1000).toISOString().substring(11, 19);

    seconds--;
    localStorage.setItem(CURRENT_TIMER, seconds);
  }, 1000);
  inputEl.value = '';
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  startTimer();
});

stopButtonEl.addEventListener('click', stopTimer);
