import {
  Options,
} from './options.js';

import {
  AuthData,
} from './auth.js';

import {
  disableSubmitBtn,
  enableSubmitBtn,
  declineWord,
  getKeyByValue,
} from './utils.js';

import {
  formatDate,
  arrivalDP,
  departureDP,
} from './datepicker.js';

import {
  parsePreOrder,
} from './order.js';

import {
  loader,
} from './loader.js';

import {
  simpleModal,
} from './modal.js';

import {
  renderResults,
} from './render-results.js';

const scrollToElement = new SmoothScroll();
const DECLINED_RESULT_WORDS = [ 'результат', 'результата', 'результатов' ];

const getLocations = () => {
  const locationsArr = [];
  const list = document.querySelectorAll( '[data-hotel-id]' );
  list.forEach( item => {
    if ( item.type === 'checkbox' ) {
      item.checked ? locationsArr.push( parseInt( item.value, 10 ) ) : '';
    } else {
      locationsArr.push( parseInt( item.value, 10 ) );
    }
  } );
  return locationsArr;
};

const getRequstOptions = () => ( {
  startDate: arrivalDP.$el.value,
  endDate: departureDP.$el.value,
  adults: parseInt( document.querySelector( '#count-adult-guest' ).value, 10 ),
  children: document.querySelectorAll( '[data-child]' ).length
} );

const requestHotelData = ( filename ) => {
  return fetch( filename )
    .then( response => {
      if ( response.ok ) {
        return response.json();
      }
    } );
};

const requestSearchData = ( url, method, body ) => {
  return fetch( url, {
      method: method,
      body: JSON.stringify( body ),
      headers: {
        'content-type': 'application/json'
      }
    } )
    .then( response => {
      if ( response.ok ) {
        return response.json();
      }
    } );
};

const addChildrenInRequest = ( requestObject ) => {
  const CHILDREN_LIST = document.querySelectorAll( '[data-child]' );
  if ( !CHILDREN_LIST.length > 0 ) return;
  requestObject.data.accommodation[ 0 ].children = Array.from( CHILDREN_LIST ).map( item => parseInt( item.value, 10 ) );
};

const parseSearchData = ( searchData, hotelData ) => {
  const resultBlockNode = document.querySelector( '#search-result' );
  const resultTitleNode = resultBlockNode.querySelector( '.search-result__title' );
  const resultTextNode = resultBlockNode.querySelector( '.search-result__text' );
  const resultListNode = resultBlockNode.querySelector( '#search-result-list' );
  const RESULTS = [];
  let resultCounter = 0;

  resultBlockNode.classList.remove( 'is-hidden' );
  resultListNode.classList.remove( 'is-hidden' );
  resultListNode.innerHTML = '';

  if ( searchData.data.hotels.length > 0 ) {
    searchData.data.hotels.forEach( hotel => {
      renderResults( hotel.results, getRequstOptions, hotelData, ( getLocations().length > 1 ), hotel.tariffs );
      resultCounter += hotel.results.length;
      RESULTS.push( ...hotel.results );
    } );
    resultTitleNode.textContent = `Найдено ${resultCounter} ${declineWord(resultCounter,DECLINED_RESULT_WORDS)}`;
    resultTextNode.textContent = 'Выберите подходящий для Вас вариант размещения:';
    parsePreOrder( getRequstOptions );
  } else {
    resultTitleNode.textContent = 'К сожалению мы не нашли варианты размещения под Ваш запрос';
    resultTextNode.textContent = 'Попробуйте изменить параметры запроса';
    resultListNode.classList.add( 'is-hidden' );
  }

  scrollToElement.animateScroll( resultBlockNode, 1, Options.SmoothScroll );
};

const searchVariants = ( evt ) => {
  evt.preventDefault();
  disableSubmitBtn( evt.target );
  loader.show();
  const HOTEL_DATAFILES = [];
  const LOCATIONS = getLocations();
  LOCATIONS.forEach( item => {
    HOTEL_DATAFILES.push( `${getKeyByValue( Options.MyHotelsFiles, item )}-data.json` );
  } );

  Promise.all( HOTEL_DATAFILES.map( hotel => requestHotelData( hotel ) ) )
    .then( ( HOTELS_DATA_ARRAY ) => {
      const requestBodyTemplate = {
        authorization: {
          login: AuthData.Login,
          password: AuthData.Password
        },
        data: {
          location: {
            id: LOCATIONS,
            type: 'hotel'
          },
          startDate: formatDate( arrivalDP ),
          endDate: formatDate( departureDP ),
          contractId: AuthData.ContractId,
          returnOnRequest: false,
          accommodation: [ {
            adults: parseInt( evt.target.querySelector( '#count-adult-guest' ).value, 10 )
          } ]
        },
      };
      addChildrenInRequest( requestBodyTemplate );
      requestSearchData( Options.Request.API_URL, Options.Request.MethodPost, requestBodyTemplate )
        .then( data => {
          parseSearchData( data, HOTELS_DATA_ARRAY );
        } )
        .catch( () => {
          simpleModal.open( '#send-error-modal' );
        } )
        .finally( () => {
          enableSubmitBtn( evt.target );
          loader.hide();
        } );
    } );
};

export {
  searchVariants,
};
