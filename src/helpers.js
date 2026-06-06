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
      if (typeof complete === "function") {
        complete();
      }
    }
  });
};

export { animate };
