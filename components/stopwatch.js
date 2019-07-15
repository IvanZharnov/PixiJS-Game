export const createStopwatch = () => {
  const time = document.getElementById('time');
  let seconds = 0;
  let minutes = 0;

  const add = () => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    time.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
  }

  const timer = () => setTimeout(add, 1000);

  setTimeout(() => timer(), 3000);
}