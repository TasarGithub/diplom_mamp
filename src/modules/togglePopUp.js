const togglePopUp = () => {
     
  const popUp = document.querySelectorAll('.popup');
        //popUp = document.getElementById('free_visit_form');
       
       
  popUp.forEach((popUpItem) => {
    //debugger;
    //console.log('popUpItem: ', popUpItem);
    //debb
    if ((popUpItem.id === 'callback_form') || (popUpItem.id === 'free_visit_form' )) {
      const popUpBtn = document.querySelector( `[data-popup="#${popUpItem.id}"]` ); 
   // } else if  {

   // }
      const  popUpContent = popUpItem.querySelector('.form-content');
      // кнопки запуска модальных окон

      console.log(`[data-popup=#"${popUpItem.id}"]`);
     // const popUpBtn = document.querySelector( `.${popUpItem.id}` ); 
      console.log('popUpBtn: ', popUpBtn);
      
       // console.log('popUpContent,popUp,popUpBtn: ', popUpContent,popUp,popUpBtn);
      let flyInterval,
        count = 0.01;
        popUpContent.style.opacity = 0;
        //alert('1111');
      //console.log('popUpItem: ', popUpItem);
      // popUpBtn.forEach((elem) => {
        popUpBtn.addEventListener('click', () => {
            // console.log('elem: ', elem);
            // if (elem.getAttribute('data-popup')=== '#free_visit_form') {
          //  if (elem.getAttribute('data-popup')=== '#free_visit_form') {
        popUpItem.style.display = 'block';
        console.log('popUpItem: ', popUpItem);
        flyInterval = requestAnimationFrame(flyAnimate);
        
         //  } else if (elem.getAttribute('data-popup') === '#callback_form') {
              //event.target.dataset.data
              // popUpItem.style.display = 'block';
              // console.log('popUpItem: ', popUpItem);
              // flyInterval = requestAnimationFrame(flyAnimate);
            // }
          
            
          });
        
      //});

      const closePopUp = () => {
        popUpItem.style.display = 'none';

        popUpContent.style.opacity = 0;
        //popUpContent
        count = 0.01;
        
        popUpContent.querySelectorAll('input').forEach(item => item.value = '');
        const tempDiv = popUpContent.querySelector('.status-message');
        if (!!tempDiv) {
          tempDiv.parentNode.removeChild(tempDiv);
        }
        cancelAnimationFrame(flyInterval);
      };

      // закрытие мод окна по клику мимо него
      popUpItem.addEventListener('click', (event) =>{
        let target = event.target;
        console.log('target.classList: ', target.classList);
        console.log('target.classList.contains(close_icon): ', target.classList.contains('close_icon'));
        console.log('target.classList.contains(close-form): ', target.classList.contains('close-form'));

        if (target.classList.contains('close-form') || target.classList.contains('close_icon')){

          closePopUp();
        } else {
          target = target.closest('.form-content');
          if (!target) {
            closePopUp();
          }
        }
      });   

      //anime

      let flyAnimate = () => {
        flyInterval = requestAnimationFrame(flyAnimate);
        count=count + 0.01;

        if (popUpContent.style.opacity <= 1) {
                popUpContent.style.opacity = count; 
            } else {
              cancelAnimationFrame(flyInterval);
            }
      }; 
    }
  });
};

export default togglePopUp;