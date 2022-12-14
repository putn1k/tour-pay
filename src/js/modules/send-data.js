import {
  searchVariants,
} from './search-results.js';

import {
  sendForm,
} from './send-form.js';

import {
  disableSubmitBtn,
} from './utils.js';

export const sendData = ( evt ) => {
  disableSubmitBtn( evt.target );
  switch ( evt.target.id ) {
    case 'calc-form':
      searchVariants( evt );
      break;

    default:
      sendForm( evt );
      break;
  }
};
