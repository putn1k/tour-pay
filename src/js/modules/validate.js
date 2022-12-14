import {
  Options,
} from './options.js';

import {
  arrivalDP,
  departureDP,
} from './datepicker.js';

import {
  getDatesDifference,
} from './utils.js';

import {
  sendData,
} from './send-data.js';

new justPhoneMask( {
  bodyMask: ' (___) ___ __ __',
} );

const DATE_REGEXP = /[0-9]{2}.[0-9]{2}.[0-9]{4}$/;

const validateForms = () => {
  const forms = document.querySelectorAll( 'form[data-validate]' );
  if ( forms.length < 1 ) return;
  forms.forEach( ( form ) => {
    const formID = `#${form.id}`;
    const validationRules = new JustValidate( formID, Options.ValidationErrors );
    const requiredFields = document.querySelectorAll( `${formID} [required]` );

    if ( requiredFields.length < 1 ) return;

    requiredFields.forEach( ( input ) => {
      switch ( input.dataset.validate ) {
        case 'text':
          validationRules.addField( `${formID} [data-validate="text"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Поле обязательно для заполнения'
          }, ] );
          break;
        case 'phone':
          validationRules.addField( `${formID} [data-validate="phone"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'minLength',
              value: document.querySelector( `${formID} [data-validate="phone"]` ).dataset.mask.length,
              errorMessage: 'Введите телефон в формате +7 (---) --- -- --',
            },
          ] );
          break;
        case 'email':
          validationRules.addField( `${formID} [data-validate="email"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения'
            },
            {
              rule: 'email',
              errorMessage: 'Некорректный адрес электронной почты',
            },
          ] );
          break;
        case 'message':
          validationRules.addField( `${formID} [data-validate="message"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'minLength',
              value: 10,
              errorMessage: 'Слишком короткое сообщение',
            },
            {
              rule: 'maxLength',
              value: 200,
              errorMessage: 'Длина сообщения превышает 200 символов',
            },
          ] );
          break;
        case 'date-arr':
          validationRules.addField( `${formID} [data-validate="date-arr"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'customRegexp',
              value: DATE_REGEXP,
              errorMessage: 'Дата в формате ДД.ММ.ГГГГ',
            },
            {
              rule: 'function',
              validator: function() {
                const currentDate = new Date().toDateString();
                return getDatesDifference( currentDate, arrivalDP.selectedDates[ 0 ] ) >= 0;
              },
              errorMessage: 'Дата заезда не верна',
            },
          ] );
          break;
        case 'date-dep':
          validationRules.addField( `${formID} [data-validate="date-dep"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'customRegexp',
              value: DATE_REGEXP,
              errorMessage: 'Дата в формате ДД.ММ.ГГГГ',
            },
            {
              rule: 'function',
              validator: function() {
                return getDatesDifference( arrivalDP.selectedDates[ 0 ], departureDP.selectedDates[ 0 ] ) > 0;
              },
              errorMessage: 'Дата выезда не верна',
            },
          ] );
          break;
        case 'confirm':
          validationRules.addField( `${formID} [data-validate="confirm"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите согласие с политикой конфидециальности',
          }, ] );
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      sendData( evt );
    } );
  } );
};

validateForms();
