/*
//requests posts from reddit
var newRequest = new XMLHttpRequest();
newRequest.addEventListener( 'load', function (){
  var response = JSON.parse( this.responseText );
  var arrayOfPosts = response.data .children;

  //isolates data from each post
  var onePost = arrayOfPosts[0].data;
  console.log( onePost.title, onePost.author, onePost.viewcount );

  //creates and appends preview image
  var image = onePost.thumbnail;
  var testImage = document.createElement( 'img' );
  testImage.src = image;
  console.log( testImage );
  document.getElementById( 'grid' ).appendChild( testImage );
} );
newRequest.open( 'GET', 'https://www.reddit.com/r/NatureIsFuckingLit.json' );
newRequest.send();

function setDataOfElement( element, sourceUrl ){
  element.data.sourceUrl = sourceUrl;
}*/


function generateContent (){
  var createContentContainer = document.createElement( 'div' );
  createContentContainer.className = 'contentContainer';

  //requests posts from reddit
  var newRequest = new XMLHttpRequest();
  newRequest.addEventListener( 'load', function (){
    var response = JSON.parse( this.responseText );
    var arrayOfPosts = response.data .children;

    for( var i = 0; i < 4; i++ ){
      var onePost = arrayOfPosts[i].data;
      console.log( onePost.title, onePost.author, onePost.viewcount );

      var postThumbnail = document.createElement( 'div' );
      postThumbnail.className = 'post';

      createPostContent( onePost.thumbnail, 'img', 'src', postThumbnail );
      createPostContent( onePost.title, 'p', 'innerHTML', postThumbnail );
      createPostContent( onePost.author, 'p', 'innerHTML', postThumbnail );
      createPostContent( onePost.viewcount, 'p', 'innerHTML', postThumbnail );

      var targetGrid = document.getElementById( 'grid' );
      targetGrid.appendChild( postThumbnail );
    }
  });
  newRequest.open( 'GET', 'https://www.reddit.com/r/NatureIsFuckingLit.json' );
  newRequest.send();

  var targetGrid = document.getElementById( 'grid' );
  targetGrid.appendChild( createContentContainer );
}

function createPostContent ( contentSource, elementType, attributeType, appendTarget ){
  var newElement = document.createElement( elementType );
  newElement[attributeType] = contentSource;
  appendTarget.appendChild( newElement );
}


var menuItemArray = document.getElementsByClassName( 'menuItem' );


menuItemArray[1].addEventListener( 'click', generateContent );

