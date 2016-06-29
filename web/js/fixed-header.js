let header = null;
let nav = null;
let content = null;
let lastScrollPosition = 0;
let ticking = false;

function handleFixedHeader (scrollPos) {
  const navBounds = nav.getBoundingClientRect();
  const headerBounds = header.getBoundingClientRect();
  const contentBounds = content.getBoundingClientRect();

  if (scrollPos >= 48) {
    nav.style.position = 'fixed';
    nav.style.top = '0';
    content.style.paddingTop = '48px';
  }
  else if (scrollPos <= 48) {
    nav.style.position = 'static';
    nav.style.top = 'auto';
    content.style.paddingTop = '0';
  }
}

function setup () {
  header = document.getElementsByTagName('header')[0];
  nav = document.getElementsByTagName('nav')[0];
  content = document.querySelector('.content');

  window.addEventListener('scroll', function(e) {
    lastScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleFixedHeader(lastScrollPosition);
        ticking = false;
      });
    }

    ticking = true;
  });
}

export default setup;
