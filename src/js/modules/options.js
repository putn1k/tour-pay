export const Options = {
  SmoothScroll: {
    speed: 900,
    speedAsDuration: true,
    updateURL: false,
  },
  Modal: {
    linkAttributeName: false,
    catchFocus: true,
    closeOnEsc: true,
    backscroll: true,
    afterClose: ( modal ) => {
      if ( modal && modal._modalBlock.hasAttribute( 'data-search-options' ) ) {
        const list = document.querySelectorAll( '.location__list [type="checkbox"]' );
        if ( list.length < 1 ) return;
        const checkedList = document.querySelectorAll( '.location__list [type="checkbox"]:checked' );
        if ( checkedList.length === 0 ) {
          list.forEach( item => {
            item.checked = true;
          } );
        }
      }
    },
  },
  ValidationErrors: {
    errorFieldCssClass: 'invalid',
    errorLabelStyle: {
      color: '#e30613',
      marginTop: '6px',
      fontSize: '12px',
      textAlign: 'left',
    },
  },
  ObserveScrollTop: {
    rootMargin: '600px',
    threshold: 1,
  },
  Request: {
    HandlerURL: 'https://jsonplaceholder.typicode.com/posts',
    MethodGet: 'GET',
    MethodPost: 'POST',
    API_URL: 'https://stage.svoy-hotel.ru/api/distribution/1.0/search',
  },
  Datepicker: {
    autoClose: true,
  },
  MyHotelsFiles: {
    'courtyard-marriott': 169,
    'gorky-540': 372,
    'gorky-960': 5888,
    'marriott': 168,
    'novotel-resort': 373,
    'rixos': 154
  },
  Map: {
    ID: 'contacts-map',
    center: [ 43.683799, 40.256822 ],
    zoom: 16,
    customIcon: true,
    customIconProperties: {
      iconImageHref: `${window.location.protocol}//${window.location.host}/img/icon-placemark.svg`,
      iconImageSize: [ 40, 40 ],
      iconImageOffset: [ -20, -40 ]
    },
  },
  Slider: {
    Room: {
      slidesPerView: 1,
      spaceBetween: 0,
      preloadImages: false,
      loop: false,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      lazy: true,
      navigation: {
        nextEl: '.room-images__next',
        prevEl: '.room-images__prev',
      },
    },
    RoomThumbs: {
      slidesPerView: 3,
      spaceBetween: 8,
      preloadImages: false,
      lazy: true,
      watchSlidesProgress: true,
      breakpoints: {
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 3,
        },
      },
    },
  },
};
