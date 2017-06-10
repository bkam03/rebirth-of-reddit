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
      console.log( onePost.title, onePost.author, onePost.viewcount );

      var postThumbnail = document.createElement( 'div' );
      postThumbnail.className = 'post';

      createPostContent( onePost.thumbnail, 'img', 'src', 'thumbnail', postThumbnail );
      createPostContent( onePost.title, 'p', 'innerHTML', 'postDescription', postThumbnail );
      createPostContent( onePost.author, 'p', 'innerHTML', 'postDescription', postThumbnail );
      createPostContent( onePost.viewcount, 'p', 'innerHTML', 'postDescription',  postThumbnail );

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
  appendTarget.appendChild( newElement );
}


var menuItemArray = document.getElementsByClassName( 'menuItem' );
menuItemArray[1].addEventListener( 'click', generateContent );

