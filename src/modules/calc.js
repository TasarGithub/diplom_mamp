const calc = () => {

  const calcBlock = document.querySelector('#card_order'),
    calcTime = document.querySelector('.time'),
    cardType = document.querySelectorAll('input[name ="card-type"'),
    calcClub = document.querySelector('.club'),
    pricePromoStart = document.querySelector('.price-message').children[0],
    calcPriceTotal = document.getElementById('price-total'),
    club = document.querySelectorAll('input[name ="club-name"'),
    priceMozaika = {
     1: 1999,
     6: 9900,
     9: 13900,
     12: 19900,
     122: 9900
    },
    priceSchelkovo = {
      1: 1999,
      6: 9900,
      9: 21900,
      12: 24900,
      122: 14900
    };
    pricePromoStart.addEventListener('input',() => {
      //debugger;
      pricePromoStart.value = pricePromoStart.value.replace(/[^а-яё\d]/gi, '');
    });
  const countSum = () => {
 
    let total = 0,
     clubName = '',
      timeValue = 1,
       
      priceValue = 0,
      discount = 0;
    const promoValue = document.querySelector('.price-message').children[0].value;
     
//debugger;      
      club.forEach(item => {
        if (item.checked && item.id.indexOf('card_leto') >= 0){
          clubName = item.value;
        }
      });
      cardType.forEach(item => {
        if (item.checked){
          timeValue = item.value;
        }
      });
      priceValue = (clubName === 'mozaika')? priceMozaika[timeValue] : priceSchelkovo[timeValue];


    if (promoValue.toUpperCase() === 'ТЕЛО2019') {
        calcPriceTotal.textContent = Math.floor(priceValue*0.70);
      } else {
      calcPriceTotal.textContent = priceValue;
      } 

  };


  calcBlock.addEventListener('change', (event) => {
    //debugger;ddd
    const target = event.target;
    if (target.matches('input') && !target.matches('input[required]')) {
      countSum();
    }
  });

};

export default calc;