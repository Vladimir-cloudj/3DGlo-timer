// helpers.js
const slicer = (str, num = 20) => {
  return str.trim().length > num
    ? str.trim().substring(0, num).trim() + "..."
    : str.trim();
};

// animate с поддержкой колбэка после завершения
const animate = ({ timing, draw, duration, complete = null }) => {
  let start = performance.now();
  requestAnimationFrame(function step(timestamp) {
    let timeFraction = (timestamp - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);
    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(step);
    } else {
      // Вызываем колбэк после завершения анимации
      if (typeof complete === "function") {
        complete();
      }
    }
  });
};

export { slicer, animate };
