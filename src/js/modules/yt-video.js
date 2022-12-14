const findVideos = () => {
  const VIDEOS = document.querySelectorAll( '.yt-video' );

  for ( let i = 0; i < VIDEOS.length; i++ ) {
    setupVideo( VIDEOS[ i ] );
  }
};

const setupVideo = ( video ) => {
  const linkNode = video.querySelector( '.yt-video__link' );
  const mediaNode = video.querySelector( '.yt-video__media' );
  const btnNode = video.querySelector( '.yt-video__button' );
  const ID = parseMediaURL( mediaNode );

  video.addEventListener( 'click', () => {
    const iframeElem = createIframe( ID );

    linkNode.remove();
    btnNode.remove();
    video.appendChild( iframeElem );
  } );

  linkNode.removeAttribute( 'href' );
  video.classList.add( 'yt-video--enabled' );
};

const parseMediaURL = ( element ) => {
  const URL_REGEXP = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  const MEDIA_URL = element.src;
  return MEDIA_URL.match( URL_REGEXP )[ 1 ];
};

const createIframe = ( id ) => {
  const IFRAME_ELEM = document.createElement( 'iframe' );

  IFRAME_ELEM.setAttribute( 'allowfullscreen', '' );
  IFRAME_ELEM.setAttribute( 'allow', 'autoplay' );
  IFRAME_ELEM.setAttribute( 'src', generateURL( id ) );
  IFRAME_ELEM.classList.add( 'yt-video__media' );

  return IFRAME_ELEM;
};

const generateURL = ( id ) => `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1`;

findVideos();
