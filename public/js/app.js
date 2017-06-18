function generateContent (){
  var createContentContainer = document.createElement( 'div' );
  createContentContainer.className = 'contentContainer';

  //requests posts from reddit
  var newRequest = new XMLHttpRequest();
  newRequest.addEventListener( 'load', function (){
    var response = JSON.parse( this.responseText );
    var arrayOfPosts = response.data .children;

    for( var i = 0; i < arrayOfPosts.length; i++ ){
      var onePost = arrayOfPosts[i].data;

      var postThumbnail = document.createElement( 'div' );
      postThumbnail.className = 'post';
      postThumbnail.addEventListener( 'click', goToPost.bind( onePost ) );

      var postImage = createPostContent( 'img', 'thumbnail' );
      postImage.src = onePost.thumbnail;
      postThumbnail.appendChild( postImage );

      var postTitle = createPostContent( 'p', 'title' );
      postTitle.innerHTML = limitTextLength( onePost.title, 8 );
      postThumbnail.appendChild( postTitle );

      var postMetaData = document.createElement( 'p' );
      postMetaData.className = 'metaData';
      var dateCreated = onePost.created;
/*      var dateCreated = new Date( onePost.created * 1000 );
*/      var timePassed = timeAgoFromEpochTime( dateCreated );
      //console.log( convertUnixTimeStamp( dateNow.getTime() - dateCreated.getTime() ) );
      //console.log( dateNow.getTime() );
      //var difference = convertUnixTimeStamp( dateNow - dateCreated );
      postMetaData.innerHTML = "by " + validateAuthor( onePost.author ) +
        " @ " + " Posted " + timePassed +
        " @ " + validateViewCount( onePost.viewcount );
      postThumbnail.appendChild( postMetaData );

      var postSummary = createPostContent( 'p', 'summary' );
      postSummary.innerHTML = limitTextLength( onePost.selftext, 20 );
      postThumbnail.appendChild( postSummary );


      var targetGrid = document.getElementById( 'grid' );
      targetGrid.appendChild( postThumbnail );
    }
  });
  newRequest.open( 'GET', this.dataset.url );
//  newRequest.open( 'GET', 'https://www.reddit.com/r/NatureIsFuckingLit.json' );
  newRequest.send();

  var targetGrid = document.getElementById( 'grid' );
  targetGrid.appendChild( createContentContainer );
}

function createPostContent ( elementType, className ){
  var newElement = document.createElement( elementType );
  newElement.className = className;
  return newElement;
}

function goToPost (){
  window.open( this.url );
}

function validateAuthor ( authorSource ){
  var authorName = 'unknown';
  if( authorSource !== null && authorSource !== undefined ){
    authorName = authorSource;
  }
  return authorSource;
}

function validateViewCount( viewSource ){
  var viewCount = 'n/a';
  if( viewSource !== null && viewSource !== undefined ){
    console.log( viewSource );
    viewCount = viewSource;
  }
  return viewCount;
}

function limitTextLength( text, wordLength ){
  var wordArray = text.split(' ');
  var continuing = '';
  if( wordArray.length > wordLength ){
    continuing = '...';
  }
  wordArray.length = wordLength;
  return wordArray.join(' ') + continuing;
}

function timeAgoFromEpochTime(epoch) {
  var secs = ((new Date()).getTime() / 1000) - epoch;
  Math.floor(secs);
  var minutes = secs / 60;
  secs = Math.floor(secs % 60);
  if (minutes < 1) {
   return secs + (secs > 1 ? ' seconds ago' : ' second ago');
  }
  var hours = minutes / 60;
  minutes = Math.floor(minutes % 60);
  if (hours < 1) {
   return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
  }
  var days = hours / 24;
  hours = Math.floor(hours % 24);
  if (days < 1) {
   return hours + (hours > 1 ? ' hours ago' : ' hour ago');
  }
  var weeks = days / 7;
  days = Math.floor(days % 7);
  if (weeks < 1) {
   return days + (days > 1 ? ' days ago' : ' day ago');
  }
  var months = weeks / 4.35;
  weeks = Math.floor(weeks % 4.35);
  if (months < 1) {
   return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
  }
  var years = months / 12;
  months = Math.floor(months % 12);
  if (years < 1) {
   return months + (months > 1 ? ' months ago' : ' month ago');
  }
  years = Math.floor(years);
  return years + (years > 1 ? ' years ago' : ' years ago');
}

( function (){
  var urlArray = [
    '',
    'https://www.reddit.com/r/NatureIsFuckingLit.json',
    'http://www.reddit.com/r/random.json'
  ];

  var menuButtons = document.querySelectorAll( '.menuItem' );
  console.log( menuButtons );
  for( var i = 0; i < menuButtons.length; i++ ){
    menuButtons[i].dataset.url = urlArray[i];
  }

  var menuItemArray = document.getElementsByClassName( 'menuItem' );

  for( var menuCount = 0; menuCount < menuItemArray.length; menuCount++ ){
    menuItemArray[ menuCount ].addEventListener( 'click', generateContent );

  }


} )();


