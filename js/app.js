
//requests posts from reddit
var test = new XMLHttpRequest();
test.addEventListener( 'load', function (){
  //console.log( JSON.parse( this.responseText ) );
  var response = JSON.parse( this.responseText );
  var arrayOfPosts = response.data .children;

  //isolates data from each post
  var onePost = arrayOfPosts[0].data;
  console.log( onePost.title, onePost.author, onePost.viewcount );
  var image = onePost.secure_media.oembed.thumbnail_url;


  //creates and appends preview image
  var testImage = document.createElement( 'img' );
  testImage.src = image;
  console.log( testImage );
  document.getElementById( 'grid' ).appendChild( testImage );



} );
test.open( 'GET', 'https://www.reddit.com/r/SlowMotion.json' );
test.send();