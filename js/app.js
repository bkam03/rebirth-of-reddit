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

      var image = createPostContent( 'img', 'thumbnail' );
      image.src = onePost.thumbnail;
      postThumbnail.appendChild( image );

      var title = createPostContent( 'p', 'title' );
      title.innerHTML = onePost.title;
      postThumbnail.appendChild( title );

      var metaData = document.createElement( 'div' );
      metaData.className = 'metaData';
      var dateCreated = new Date( onePost.created * 1000 );
      var dateNow = new Date();
      var difference = convertUnixTimeStamp( dateNow - dateCreated );
      metaData.innerHTML = "by " + onePost.author + " @ " + " Posted " +difference + " @ " + onePost.viewcount;
      console.log('timecalc', dateCreated, '\n', dateNow, '\n', difference);

      var summary = createPostContent( 'p', 'summary' );
      summary.innerHTML = onePost.selftext;
      postThumbnail.appendChild( summary );

      postThumbnail.appendChild( metaData );

      var targetGrid = document.getElementById( 'grid' );
      targetGrid.appendChild( postThumbnail );
    }
  });
  newRequest.open( 'GET', 'https://www.reddit.com/r/NatureIsFuckingLit.json' );
  newRequest.send();

  var targetGrid = document.getElementById( 'grid' );
  targetGrid.appendChild( createContentContainer );
}

function createPostContent ( elementType, className ){
  var newElement = document.createElement( elementType );
  newElement.className = className;
  return newElement;
}

function convertUnixTimeStamp ( timeStamp ){
  var yearInSeconds = 31557600;
  var monthInSeconds = 2392000;
  var weekInSeconds = 604800;
  var dayInSeconds = 86400;
  var hourInSeconds = 3600;
  var minuteInSeconds = 60;

  var timeElapsed = 0;

  if( timeStamp / yearInSeconds >= 1 ){
    timeElapsed = timeStamp / yearInSeconds + ' years ago';
  } else if( timeStamp / monthInSeconds >= 1 ){
    timeElapsed = timeStamp / monthInSeconds + ' months ago';
  } else if( timeStamp / weekInSeconds >= 1 ){
    timeElapsed = timeStamp / weekInSeconds + ' weeks ago';
  } else if( timeStamp / dayInSeconds >= 1 ){
    timeElapsed = timeStamp / dayInSeconds + ' days ago';
  } else if( timeStamp / hourInSeconds >= 1 ){
    timeElapsed = timeStamp / hourInSeconds + ' hours ago';
  } else {
    timeElapsed = timeStamp / minuteInSeconds + ' minutes ago';
  }

  return timeElapsed;
}

var menuItemArray = document.getElementsByClassName( 'menuItem' );
menuItemArray[1].addEventListener( 'click', generateContent );

