import { animate } from "../helpers.js";

const modal = () => {
  const modal = document.querySelector(".popup");
  const buttons = document.querySelectorAll(".popup-btn");
  const closeBtn = modal.querySelector(".popup-close");
  const modalContent = modal.querySelector(".popup-content");

  function isMobile() {
    return window.innerWidth < 768;
  }

  function showModalAnimated() {
    modal.style.display = "block";
    if (isMobile()) {
      modalContent.style.opacity = "";
      modalContent.style.transition = "none";
      modalContent.style.transform = "";
      return;
    }

    modalContent.style.transition = "none";
    modalContent.style.opacity = "0";
    modalContent.offsetHeight;

    animate({
      duration: 300,
      timing(timeFraction) {
        // ease-out quad
        return 1 - Math.pow(1 - timeFraction, 2);
      },
      draw(progress) {
        modalContent.style.opacity = progress;
        // Доп. анимация
        modalContent.style.transform = `scale(${0.8 + 0.2 * progress})`;
      },
    });
  }

  function hideModalAnimated() {
    if (isMobile()) {
      modal.style.display = "none";
      modalContent.style.opacity = "";
      return;
    }

    const currentOpacity = parseFloat(
      window.getComputedStyle(modalContent).opacity,
    );
    modalContent.style.transition = "none";
    modalContent.style.opacity = currentOpacity;
    modalContent.offsetHeight;

    animate({
      duration: 300,
      timing(timeFraction) {
        // ease-in quad
        return Math.pow(timeFraction, 2);
      },
      draw(progress) {
        modalContent.style.opacity = 1 - progress;
        modalContent.style.transform = `scale(${1 - 0.2 * progress})`;
      },
      complete: () => {
        modal.style.display = "none";
        modalContent.style.opacity = "";
        modalContent.style.transform = "";
      },
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showModalAnimated();
    });
  });

  closeBtn.addEventListener("click", () => {
    hideModalAnimated();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModalAnimated();
    }
  });

  window.addEventListener("resize", () => {
    if (modal.style.display === "block" && isMobile()) {
      modalContent.style.opacity = "";
      modalContent.style.transition = "none";
    }
  });
};

export default modal;
