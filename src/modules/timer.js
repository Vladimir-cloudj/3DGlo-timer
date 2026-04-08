const timer = (deadline) => {

    const timerHours = document.getElementById("timer-hours");
    const timerMinutes = document.getElementById("timer-minutes");
    const timerSeconds = document.getElementById("timer-seconds");

    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = (dateStop - dateNow) / 1000;
        if (timeRemaining <= 0) {
          return {
            timeRemaining,
            hours: 0, 
            minutes: 0,
            seconds: 0
          }
        }
        let days = Math.floor((timeRemaining / 60 / 60 / 24) );
        let hours = Math.floor((timeRemaining / 3600) % 24);
        let minutes = Math.floor((timeRemaining / 60) % 60);
        let seconds = Math.floor(timeRemaining % 60);

        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        }
    }

    const updateClock = () => {
      let getTime = getTimeRemaining();
      if (getTime.timeRemaining <= 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        return
      }
      // вывести количество дней перед остальными числами
      timerHours.textContent = addZero(getTime.hours);
      timerMinutes.textContent = addZero(getTime.minutes);
      timerSeconds.textContent = addZero(getTime.seconds);
    
      // if (getTime.timeRemaining > 0) {
        // setTimeout(updateClock, 1000);
      // }
    }

    function addZero(num) {
      if (num < 10) {
        return '0' + num;
      }
      return num;
    }

    updateClock();
    setInterval(updateClock, 1000)
}

export default timer