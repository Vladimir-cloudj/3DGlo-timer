import menu from './modules/menu.js'
import timer from './modules/timer.js'
import modal from './modules/modal.js'
import smoothScroll from './modules/smooth-scroll.js';
import calculator from "./modules/calculator.js";
import calc from "./modules/calc.js";       
import formValidation from "./modules/form-validation.js"; 
import tabs from "./modules/tabs.js";
import slider from "./modules/slider.js";
import swiperSlider from './modules/swiper-slider.js';
import sendForm from "./modules/sendForm.js";

timer("29 june 2026");

menu();
modal();

smoothScroll();

calculator();
calc()
formValidation();  
tabs()
slider()
swiperSlider()
sendForm({
    formId: 'form1', 
    someElem: [
        {
            type: 'block',
            id: 'total'
        }
    ]
})