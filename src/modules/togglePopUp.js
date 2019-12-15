//import bugFixFocusForm from './bugFixFocusForm';

const togglePopUp = () => {
     
  const popUp = document.querySelectorAll('.popup');
        //popUp = document.getElementById('free_visit_form');
       
       
  popUp.forEach((popUpItem) => {
    //debugger;
    if ((popUpItem.id === 'callback_form') || (popUpItem.id === 'free_visit_form' )) {
      
      const popUpBtn = document.querySelector( `[data-popup="#${popUpItem.id}"]` ); 
      //console.log('popUpBtn: ', popUpBtn);

      //console.log('popUpItem: ', popUpItem);
      const  popUpContent = popUpItem.querySelector('.form-content'),
       // popUpForm = popUpItem.querySelector('form[name = "callback_form"');//[name ="${popUpItem.id}"]`);
       popUpForm = popUpItem.querySelector('form');
        //console.log('popUpForm: ', popUpForm);
      // кнопки запуска модальных окон

      
      let flyInterval,
        count = 0.01;
      
      popUpContent.style.opacity = 0;

      //фция открытия мод окна
        popUpBtn.addEventListener('click', () => {
          // проверка , если очистили форму и вызываем вторично, то показать все поля вновь за счет
          // удаления расставленных нами style.display === 'none'

          if (popUpForm.dataset.hasOwnProperty ('flagNone')){

            popUpForm.querySelectorAll('*').forEach(item => {

              if (item.hasAttribute('style')){
                
                if (item.style.display === 'none') {
                  item.removeAttribute('style');
                }
              }

            });
          }

          // обходим ошибку фокусировки на невидимом чекбоксе при открытии формы , при условии requared на чекбоксе
          //let bugix =bugFixFocusForm.bind(this);  
          //const formCheck = popUpItem.querySelector('input[type ="checkbox"]');
   //debugger;
          //bugFixFocusForm(formCheck);
          
          popUpItem.style.display = 'block';
          flyInterval = requestAnimationFrame(flyAnimate);
        });

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

      // закрытие мод окна по клику мимо него  и на крестик
      popUpItem.addEventListener('click', (event) =>{
        let target = event.target;

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