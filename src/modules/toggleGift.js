const toggleGift = () => {

  

  const fixedGift = document.querySelector('.fixed-gift'),
    gift = document.getElementById('gift'),
    overlayGift = gift.querySelector('.overlay'),
    body = document.querySelector('body');
  
    console.log('toggleGift document.querySelector(#services wrapper): ', document.querySelector('#services'));

    //debugger;

    fixedGift.addEventListener('click', (event) =>{
      gift.style.display = 'block';
    });

    // закрытие мод окна по клику мимо него  и на крестик
    body.addEventListener('click', (event) =>{
      let target = event.target;

      if (target.classList.contains('close-form') || target.classList.contains('close_icon') || 
          target.classList.contains('close-btn') || target === overlayGift ){
        gift.style.display = 'none';
        fixedGift.style.display = 'none';
      } 
    });   

};

export default toggleGift;