const initHinterToggler = () => {
  const HINTER_HANDLERS = document.querySelectorAll( '[data-hinter-handler]' );
  const HINTER_LISTS = document.querySelectorAll( '[data-hinter-list]' );

  if ( HINTER_HANDLERS.length < 1 && HINTER_LISTS.length < 1 && HINTER_HANDLERS.length !== HINTER_LISTS.length ) return;

  document.addEventListener( 'click', ( evt ) => {
    if ( evt.target.closest( '[data-hinter-handler]' ) ) {
      evt.preventDefault();
      const target = evt.target.closest( '[data-hinter-handler]' );
      const flag = target.getAttribute( 'aria-expanded' ) === 'false';
      const list = document.querySelector( `[data-hinter-list="${target.dataset.hinterHandler}"` );
      target.setAttribute( 'aria-expanded', flag );
      list.setAttribute( 'aria-hidden', !flag );
    }
  } );

};

initHinterToggler();
