const menu = () => {
  const menuBtn = document.querySelector(".menu");
  const menuElement = document.querySelector("menu");
  const closeBtn = menuElement.querySelector(".close-btn");

  const toggleMenu = () => {
    menuElement.classList.toggle("active-menu");
  };
  menuElement.addEventListener("click", (event) => {
    if (event.target.closest(".close-btn")) {
      toggleMenu();
    }
    else if (event.target.closest("li > li > a")) {
      toggleMenu();
    }
  });
  menuBtn.addEventListener("click", toggleMenu);

  document.addEventListener("click", (event) => {
    const isClickInsideMenu = menuElement.contains(event.target);
    const isClickOnMenuBtn = menuBtn.contains(event.target);

    if (
      menuElement.classList.contains("active-menu") &&
      !isClickInsideMenu &&
      !isClickOnMenuBtn
    ) {
      toggleMenu();
    }
  });
};

export default menu;
