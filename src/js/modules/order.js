import {
  resultListNode,
} from './render-results.js';

const parsePreOrder = ( getOptions ) => {
  document.querySelector( '#booking-arrival-date' ).value = getOptions().startDate;
  document.querySelector( '#order-arrival' ).textContent = getOptions().startDate;
  document.querySelector( '#booking-departure-date' ).value = getOptions().endDate;
  document.querySelector( '#order-departure' ).textContent = getOptions().endDate;
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
      const currentGuest = currentItemNode.querySelector( '.search-room__guest' ).textContent;
      const currentChildren = currentItemNode.querySelector( '.search-room__children' ).textContent;

      document.querySelector( '#booking-hotel' ).value = currentTitle;
      document.querySelector( '#order-hotel' ).textContent = currentTitle;

      document.querySelector( '#booking-room' ).value = currentRoom;
      document.querySelector( '#order-cat' ).textContent = currentRoom;

      document.querySelector( '#booking-price' ).value = currentPrice;
      document.querySelector( '#order-price' ).textContent = currentPrice;

      document.querySelector( '#booking-feed' ).value = currentFeed;
      document.querySelector( '#order-feed' ).textContent = currentFeed;

      document.querySelector( '#booking-guests' ).value = currentGuest;
      document.querySelector( '#order-guests' ).textContent = currentGuest;

      document.querySelector( '#booking-children' ).value = currentChildren;
      document.querySelector( '#order-children' ).textContent = currentChildren;
    }
  } );
};

parseOrder();

export {
  parsePreOrder,
};
