import {
  Options,
} from './options.js';

const initMap = ( options ) => {
  const contactsMapNode = document.querySelector( `#${options.ID}` );
  if ( !contactsMapNode ) return;

  ymaps.ready( initYmap );

  function initYmap() {
    const MAP = new ymaps.Map( contactsMapNode, {
      center: options.center,
      zoom: options.zoom,
    } );
    const ICON_OPTIONS = {
      iconLayout: 'default#image',
    };

    if ( options.customIcon ) {
      Object.assign( ICON_OPTIONS, options.customIconProperties );
    }

    const PLACEMARK = new ymaps.Placemark( options.center, {}, ICON_OPTIONS );
    MAP.controls.remove( 'geolocationControl' ); // удаляем геолокацию
    MAP.controls.remove( 'searchControl' ); // удаляем поиск
    MAP.controls.remove( 'trafficControl' ); // удаляем контроль трафика
    MAP.controls.remove( 'typeSelector' ); // удаляем тип
    MAP.controls.remove( 'fullscreenControl' ); // удаляем кнопку перехода в полноэкранный режим
    MAP.controls.remove( 'zoomControl' ); // удаляем контрол зуммирования
    MAP.controls.remove( 'rulerControl' ); // удаляем контрол правил
    MAP.geoObjects.add( PLACEMARK );
  }

};

initMap( Options.Map );
