import {
  Options,
} from './options.js';

const arrivalDP = new AirDatepicker( '#arrival-date', Options.Datepicker );
const departureDP = new AirDatepicker( '#departure-date', Options.Datepicker );

const formatDate = ( inputDP ) => inputDP.$el.value.split( '.' ).reverse().join( '-' );

export {
  arrivalDP,
  departureDP,
  formatDate,
};
