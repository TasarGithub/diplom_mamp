 function bugFixFocusForm () {
  //debugger;
  // обходим ошибку фокусировки на невидимом чекбоксе при открытии формы ,
  // при условии requared на чекбоксе

  const formCheck = document.querySelectorAll('input[type ="checkbox"][required]');
  console.log('bugFixFocus formCheck: ', formCheck);
  //console.log('formCheck.style: ', formCheck.style);
  formCheck.forEach((item) => {
    item.style.display = 'block';
    item.style.position = 'relative';
    item.style.left = '70px';
    item.style.bottom = '-15px';
    item.style.opacity = 0;
  });
  
}
export default bugFixFocusForm;