import {
  isEscKey,
} from './utils.js';

const siteHeaderNode = document.querySelector( '.header' );
const mobileMenuNode = document.querySelector( '.mobile-menu' );
const MENU_ID = 'mobile-menu';
const BURGER_OPTIONS = {
  animationSpeed: 300,
  menuId: MENU_ID,
  isOpen: openMobileMenu,
  isClose: closeMobileMenu,
};
const siteBurger = new justBurger( BURGER_OPTIONS );

const addCompensativeYOffset = ( element, conditionClass ) => {
  if ( element.classList.contains( conditionClass ) ) return;
  element.nextElementSibling.style.marginTop = `${element.clientHeight}px`;
};

const removeCompensativeYOffset = ( element, conditionClass ) => {
  if ( element.classList.contains( conditionClass ) ) return;
  element.nextElementSibling.style.marginTop = '';
};

function openMobileMenu() {
  if ( !mobileMenuNode ) return;
  document.documentElement.classList.add( 'is-open-menu' );
  siteHeaderNode.classList.add( 'header--is-open-menu' );
  addCompensativeYOffset( siteHeaderNode, 'header--abs' );
  let isShow = mobileMenuNode.getAttribute( 'aria-hidden' ) === 'true';
  mobileMenuNode.setAttribute( 'aria-hidden', !isShow );
}

function closeMobileMenu() {
  if ( !mobileMenuNode ) return;
  document.documentElement.classList.remove( 'is-open-menu' );
  siteHeaderNode.classList.remove( 'header--is-open-menu' );
  removeCompensativeYOffset( siteHeaderNode, 'header--abs' );
  let isShow = mobileMenuNode.getAttribute( 'aria-hidden' ) === 'true';
  mobileMenuNode.setAttribute( 'aria-hidden', !isShow );
}

const initMobileMenu = () => {
  if ( !mobileMenuNode ) return;
  mobileMenuNode.id = MENU_ID;
  document.addEventListener( 'keydown', ( evt ) => {
    if ( isEscKey( evt ) && mobileMenuNode.getAttribute( 'aria-hidden' ) === 'false' ) {
      siteBurger.close();
    }
  } );
};

const observeSiteHeader = () => {
  const topNode = document.querySelector( '#site-top' );

  if ( !siteHeaderNode ) return;
  const OBSERVE_OPTIONS = {
    rootMargin: `${siteHeaderNode.clientHeight}px`,
    threshold: 0
  };

  const cb = ( entries ) => {
    entries.forEach( entry => {
      if ( !entry.isIntersecting ) {
        siteHeaderNode.classList.add( 'header--sticked', 'anim-small-drop' );
        addCompensativeYOffset( siteHeaderNode, 'header--abs' );
      } else {
        siteHeaderNode.classList.remove( 'header--sticked', 'anim-small-drop' );
        removeCompensativeYOffset( siteHeaderNode, 'header--abs' );
      }
    } );
  };
  new IntersectionObserver( cb, OBSERVE_OPTIONS ).observe( topNode );
};

observeSiteHeader();
initMobileMenu();
