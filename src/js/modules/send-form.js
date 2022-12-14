// import {
//   Options,
// } from './options.js';

// import {
//   disableSubmitBtn,
//   enableSubmitBtn,
// } from './utils.js';

import {
  simpleModal,
} from './modal.js';

const sendForm = ( evt ) => {
  evt.preventDefault();
  simpleModal.open( '#send-ok-modal' );
  // const formData = new FormData( evt.target );
};

export {
  sendForm,
};
