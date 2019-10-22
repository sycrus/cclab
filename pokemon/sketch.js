// psuedocode
// load speech recog
// setup scene, button
// if button is pressed, 
//    start speech recog
//    use speech string to build url
//    loadJSON(url) --> CALLBACK before doing anything else
//    do stuff with json


var speechButton;
var img;
var url;
var speechStr;

var pokemonStr;

var myRec ;

function setup() {
  
  createCanvas(400, 400);
  background(200); 
  textFont("Kanit");

  //create p5.speech object
  myRec = new p5.SpeechRec();

  speechButton = createButton('Summon Pokemon!');
  speechButton.position(width/2, 10);
  speechButton.mousePressed(getPokemon);

}

//called when onResult is called
function getPokemon() {

  myRec.start();
  //checks to see if any speech input was registered
  if(myRec.resultValue) {

    //removes whitespaces, store word in string
    speechStr = myRec.resultString.replace(/\s/g, '');
    pokemonStr = speechStr.toLowerCase();
    
    text(speechStr, width/2, height/2);
    
    let url = "https://pokeapi.co/api/v2/pokemon/";

    loadJSON(url + pokemonStr, getPokeInfo);

  }
}


//do all the displays here
function getPokeInfo(data) {

  var pokeId = data.id;
  img = createImg(data.sprites.front_default, data.name);
  image(img, 0, 60, img.width , img.height);
  //display pokemon name
  //print(pokeJson.id);
}

function draw() {
  var dex = loadImage("pokedex.png");
  image(dex, 0, 0, img.width , img.height);
  //set up pokedex in background
}


