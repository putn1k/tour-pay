const initChildGuestCounter = () => {
  const itemTemplate = document.querySelector( '#add-child-template' );
  const adder = document.querySelector( '#add-child-guest' );
  const container = document.querySelector( '#children-guests' );
  if ( !container || !adder ) return;
  const children = container.children;

  const removeItemHanlder = ( item ) => {
    const remover = item.querySelector( '.child-item__remove' );
    remover.addEventListener( 'click', () => item.remove() );
  };

  const addItemHandler = ( evt ) => {
    evt.preventDefault();
    const newItem = itemTemplate
      .content
      .querySelector( '.child-item' )
      .cloneNode( true );
    container.appendChild( newItem );
    removeItemHanlder( newItem );
  };

  Array.from( children ).forEach( element => removeItemHanlder( element ) );
  adder.addEventListener( 'click', addItemHandler );
};

initChildGuestCounter();
