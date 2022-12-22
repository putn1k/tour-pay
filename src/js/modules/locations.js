const initCheckAllLocation = () => {
  const checkAllBtnNode = document.querySelector( '.checkall-btn' );
  const locationListNode = document.querySelector( '.location__list' );

  if ( !checkAllBtnNode || !locationListNode ) return;

  const inputsNodes = locationListNode.querySelectorAll( '[data-hotel-id]' );
  const checkedInputsNodes = locationListNode.querySelectorAll( '[data-hotel-id][checked]' );

  ( inputsNodes.length === checkedInputsNodes.length ) ? checkAllBtnNode.classList.add( 'checkall-btn--toggled' ): checkAllBtnNode.classList.remove( 'checkall-btn--toggled' );

  checkAllBtnNode.addEventListener( 'click', ( evt ) => {
    evt.preventDefault();
    if ( checkAllBtnNode.classList.contains( 'checkall-btn--toggled' ) ) {
      inputsNodes.forEach( input => {
        input.checked = false;
      } );
      checkAllBtnNode.classList.remove( 'checkall-btn--toggled' );
    } else {
      inputsNodes.forEach( input => {
        input.checked = true;
      } );
      checkAllBtnNode.classList.add( 'checkall-btn--toggled' );
    }
  } );

  locationListNode.addEventListener( 'change', () => {
    ( Array.from( inputsNodes ).every( input => input.checked === true ) ) ? checkAllBtnNode.classList.add( 'checkall-btn--toggled' ): checkAllBtnNode.classList.remove( 'checkall-btn--toggled' );
  } );
};

initCheckAllLocation();
