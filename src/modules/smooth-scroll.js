export default function smoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  const duration = 800;

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = this.getAttribute("href").substr(1);
      if (!blockID) return;

      const targetBlock = document.getElementById(blockID);
      if (!targetBlock) return;

      const targetPosition =
        targetBlock.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;

      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const position = startPosition + distance * easeInOutQuad(progress);

        window.scrollTo(0, position);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      }

      requestAnimationFrame(animation);
    });
  });
}
