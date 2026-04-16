const menu = () => {
  const menuBtn = document.querySelector('.menu');
  const menu = document.querySelector('menu');
  const closeBtn = menu.querySelector('.close-btn')
  const menuItems = menu.querySelectorAll('li>li>a')

  const handleMenu = () => {
    // if (!menu.style.transform) {
    //   menu.style.transform = "translateX(0)";
    // } else {
    //   menu.style.transform = "";
    // }
    menu.classList.toggle('active-menu')
  }

  menuBtn.addEventListener('click', handleMenu)

  closeBtn.addEventListener("click", handleMenu);

//   for (let i = 0; i < menuItems.length; i++) {
//     menuItems[i].addEventListener('click', handleMenu)
//   }
  menuItems.forEach((item) => item.addEventListener("click", handleMenu))
};
export default menu;
