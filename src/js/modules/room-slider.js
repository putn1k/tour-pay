import {
  initSlider,
} from './utils.js';

import {
  Options,
} from './options.js';

initSlider( '.room-images__slider', Object.assign( Options.Slider.Room, {
  thumbs: {
    swiper: initSlider( '.room-images__thumbs', Options.Slider.RoomThumbs ),
  },
} ) );
