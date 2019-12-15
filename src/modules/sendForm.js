const sendForm = function () {

  const form = document.querySelectorAll('form'), //[method="post"]'),
  
  
  objMessage = {
    errorMessage: 'Что то не так ',
    loadMessage: 'Загрузка',
    succesMessage:  'Спасибо ! Скоро свяжемся с вами',
  },
  statusMessage =  document.createElement('div');
  let body = {};
  statusMessage.classList.add('status-message');
  statusMessage.style.cssText = 'font-size: 2rem; color: #fff;'; 

  statusMessage.textContent = objMessage.loadMessage;
  objMessage.div = statusMessage;
  console.log('sendForm form: ', form);
  //отправка данных на сервер
 
  const postData = (body) => {
    
    return  fetch('./server.php',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
  };

  // навешиваем оброботки события на submit
  form.forEach(item => { 
    const popUpContent = item.parentElement; // берем form-content , чтобы можно было пользоваться анимацией
    let flagPopUp = 0;

    if(item.id.indexOf('popup') !== -1 ){
      flagPopUp = 1;
    } 

    //анимация для popup
    let count = 1;
    let flyAnimate = () => {

      const flyInterval = requestAnimationFrame(flyAnimate);
      count = count - 0.005;

      if (popUpContent.style.opacity >= 0) {
        popUpContent.style.opacity = count; 
        } else {
          const tempDiv = popUpContent.querySelector('.status-message');
          if (!!tempDiv) {
            tempDiv.parentNode.removeChild(tempDiv);
          }
          cancelAnimationFrame(flyInterval);
          count = 0;
        }
    };

    item.addEventListener('submit', (event) => {
      
      statusMessage.textContent = objMessage.loadMessage;
      event.preventDefault();
      popUpContent.style.opacity = 1;
      count = 1;
      const popUpThanks = document.getElementById('thanks'),
      pGift = popUpThanks.querySelector('p'); 
      let target =  event.target;

      const formData =  new FormData(item);
      //debugger;
      let flagPhone = 0;
      formData.forEach((val, key) => {

        if (key === 'phone'&& val.length !== 18 ) {

          flagPhone = 1;
          return;
        } else {
          statusMessage.textContent = objMessage.loadMessage;;
        }
        body[key] = val;
      });
      if (flagPhone === 1){
        
        statusMessage.textContent = 'Введите номер телефона полность';
        if (item.id === 'card_order'){
          statusMessage.style.cssText = 'font-size: 1rem; color: #000; textAlign: center;'; 
        } else {
          statusMessage.style.cssText = 'font-size: 1rem; color: #fff;'; 
        }
        item.appendChild(objMessage.div);
        return;
      } else {
        if (flagPopUp === 1) {
          statusMessage.style.cssText = 'font-size: 2rem; color: #fff;'; 
        } else {
          statusMessage.textContent ='';
        }
      }

      //очистка форм
      const cleaningPopUp = () => {

        item.querySelectorAll('input').forEach(item =>{
          if(item.type ==='text' || item.type ==='tel' ){
            
           item.value = '';
          } else if (item.type === 'checkbox'){
            item.checked = false;
          }
         });
        
        if (flagPopUp === 1) {
          item.dataset.flagNone = 1;
          item.querySelectorAll('*').forEach(itemInp => {
            if (itemInp.tagName === 'INPUT' || itemInp.tagName === 'P' || itemInp.tagName === 'BUTTON'){
              itemInp.style.display = 'none';
            }
          });
          flyAnimate();
          const popUpClose = target.closest('.popup');
          
          setTimeout(() => { 
            popUpClose.style.display = 'none';
            },5000);
        }


      };
      if (flagPopUp === 1) {
        item.appendChild(objMessage.div);
      }

      postData(body)
      .then((response) => {
        if (response.status !== 200){
          throw new  Error('Status network not 200');
        }
        cleaningPopUp();
        if (flagPopUp === 1) {
          objMessage.div.textContent = objMessage.succesMessage;
        } else {
          popUpThanks.style.display = 'block';
        }

      })
      // все хорошо отправилось, можно закрывать форму, если она в статусе block
      .catch((error) => {
       // обнуление после ошибки отправки
       cleaningPopUp();
       if (flagPopUp === 1) {
        objMessage.div.textContent = objMessage.errorMessage;
       } else {
        popUpThanks.style.display = 'block';
        pGift.textContent = objMessage.errorMessage;
       }
        console.log('errorMessage: ', objMessage.errorMessage);
        console.error(error);
      });
    });
  });
  statusMessage.textContent = '';
};

export default sendForm;