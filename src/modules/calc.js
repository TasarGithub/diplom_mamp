const calc = () => {

  const calcBlock = document.getElementById('card_order'),
    calcTime = document.querySelector('.time'),
    cardType = document.querySelectorAll('input[name ="card-type"'),
    calcClub = document.querySelector('.club'),
    pricePromo = document.querySelector('.price'),
    calcPriceTotal = document.getElementById('price-total'),
    club = document.querySelectorAll('input[name ="clib-name"'),
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
      9: 13900,
      12: 19900,
      122: 9900
    };

  const countSum = () => {
 
    let total = 0,
     clubName = '',
      timeValue = 1,
      promoValue = '',
      priceValue = 0;
     

      club.forEach(item => {
        if (item.checked){
          clubName = item.value;
        }
      });
      cardType.forEach(item => {
        if (item.checked){
          timeValue = item.value;
        }
      });
      priceValue = (club === 'mozaika')? priceMozaika[timeValue] : priceSchelkovo[timeValue];


    if (!!promoValue){
      priceValue = 0;
    } else {
      priceValue = pricePromo;
    }

    cardType.forEach(item => {
      if (item.checked){
        timeValue = item.value;
      }
    });


  calcPriceTotal.value = priceValue;


  };


  calcBlock.addEventListener('change', (event) => {

    const target = event.target;
    if (target.matches('input') && !target.matches('input["requred"')) {
      countSum();
    }
  });

};

export default calc;