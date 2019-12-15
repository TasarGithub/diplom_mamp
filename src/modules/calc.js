import bugFixFocusForm from './bugFixFocusForm';

const calc = () => {

  const calcForm = document.querySelector('#card_order'),
  
    cardType = document.querySelectorAll('input[name ="card-type"'),
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
      1: 2999,
      6: 14900,
      9: 21900,
      12: 24900,
      122: 14900
    };
    
    console.log('calcForm: ', calcForm);
    pricePromoStart.addEventListener('input',() => {
      
      pricePromoStart.value = pricePromoStart.value.replace(/[^а-яё\d]/gi, '');
    });
  const countSum = () => {
 
    let clubName = '',
     timeValue = 1,
     priceValue = 0;
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

  bugFixFocusForm(calcForm.querySelector('input[type ="checkbox"]'));

  calcForm.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('input') && !target.matches('input[required]')) {
      countSum();
    }
  });

};


export default calc;