var speechButton;
var speechStr;
var myFont;

var gotData, gotData2;
var bgImg;

var pokeId;
var pokeName;
var pokeType;

var pokeImg;
var pokeWeightLbs;
var pokeHeight;
var pokeHeightFeet, pokeHeightInches;
var pokeText;

var pokemonStr;

var myRec ;

function preload() {
  bgImg = loadImage("pokedex.png");
  myFont = loadFont("pokemon.ttf");

}
function setup() {
  
  createCanvas(512, 384);

  //create p5.speech object
  myRec = new p5.SpeechRec();

  speechButton = createButton('Click and Call out Pokemon!');
  speechButton.position(width/2 -60, 400);
  speechButton.mousePressed(getPokemon);

}

//called when onResult is called
function getPokemon() {

  //myRec.start();
  //checks to see if any speech input was registered
  //if(myRec.resultValue) {

    //removes whitespaces, store word in string
    // speechStr = myRec.resultString.replace(/\s/g, '');
    // pokemonStr = speechStr.toLowerCase();
    speechStr = "Ditto";
    pokemonStr = "ditto";
    text(speechStr, width/2, height/2);
    
    let url = "https://pokeapi.co/api/v2/pokemon/";

    loadJSON(url + pokemonStr, getPokeInfo);

  //}
}


//do all the displays here
function getPokeInfo(data) {

  gotData = data;

  //id is 3 digits
  pokeId = nf(data.id, 3, 0);

  

  pokeType = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.substr(1, data.types[0].type.name.length).toLowerCase();
  pokeImg = createImg(data.sprites.front_default, data.name);
  pokeName = data.name.charAt(0).toUpperCase() + data.name.substr(1, data.name.length).toLowerCase();
  
  //convert to meters, then to imperial
  pokeHeight = data.height/10 *3.281;
  //then to feet
  pokeHeightFeet = floor(pokeHeight);
  //and to inches
  pokeHeightInches =  nf(int(pokeHeight % 12), 2,0); 

  //convert to pounds, 1dp
  pokeWeightLbs = nf(data.weight/10 * 2.2, 0, 1);

  let url2 = "https://pokeapi.co/api/v2/pokemon-species/" + data.id;

  loadJSON(url2, getPokeText);
}

// gets flavor text
function getPokeText(data) {
  gotData2 = data;
  pokeText = data.flavor_text_entries[2].flavor_text;
  //print(pokeText);
}

function draw() {
  //set up pokedex image in background
  background(bgImg); 
  textFont(myFont);
  textSize(35);
  
  //if both jsons are loaded and parsed
  if (gotData != null && gotData2 != null) {
    image(pokeImg, 0, 55, (pokeImg.width * 2) , (pokeImg.height * 2));
    text(pokeId, 260, 75);
    text(pokeName, 320, 75);
    text (pokeHeightFeet + "'" + pokeHeightInches, 390, 203);
    text (pokeWeightLbs, 390, 233);
    text(pokeType, 260, 115);

    textSize(25);
    text(pokeText, 70, 295);
  }
}


