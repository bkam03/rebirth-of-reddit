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

      var image = createPostContent( onePost.thumbnail, 'img', 'src', 'thumbnail', postThumbnail );
      postThumbnail.appendChild( image );

      var title = createPostContent( onePost.title, 'p', 'innerHTML', '"postDescription", "title"', postThumbnail );
      postThumbnail.appendChild( title );

      var author = createPostContent( onePost.author, 'p', 'innerHTML', '"postDescription", "author"', postThumbnail );
      postThumbnail.appendChild( author );

      var dateCreated = createPostContent( onePost.created, 'p', 'innerHTML', '"postDescription", "dateCreated"', postThumbnail );
      var date = new Date( onePost.created * 1000 );
      console.log( typeof date, date );
      dateCreated.innerHTML = date;
      postThumbnail.appendChild( dateCreated );

      var viewcount = createPostContent( onePost.viewcount, 'p', 'innerHTML', '"postDescription", "viewcount"',  postThumbnail );
      postThumbnail.appendChild( dateCreated );

      var targetGrid = document.getElementById( 'grid' );
      targetGrid.appendChild( postThumbnail );
    }
  });
  newRequest.open( 'GET', 'https://www.reddit.com/r/NatureIsFuckingLit.json' );
  newRequest.send();

  var targetGrid = document.getElementById( 'grid' );
  targetGrid.appendChild( createContentContainer );
}

function createPostContent ( contentSource, elementType, attributeType, className, appendTarget ){
  var newElement = document.createElement( elementType );
  newElement[attributeType] = contentSource;
  newElement.className = className;
  return newElement;
/*  appendTarget.appendChild( newElement );
*/}


var menuItemArray = document.getElementsByClassName( 'menuItem' );
menuItemArray[1].addEventListener( 'click', generateContent );

