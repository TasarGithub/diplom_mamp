const toggleHeadClubSelect = () => {
  

  const body = document.querySelector('body'),
    clubsList = document.querySelector('.clubs-list'),
    ulClubSelect = document.querySelector('ul');


   // закрытие мод окна по клику мимо него и по ссылкам меню
   body.addEventListener('click', (event) => {
    let target = event.target;

    if (target.parentElement === clubsList ) {
      ulClubSelect.style.display = 'block';
    } else {
        ulClubSelect.style.display = 'none';
    }
  });
  
};


export default toggleHeadClubSelect;