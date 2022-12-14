import {
  debounce,
} from './utils.js';

const fullheightInit = ( delay, offsetSelector ) => {
  const fullheightBlockNode = document.querySelector( '.fullheight-block' );
  if ( !fullheightBlockNode ) return;
  const changeHieght = () => {
    let vh = window.innerHeight * 0.01;
    const offsetNode = document.querySelector( offsetSelector );
    document.documentElement.style.setProperty( '--vh', `${vh}px` );
    if ( !offsetNode ) return;
    document.documentElement.style.setProperty( '--offset', `${offsetNode.offsetHeight}px` );
  };
  changeHieght();
  window.addEventListener( 'resize', debounce( changeHieght, delay ) );
};

fullheightInit( 1000, '.footer' );
