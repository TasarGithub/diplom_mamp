      
      const bugFixFocusForm = (form) => {
        // обходим ошибку фокусировки на невидимом чекбоксе при открытии формы ,
        // при условии requared на чекбоксе
        const formCheck = form.querySelector('input[type ="checkbox"]');
        //console.log('formCheck.style: ', formCheck.style);
        formCheck.style.display = 'block';
        formCheck.style.position = 'relative';
        formCheck.style.left = '70px';
        formCheck.style.bottom = '-15px';
        formCheck.style.opacity = 0;
      };
      export default bugFixFocusForm;