'use strict';

// скрипты
const validation = () => {

  const inputName =  document.querySelectorAll('input[type="text"]'),
        inputTelephone = document.querySelectorAll('input[type="tel"]');
  //валидация 
  inputName.forEach(item => {
    item.addEventListener('input',() => {
      //debugger;
      item.value = item.value.replace(/[^а-яё\s]/gi, '');
    });
  });     
 // ввод телефона по форме 
  inputTelephone.forEach(item => {

      let masked = '+7 (___) ___-__-__';
      const elem = item;
      
      function mask(event) {
        const keyCode = event.keyCode;
        const template = masked,
          def = template.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, "");
        console.log(template);
        let i = 0,
          newValue = template.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          newValue = newValue.slice(0, i);
        }
        let reg = template.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = newValue;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        }
      }
   
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    
  });
};

validation();

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
burgerMenu();


const togglePopUp = () => {
     
  const popUp = document.querySelectorAll('.popup');
        //popUp = document.getElementById('free_visit_form');
       
       
  popUp.forEach((popUpItem) => {
    //debugger;
    if ((popUpItem.id === 'callback_form') || (popUpItem.id === 'free_visit_form' )) {
      const popUpBtn = popUpItem.querySelector( '.btn' ); 
      console.log('popUpBtn: ', popUpBtn);


      const  popUpContent = popUpItem.querySelector('.form-content'),
        popUpForm = popUpItem.querySelector('form[name = "callback_form"');//[name ="${popUpItem.id}"]`);
        console.log('popUpItem: ', popUpItem);
        console.log('popUpForm: ', popUpForm);
      // кнопки запуска модальных окон

      
      let flyInterval,
        count = 0.01;
        popUpContent.style.opacity = 0;

      //фция открытия мод окна
        popUpBtn.addEventListener('click', () => {
          // проверка , если очистили форму и вызываем вторично, то показать все поля вновь
          console.log('popUpItem.dataset.hasOwnProperty (flagNone): ', popUpContent.dataset.hasOwnProperty ('flagNone'), popUpContent.dataset, popUpContent);
          if (popUpContent.dataset.hasOwnProperty ('flagNone')){
            popUpContent.querySelectorAll('*').forEach(item => {
              if (item.hasAttribute('display')){
                if (item.style.display === 'none') {
                  item.style.display = 'block';
                }
              }
            });

          }
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

      // закрытие мод окна по клику мимо него
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

togglePopUp();

const sendForm = () => {
  /* 
  
  <form action="" id="footer_form">
  
  <form name="banner-form" id="banner-form" action="#" method="post">
  
  <form action="" id="card_order">
  
  <form name="callback-form" id="form1" action="#" method="post">
  
  <form name="free-visit-form" id="form2" action="#" method="post">
  
  */
    const //popUp = document.querySelector('.popup'),
    //popUpContent = document.querySelector('.popup-content'),
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
    let flyAnimate = (popUpContent) => {
  
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
      console.log('item: ', item);
      const popUpContent = item.parentElement; 
      console.log('popUpContent: ', popUpContent);

      item.addEventListener('submit', (event) => {
        event.preventDefault();
        //debugger;
        let flag = 0;
        const formData =  new FormData(item);
        // debugger;
        formData.forEach((val, key) => {
          console.log('key: ', key);
          console.log('val: ', val);
          
          if ((val.trim() === '') && (key.indexOf('mess') === -1)) {
            flag = 1;
          }
          body[key] = val;
        });
        
        
  
        if (flag) return; // незаполненная часть формы -уходим
        item.appendChild(objMessage.div);
        // alert('postdata next');
        postData(body)
        .then((response) => {
          if (response.status !== 200){
            item.dataset.flagNone = 1;
              console.log('item.dataset: ', item.dataset);
              console.log('item: ', item);
            item.querySelectorAll('*').forEach(itemInp => {
              
              
              console.log('itemInp.TagName: ', itemInp.tagName);
              if (itemInp.tagName === 'INPUT'){
                itemInp.style.display = 'none';
              }else if(itemInp.tagName === 'P' || itemInp.tagName === 'BUTTON') {
                itemInp.style.display = 'none';
              }
            });
            
            
            throw new  Error('Status network not 200');
          }
          // обнуление
          item.querySelectorAll('input').forEach(item =>{
             if(item.type ==='text' || item.type ==='tel' ){
              item.value = '';
             } else if (item.type === 'checkbox'){
               item.checked = false;
             }
            });
          objMessage.div.textContent = objMessage.succesMessage;
        })
        .then(() => {
          if (item.style.display === 'block'){
            flyAnimate(popUpContent);
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

  sendForm();