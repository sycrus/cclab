var myRec ;
var bgImg;
var myFont;

var speechStr;
var pokemonStr;

var gotData, gotData2;

var pokeId;
var pokeName;
var pokeType;
var pokeImg;
var pokeWeightLbs;
var pokeHeight;
var pokeHeightFeet, pokeHeightInches;
var pokeText;

function preload() {
  bgImg = loadImage("pokedex.png");
  myFont = loadFont("pokemon.ttf");

}
function setup() {
  
  createCanvas(512, 484);

  //create p5.speech object
  myRec = new p5.SpeechRec();
  myRec.continuous = true;
  myRec.onResult = getPokemon;
  myRec.start();
}

//called when onResult is called
function getPokemon() {

  //checks to see if any speech input was registered
  if(myRec.resultValue) {

    //removes whitespaces, store word in string
    speechStr = myRec.resultString.replace(/\s/g, '');
    pokemonStr = speechStr.toLowerCase();

    let url = "https://pokeapi.co/api/v2/pokemon/";

    loadJSON(url + pokemonStr, getPokeInfo);
    
  }
}


//do all the displays here
function getPokeInfo(data) {

  gotData = data;

  //id is 3 digits
  pokeId = nf(data.id, 3, 0);

  pokeType = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.substr(1, data.types[0].type.name.length).toLowerCase();
  pokeImg = loadImage(data.sprites.front_default, data.name);
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
 
  image (bgImg, 0, 0, bgImg.width*2, bgImg.height*2);
  textFont(myFont);
  textSize(35);
  
  let str = "Say any Pokemon's name!";
  text(str, 120, 420);

  //if both jsons are loaded and parsed
  if (gotData != null && gotData2 != null) {
    image(pokeImg, 0, 55, (pokeImg.width * 2) , (pokeImg.height * 2));
    text(pokeId, 260, 75);
    text(pokeName, 315, 75);
    text (pokeHeightFeet + "'" + pokeHeightInches, 390, 203);
    text (pokeWeightLbs, 380, 233);
    text(pokeType, 260, 115);

    textSize(25);
    text(pokeText, 70, 295);
  }
}


