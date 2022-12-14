import {
  resultListNode,
} from './render-results.js';

const parsePreOrder = ( getOptions ) => {
  document.querySelector( '#booking-arrival-date' ).value = getOptions().startDate;
  document.querySelector( '#order-arrival' ).textContent = getOptions().startDate;
  document.querySelector( '#booking-departure-date' ).value = getOptions().endDate;
  document.querySelector( '#order-departure' ).textContent = getOptions().endDate;
  document.querySelector( '#booking-guests' ).value = getOptions().adults;
  document.querySelector( '#order-guests' ).textContent = getOptions().adults;
  if ( getOptions().children > 0 ) {
    document.querySelector( '#booking-children' ).value = getOptions().children;
    document.querySelector( '#order-children' ).textContent = getOptions().children;
  } else {
    document.querySelector( '#booking-children' ).value = 'Без детей';
    document.querySelector( '#order-children' ).textContent = 'Без детей';
  }
};

const parseOrder = () => {
  if ( !resultListNode ) return;
  resultListNode.addEventListener( 'click', ( evt ) => {
    if ( evt.target.classList.contains( 'search-room__btn' ) ) {
      const currentItemNode = evt.target.closest( '.search-room' );
      const currentTitle = currentItemNode.querySelector( '.search-room__hotel' ).textContent;
      const currentRoom = currentItemNode.querySelector( '.search-room__cat' ).textContent;
      const currentPrice = currentItemNode.querySelector( '.search-room__price-value' ).textContent;
      const currentFeed = currentItemNode.querySelector( '.search-room__feed' ).textContent;
      document.querySelector( '#booking-hotel' ).value = currentTitle;
      document.querySelector( '#order-hotel' ).textContent = currentTitle;
      document.querySelector( '#booking-room' ).value = currentRoom;
      document.querySelector( '#order-cat' ).textContent = currentRoom;
      document.querySelector( '#booking-price' ).value = currentPrice;
      document.querySelector( '#order-price' ).textContent = currentPrice;
      document.querySelector( '#booking-feed' ).value = currentFeed;
      document.querySelector( '#order-feed' ).textContent = currentFeed;
    }
  } );
};

parseOrder();

export {
  parsePreOrder,
};
