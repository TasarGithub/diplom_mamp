const topArrow = () => {
  const totop = document.getElementById('totop'),
    clubs = document.getElementById('clubs');

  totop.style.opacity = 0;

  // topMenu = document.querySelector('.top-menu');
    
  const base = clubs.offsetTop;
   window.addEventListener('scroll', () => {
    if (window.pageYOffset >= base ) {
      totop.style.opacity = 1;
    } else {
      totop.style.opacity = 0;
    }
  });
};

export default topArrow;
