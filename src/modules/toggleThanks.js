//import bugFixFocusForm from './bugFixFocusForm';

const toggleThanks = () => {
     
  const popUpThanks = document.getElementById('thanks'),
      pThanks = popUpThanks.querySelector('p'); 

      const popUpBtn = document.querySelector( `button` ); 
      
      const closePopUp = () => {
        popUpThanks.style.display = 'none';
        pThanks.innerHTML = 'Ваша заявка отправлена. <br> Мы свяжемся с вами в ближайшее время.';
        
      };

      // закрытие мод окна по клику мимо него  и на крестик
      popUpThanks.addEventListener('click', (event) =>{
        let target = event.target;

        if (target.classList.contains('close-form') || target.classList.contains('close_icon') || 
            target.classList.contains('close-btn') ){

          closePopUp();
        } else {
          target = target.closest('.form-content');
          if (!target) {
            closePopUp();
          }
        }
      });   

};

export default toggleThanks;