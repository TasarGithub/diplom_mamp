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

export default cleaningInput;