'use strict';
import bugFixFocusForm from './modules/bugFixFocusForm';
import validation from './modules/validation';
import burgerMenu from './modules/burgerMenu';
import togglePopUp from './modules/togglePopUp';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import calc from './modules/calc';
import toggleThanks from './modules/toggleThanks';

//import gallerySlider from './modules/gallerySlider';
////
/*


import countTimer from './modules/countTimer';

import tabs from './modules/tabs';
import toggleImg from './modules/toggleImg';
import onlyNumber from './modules/onlyNumber';
import slider from './modules/slider';
// import cleaningInput from './modules/cleaningInput';





// таймер

countTimer('10 december 2019');

//menu
toggleMenu();

//popup

togglePopUp();

// tabs
tabs();

//img mouse toggle
toggleImg();

//calc only number input
onlyNumber();

slider();


calc(100);



*/
//gallerySlider();
toggleThanks();
bugFixFocusForm();
validation();
// send-ajax
sendForm();
togglePopUp();
burgerMenu();
slider('.main-slider');
slider('.gallery-slider');
calc();