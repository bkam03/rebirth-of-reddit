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
      //isolates data from each post
      var onePost = arrayOfPosts[i].data;
      console.log( onePost.title, onePost.author, onePost.viewcount );

      //creates and appends preview image
      var image = onePost.thumbnail;
      var testImage = document.createElement( 'img' );
      testImage.src = image;
      createContentContainer.appendChild( testImage );
    }
  });
  newRequest.open( 'GET', 'https://www.reddit.com/r/NatureIsFuckingLit.json' );
  newRequest.send();

  var targetGrid = document.getElementById( 'grid' );
  targetGrid.appendChild( createContentContainer );
}


var menuItemArray = document.getElementsByClassName( 'menuItem' );


menuItemArray[1].addEventListener( 'click', generateContent );

