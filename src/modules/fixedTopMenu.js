const fixedTopMenu = () => {
  const topMenu = document.querySelector('.top-menu'),
  base = topMenu.offsetTop;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset >= base ) {
      topMenu.style.position = 'fixed';
    } else {
      topMenu.style.position = 'static';
    }
  });
};

export default fixedTopMenu;
