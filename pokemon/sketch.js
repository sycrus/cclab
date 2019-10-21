
var speechButton;
var img;
var speechStr;
var pokemonStr;
var json; //pokemon api
var myRec ;

function preload() {

  let url = "https://pokeapi.co/api/v2/pokemon/";
  json = loadJSON(url);

}

function setup() {
  
  createCanvas(400, 300);
  background(255); 

  //create p5.speech object
  myRec = new p5.SpeechRec();
  myRec.onResult = getPokemon;

  //create button
  // speechButton = createButton('Pokemon!');
  // button.position(65, 65);
  // button.mousePressed(getPokemon);

  

}

//called when button is pressed
function getPokemon() {
  //starts p5.speech
  myRec.start();

  //checks to see if any speech input was registered
  if(myRec.resultValue==true) {
    
    //console displays spoken text
    print(myRec.resultString);

    //removes whitespaces, store word in string
    speechStr = myRec.resultString.replace(/\s/g, '');

    //display pokemon name
    text(speechStr, width/2, height/2);

    //loads pokemon sprite NOT CORRECT
    img = loadImage(json.sprites.front_default);

    //display pokemon image
    image(img, 0, 60, 2 * img.width , 2 * img.height);

    //done with speech
    myRec.stop();
    
  }
  


}
function draw() {

  textFont("Kanit");
  

  //set up pokedex in background

}


