class Loader {
  constructor() {
    this.loader = document.getElementById( 'is-loader' );
    if ( !this.loader ) return;

    this.check();
  }

  check() {
    if ( document.querySelectorAll( '#is-loader' ).length > 1 ) return;
  }

  show() {
    this.loader.classList.add( 'loader--show' );
    document.documentElement.classList.add( 'is-loading' );
  }

  hide() {
    this.loader.classList.remove( 'loader--show' );
    document.documentElement.classList.remove( 'is-loading' );
  }
}

export const loader = new Loader();
