'use strict';

// скрипты


const cleaningInput = (item) => {
  
  item.querySelectorAll('input').forEach(item =>{
    console.log('item.type: ', item.type);
    if(item.type ==='text' || item.type ==='tel' ){
      
     item.value = '';
    } else if (item.type === 'checkbox'){
      item.checked = false;
      console.log(' item.checked : ',  item.checked );
    }
   });
};
  
const noneElemeneForm = (item) => {
  item.dataset.flagNone = 1;
  item.querySelectorAll('*').forEach(itemInp => {
    if (itemInp.tagName === 'INPUT' || itemInp.tagName === 'P' || itemInp.tagName === 'BUTTON'){
      itemInp.style.display = 'none';
    // }else if(itemInp.tagName === 'P' || itemInp.tagName === 'BUTTON') {
    //   itemInp.style.display = 'none';
    }
  });
};

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
        //console.log(template);
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
          const formCheck = popUpItem.querySelector('input[type ="checkbox"]');
          //console.log('formCheck.style: ', formCheck.style);
          formCheck.style.display = 'block';
          formCheck.style.position = 'relative';
          formCheck.style.left = '70px';
          formCheck.style.bottom = '-15px';
          formCheck.style.opacity = 0;

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

togglePopUp();

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
          noneElemeneForm(item);
          cleaningInput(item);
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

  sendForm();