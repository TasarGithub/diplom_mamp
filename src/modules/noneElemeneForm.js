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

export default noneElemeneForm;