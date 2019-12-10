const burgerMenu = () => {

  const btnMenu = document.querySelector('.menu-button'),
    popUpMenuHiddenLarge = document.querySelector('.popup-menu'),
    menuLi = popUpMenuHiddenLarge.querySelectorAll('li'),
    imgDelete = document.querySelector('img[src = "images/delete.png"]');

  //Показываем меню, если ширина экранной области < 768
  btnMenu.addEventListener('click', () => {
    if (document.documentElement.offsetWidth  < 768){
      popUpMenuHiddenLarge.style.display = 'block';
    }
  });

  //обработка кликов на закрытие по .close-menu-btn( по img imgDelete) и элементам меню
  popUpMenuHiddenLarge.addEventListener('click', (event) => {
  let target =  event.target;
  
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

export default burgerMenu;