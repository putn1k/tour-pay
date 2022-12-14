import {
  formatNumber,
} from './utils.js';

const resultListNode = document.querySelector( '#search-result-list' );
const resultItemTemplate = document.querySelector( '#search-variant-template' );
const roomsFragment = document.createDocumentFragment();
const FEED_TYPES = {
  1: 'Питание не входит в стоимость',
  2: 'Завтрак',
  3: 'Полупансион',
  4: 'Полный пансион',
  5: 'Все включено',
  6: 'Ультра все включено',
};

const renderResults = ( results, getOptions, hotels, flag, tariffs ) => {
  results.forEach( ( item ) => {
    const hotelID = item[ 0 ].hotelId;
    const hotelTarifID = item[ 0 ].tariffId;
    const roomID = item[ 0 ].roomId;
    const roomNode = resultItemTemplate
      .content
      .querySelector( '.search-room' )
      .cloneNode( true );
    roomNode.querySelector( '.search-room__arrival' ).textContent = getOptions().startDate;
    roomNode.querySelector( '.search-room__departure' ).textContent = getOptions().endDate;
    roomNode.querySelector( '.search-room__price-value' ).textContent = formatNumber( `${item[ 0 ].prices.total.prices.RUB}` );

    hotels.find( hotel => {
      if ( hotel.id === hotelID ) {
        roomNode.querySelector( '.search-room__hotel' ).textContent = hotel.name.ru;

        flag ?
          roomNode.querySelector( '.search-room__hotel' ).classList.remove( 'visually-hidden' ) :
          roomNode.querySelector( '.search-room__hotel' ).classList.add( 'visually-hidden' );

        hotel.rooms.find( elem => {
          if ( elem.id === roomID ) {
            roomNode.querySelector( '.search-room__cat' ).textContent = elem.name.ru;
          }
        } );
      }
    } );

    tariffs.find( tariff => {
      if ( tariff.id === hotelTarifID ) {
        roomNode.querySelector( '.search-room__feed' ).textContent = FEED_TYPES[ tariff.feedTypeId ];
      }
    } );

    roomsFragment.appendChild( roomNode );
  } );
  resultListNode.appendChild( roomsFragment );
};

export {
  resultListNode,
  renderResults,
};
