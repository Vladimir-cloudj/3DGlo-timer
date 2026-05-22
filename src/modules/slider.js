const slider = ({
  sliderSelector = ".portfolio-content", 
  slideSelector = ".portfolio-item", 
  dotsSelector = ".portfolio-dots", 
  prevSelector = ".portfolio-btn.prev", 
  nextSelector = ".portfolio-btn.next", 
  activeSlideClass = "portfolio-item-active",
  activeDotClass = "dot-active", 
} = {}) => {

  const sliderBlock = document.querySelector(sliderSelector);
  const slides = document.querySelectorAll(slideSelector);
  const dotsContainer = document.querySelector(dotsSelector);

  if (!sliderBlock) {
    console.warn(`Слайдер не найден: ${sliderSelector}`);
    return;
  }

  if (slides.length === 0) {
    console.warn(`Слайды не найдены: ${slideSelector}`);
    return;
  }

  if (!dotsContainer) {
    console.warn(`Контейнер точек не найден: ${dotsSelector}`);
    return;
  }

  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    if (index === 0) {
      dot.classList.add(activeDotClass);
    }

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");
  const timeInterval = 2000;
  let currentSlide = 0;
  let interval;

  const prevSlide = (elems, index, strClass) => {
    elems[index]?.classList.remove(strClass);
  };

  const nextSlide = (elems, index, strClass) => {
    elems[index]?.classList.add(strClass);
  };

  const autoSlide = () => {
    prevSlide(slides, currentSlide, activeSlideClass);
    prevSlide(dots, currentSlide, activeDotClass);

    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    nextSlide(slides, currentSlide, activeSlideClass);
    nextSlide(dots, currentSlide, activeDotClass);
  };

  const startSlide = (timer = 2000) => {
    interval = setInterval(autoSlide, timer);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  sliderBlock.addEventListener("click", (e) => {
    e.preventDefault();

    if (!e.target.matches(`${prevSelector}, ${nextSelector}, .dot`)) {
      return;
    }

    prevSlide(slides, currentSlide, activeSlideClass);
    prevSlide(dots, currentSlide, activeDotClass);

    if (e.target.matches(nextSelector)) {
      currentSlide++;
    }
    else if (e.target.matches(prevSelector)) {
      currentSlide--;
    }
    else if (e.target.classList.contains("dot")) {
      dots.forEach((dot, index) => {
        if (e.target === dot) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    nextSlide(slides, currentSlide, activeSlideClass);
    nextSlide(dots, currentSlide, activeDotClass);
  });

  sliderBlock.addEventListener("mouseenter", () => {
    stopSlide();
  });

  sliderBlock.addEventListener("mouseleave", () => {
    startSlide(timeInterval);
  });

  startSlide(timeInterval);
};

export default slider;
