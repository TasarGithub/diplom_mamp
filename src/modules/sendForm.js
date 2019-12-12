const sendForm = () => {
/* 

<form action="" id="footer_form">

<form name="banner-form" id="banner-form" action="#" method="post">

<form action="" id="card_order">

<form name="callback-form" id="form1" action="#" method="post">

<form name="free-visit-form" id="form2" action="#" method="post">

*/





  const popUp = document.querySelector('.popup'),
  popUpContent = document.querySelector('.popup-content'),
  form = document.querySelectorAll('form[method="post"]'),
  
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

  console.log('form: ', form);

  //анимация для popup
  let count = 1;
  let flyAnimate = () => {

    const flyInterval = requestAnimationFrame(flyAnimate);
    count = count - 0.005;

    if (popUpContent.style.opacity >= 0) {
      popUpContent.style.opacity = count; 
      } else {
        popUp.style.display = 'none';
        const tempDiv = popUpContent.querySelector('.status-message');
        if (!!tempDiv) {
          tempDiv.parentNode.removeChild(tempDiv);
        }
        cancelAnimationFrame(flyInterval);
        count = 0;
      }
  };
  // отправка данных на сервер
 
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
    const popUpContent = item.querySelector('.popup-content');
    item.addEventListener('submit', (event) => {
      debugger;
      let flag = 0;
      const formData =  new FormData(item);
      // debugger;
      formData.forEach((val, key) => {
        
        if ((val.trim() === '') && (key.indexOf('mess') === -1)) {
          flag = 1;
        }
        body[key] = val;
      });
      
      event.preventDefault();

      if (flag) return; // незаполненная часть формы -уходим
      item.appendChild(objMessage.div);
      // alert('postdata next');
      postData(body)
      .then((response) => {
        console.log('response.status: ', response.status);
        if (response.status !== 200){
          throw new  Error('Status network not 200');
        }
        item.querySelectorAll('input').forEach(item => item.value = '');
        objMessage.div.textContent = objMessage.succesMessage;
      })
      .then(() => {
        console.log('form: ', item);
        console.log('form.style.display: ', item.style.display);
        if (item.style.display === 'block'){
          
          
          //flyAnimate();
        } else {
        const tempDiv = item.querySelector('.status-message');
        setTimeout(() => { 
          if (!!tempDiv) {
          tempDiv.parentNode.removeChild(tempDiv);}
          },4000);
        }
      })
      .catch((error) => {
        objMessage.div.textContent = objMessage.errorMessage;
        console.log('errorMessage: ', objMessage.errorMessage);
        console.error(error);
      });
    });
  });
};

export default sendForm;