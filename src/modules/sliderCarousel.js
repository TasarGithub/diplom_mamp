const sliderCarousel = () => {

    const
      services = document.querySelector('#services'),
      main = services.querySelector('.wrapper'),
      wrap = document.querySelector('.services-slider'),
      slides = wrap.querySelectorAll('.slide'),

      slidesToShow = 5,
      options = {
        position: 0,
        infinity: false,
        widthSlide: Math.floor(100 / slidesToShow),
        maxPosition: slides.length - slidesToShow
      };
  //debugger;
        main.style.cssText = `overflow: hidden !important;`;
        wrap.style.cssText = `display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;`;
        for(const item of slides){
          item.style.cssText = `flex: 0 0 ${options.widthSlide}% !important;
          margin: auto 5px !important;`;
        }

        const prevDiv = document.createElement('div'),
        nextDiv = document.createElement('div'),
        prev = document.createElement('button'),
        next = document.createElement('button');

        main.appendChild(prevDiv);
        main.appendChild(nextDiv);
        
        prevDiv.className = 'slider-arrow';
        nextDiv.className = 'slider-arrow';

        prevDiv.appendChild(prev);
        nextDiv.appendChild(next);
        
        prev.className = 'slider-arrow span';
        next.className = 'slider-arrow span';

        prev.addEventListener('click', () => {
          if(options.infinity || options.position > 0) {
            --options.position;
            console.log(options.position);
            if(options.position < 0) {
                options.position = options.maxPosition;
              }
              wrap.style.transform = `translateX(-${options.position * options.widthSlide}%)`;
            }
        });
        next.addEventListener('click', () => {
          if(options.infinity || options.position < options.maxPosition) {
            ++options.position;
            console.log(options.position);
            if(options.position > options.maxPosition) {
              options.position = 0;
            }
              wrap.style.transform = `translateX(-${options.position * options.widthSlide}%)`;
            }
        });


};



export default sliderCarousel;
