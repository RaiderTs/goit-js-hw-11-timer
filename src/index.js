import './styles.css';
// создаем рефы
const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};
// создаем класс для  CountdownTimer
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

    this.init();
  }

  // вычисляем deltaTime (разница заданного времени и текущего)
  startTime() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    let time = this.getTimeComponents(deltaTime); // добавляем в функцию подсчета дней  получившийся deltaTime
    if (this.targetDate < currentTime) {
      clearInterval(this.intervalId);       // условие если заданное время меньше текущего
      time = this.getTimeComponents(0);
    }
    this.updateClockface(time); // записываем  результат в интерфейс
  }
  // создаем функцию интервала для времени
  init() {
    this.startTime();
    this.intervalId = setInterval(() => {
      this.startTime();
    }, 1000);
  }
  // функция для подсчета дней
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  //  Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
  pad(value) {
    return String(value).padStart(2, '0');
  }
  // подставляем получившиеся значения в интерфейс
  updateClockface({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
  }
}


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2020'),
});
window.onload = timer.startTime();
// document.addEventListener('DOMContentLoaded', timer.startTime());
