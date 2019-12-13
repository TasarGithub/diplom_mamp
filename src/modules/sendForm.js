const sendForm = function () {

  const form = document.querySelectorAll('form[method="post"]'),
  
  objMessage = {
    errorMessage: 'Что то не так ',
    loadMessage: 'Загрузка',
    succesMessage:  'Спасибо ! Скоро свяжемся с вами',
  },
  statusMessage =  document.createElement('div');
  let body = {};
  statusMessage.classList.add('status-message');
  statusMessage.style.cssText = 'font-size: 2rem; color: #fff;'; 
  // statusMessage.style.position = 'relative';
  // //formCheck.style.left = '70px';
  // statusMessage.style.top = '50%';

  statusMessage.textContent = objMessage.loadMessage;
  objMessage.div = statusMessage;

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
  //анимация для popup
  let count = 1;

  let flyAnimate = () => {

    const flyInterval = requestAnimationFrame(flyAnimate);
    count = count - 0.005;

    if (popUpContent.style.opacity >= 0) {
      popUpContent.style.opacity = count; 
      } else {
        //popUp.style.display = 'none';
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

      let target =  event.target;
      const cleaningPopUp = () => {
      
        // cleaningInput(item);
        item.querySelectorAll('input').forEach(item =>{
          console.log('item.type: ', item.type);
          if(item.type ==='text' || item.type ==='tel' ){
            
           item.value = '';
          } else if (item.type === 'checkbox'){
            item.checked = false;
            console.log(' item.checked : ',  item.checked );
          }
         });
        
        
        // noneElemeneForm(item);
        item.dataset.flagNone = 1;
        item.querySelectorAll('*').forEach(itemInp => {
          if (itemInp.tagName === 'INPUT' || itemInp.tagName === 'P' || itemInp.tagName === 'BUTTON'){
            itemInp.style.display = 'none';
          // }else if(itemInp.tagName === 'P' || itemInp.tagName === 'BUTTON') {
          //   itemInp.style.display = 'none';
          }
        });

        flyAnimate();
        const popUpClose = target.closest('.popup');
        
        setTimeout(() => { 
          popUpClose.style.display = 'none';
          },5000);
      };

      let flag = 0;
      const formData =  new FormData(item);

      formData.forEach((val, key) => {
        body[key] = val;
      });

      item.appendChild(objMessage.div);

      postData(body)
      .then((response) => {
        if (response.status !== 200){
          throw new  Error('Status network not 200');
        }

        cleaningPopUp();
        objMessage.div.textContent = objMessage.succesMessage;

      })
      // все хорошо отправилось, можно закрывать форму, если она в статусе block
      .catch((error) => {
       // обнуление после ошибки отправки
        cleaningPopUp();
        objMessage.div.textContent = objMessage.errorMessage;
        console.log('errorMessage: ', objMessage.errorMessage);
        console.error(error);
      });
    });
  });
  statusMessage.textContent = '';
};

export default sendForm;