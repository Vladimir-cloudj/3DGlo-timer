const menu = () => {
    const menuBtn = document.querySelector('.menu');
    const menuElement = document.querySelector('menu');
    
    const handleMenu = () => {
        menuElement.classList.toggle('active-menu');
    };
    
    menuBtn.addEventListener('click', handleMenu);
    
    menuElement.addEventListener('click', (event) => {
        if (event.target.closest('.close-btn')) {
            handleMenu();
        }
        else if (event.target.closest('li > li > a')) {
            handleMenu();
        }
    });
};

export default menu;
