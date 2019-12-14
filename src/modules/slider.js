const slider = () => {

  const slider = document.querySelector('.main-slider'),

  slide = slider.querySelectorAll('.slide'),
  wrapSlider = slider.parentElement;
  console.log('wrapSlider: ', wrapSlider);

    console.log('slide: ', slide);
    
  let currentSlide = 0,
    interval = 0;

  // добавляем dots и dot

  // создание элемента ul
  const dotUl = document.createElement('ul');
  const dotUlWrap = document.createElement('ul');
  //вставляем ul элемент в верстку
 // wrapSlider.appendChild(dotUlWrap);
  slider.appendChild(dotUl);
  // одвеваем оформление на новый элемент
  dotUl.classList.add('slider-dots');
  //создаем li dot и вставляем в верстку по кол-ву слайдов 
  for (let i = 0; i < slide.length; i++) {
    const dotLi = document.createElement('li');
    dotUl.appendChild(dotLi);
    dotLi.classList.add('dot');
    //const dotLiButton = document.createElement('button');
    //dotLi.appendChild(dotLiButton);
    //dotLiButton.classList.add('dot-btn');
    if ( i === 0) {
      dotLi.classList.add('dot-active');
    }
  }
//debugger;
  const dot = document.querySelectorAll('.dot');
  
  const countSlide = (n,sld) => {
 
    if (n === sld.length) {
      return 0;
    } else if (n < 0) {
      return sld.length-1;
    } else {
      return n;
    }
  };
  console.log(slide.length);
 
  const prevSlide = (sld, dt, index, strClass) => {

    sld[index].style.display = 'none';
    dt[index].classList.remove(strClass);

  };
  
  const nextSlide = (sld, dt, index, strClass) => {
    sld[index].removeAttribute('style');
    dt[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, dot, currentSlide,'dot-active');
   
    currentSlide = countSlide(++currentSlide, slide);
    
    nextSlide(slide, dot, currentSlide,'dot-active');
  };

  const startSlide = (time = 3000)=> {
     interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();
    let target =  event.target;

    if (target.matches('.dot')){
      
      // убираем классы показа
      prevSlide(slide, dot, currentSlide,'dot-active');


      // ловим клики по точкам
      if (target.matches('.dot')){
        dot.forEach((elem, index) => {
          if (elem === target){
            currentSlide = index;
          }
        });
      }
      //восстанавливаем классы показа
      currentSlide = countSlide(currentSlide, slide); //проверка на выход за пределы
      nextSlide(slide, dot, currentSlide,'dot-active');
    }
  });
  slider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.dot')) {
      stopSlide();
    }
  });
  slider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.dot')) {
      startSlide(2000);
    }
  });

 startSlide(2000);

};


export default slider;