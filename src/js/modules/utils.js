const debounce = ( cb, delay ) => {
  let timer;

  return function( ...args ) {
    clearTimeout( timer );
    timer = setTimeout( () => {
      cb.apply( this, args );
    }, delay );
  };
};

const disableSubmitBtn = ( form ) => {
  form.querySelector( '[type="submit"]' ).setAttribute( 'disabled', 'disabled' );
};

const enableSubmitBtn = ( form ) => {
  form.querySelector( '[type="submit"]' ).removeAttribute( 'disabled' );
};

const isEscKey = ( evt ) => evt.key === 'Escape';

const getDatesDifference = ( start, end ) => {
  const startDate = new Date( start );
  const endDate = new Date( end );
  const DAYTIME = 1000 * 60 * 60 * 24;
  const timeDifference = endDate.getTime() - startDate.getTime();
  return Math.round( timeDifference / DAYTIME );
};

const declineWord = ( num, word ) => {
  const cases = [ 2, 0, 1, 1, 1, 2 ];
  return word[ ( num % 100 > 4 && num % 100 < 20 ) ? 2 : cases[ ( num % 10 < 5 ) ? num % 10 : 5 ] ];
};

const getKeyByValue = ( targetObject, value ) => Object.keys( targetObject ).find( key => targetObject[ key ] === value );

const initSlider = ( selector, options ) => {
  if ( !document.querySelector( selector ) ) return;
  const slider = new Swiper( document.querySelector( selector ), options );
  return slider;
};

const formatNumber = ( value, separator = '.' ) => {
  const locale = navigator.language;
  if ( value.indexOf( ',' ) != -1 ) {
    return new Intl.NumberFormat( locale ).format( value.replace( ',', '.' ) ).replace( ',', separator );
  } else {
    return new Intl.NumberFormat( locale ).format( value ).replace( ',', separator );
  }
};

export {
  debounce,
  disableSubmitBtn,
  enableSubmitBtn,
  isEscKey,
  getDatesDifference,
  declineWord,
  getKeyByValue,
  initSlider,
  formatNumber,
};
