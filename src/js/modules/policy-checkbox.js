const chainPolicyInputs = ( flag = false ) => {
  const policyElements = document.querySelectorAll( '[data-confirm]' );
  if ( policyElements < 1 ) return;
  policyElements.forEach( ( element, index ) => {
    const inputEl = element.querySelector( 'input' ),
      labelEl = element.querySelector( 'label' ),
      chain = `confirm-${index+1}`;
    inputEl.id = chain;
    labelEl.setAttribute( 'for', chain );
    flag ? inputEl.setAttribute( 'checked', true ) : inputEl.removeAttribute( 'checked' );
  } );
};

chainPolicyInputs( true );
