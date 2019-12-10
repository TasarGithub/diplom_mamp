'use strict';

// скрипты
const toggMenuWidth767 = () => {
  const btnMenu = document.querySelector('.menu-button'),
  
    popUpMenuHiddenLarge = document.querySelector('.popup-menu'),
    closeMenuBtn = document.querySelector('.close-menu-btn'),
    imgDelete = document.querySelector('img[src = "images/delete.png"]'),
    menuLi = popUpMenuHiddenLarge.querySelectorAll('li');

    // console.log('imgDelete: ', imgDelete); 
    //  console.log('menuLi: ', menuLi);
    // console.log('popUpMenuHiddenLarge: ', popUpMenuHiddenLarge);
    // console.log('hiddenLarge: ', btnMenu);

  // closeMenuBtn.addEventListener('onclick', () => {
  //   popUpMenuHiddenLarge.style.display = 'none';
  // });


  btnMenu.addEventListener('click', () => {
    if (document.documentElement.offsetWidth  < 768){
      
      popUpMenuHiddenLarge.style.display = 'block';
    }
  });
  //обработка кликов на закрытие по closeBtn и элементам меню
    popUpMenuHiddenLarge.addEventListener('click', (event) => {
    let target =  event.target;
    // console.log('target: ', target);
    
      if (target === imgDelete){
      popUpMenuHiddenLarge.style.display = 'none';
      } else if (target.href !== undefined) {
        popUpMenuHiddenLarge.style.display = 'none';
      } else {
        menuLi.forEach((elem) => { 
          if (target === elem){
            popUpMenuHiddenLarge.style.display = 'none';
          } 
        });
      }
    });
  

};
toggMenuWidth767();