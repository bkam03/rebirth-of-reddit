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
      postTitle.innerHTML = onePost.title;
      postThumbnail.appendChild( postTitle );

      var postMetaData = document.createElement( 'p' );
      postMetaData.className = 'metaData';
      var dateCreated = new Date( onePost.created * 1000 );
      var dateNow = new Date();
      //console.log( convertUnixTimeStamp( dateNow.getTime() - dateCreated.getTime() ) );
      //console.log( dateNow.getTime() );
      //var difference = convertUnixTimeStamp( dateNow - dateCreated );
      postMetaData.innerHTML = "by " + onePost.author + " @ " + " Posted " +dateCreated + " @ " + onePost.viewcount;
      postThumbnail.appendChild( postMetaData );

      var postSummary = createPostContent( 'p', 'summary' );
      postSummary.innerHTML = onePost.selftext;
      postThumbnail.appendChild( postSummary );


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

function goToPost (){
  window.open( this.url );
}

/*function convertUnixTimeStamp ( timeStamp ){
  var yearInSeconds = 3155760000;
  var monthInSeconds = 239200000;
  var weekInSeconds = 60480000;
  var dayInSeconds = 8640000;
  var hourInSeconds = 360000;
  var minuteInSeconds = 6000;

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
}*/

var menuItemArray = document.getElementsByClassName( 'menuItem' );
menuItemArray[1].addEventListener( 'click', generateContent );

