
var temperature = 0;
var temp_min;
var temp_max;
var city = "";
var weather = "";
var weatherId;
var icon = "";
let img;
var location;
var json;
var nightBackgroundColor;
var dayBackgroundColor;
var nightTextColor;
var dayTextColor;

function preload() {

  //get by city ID
  //Manhattan: 4274994
  let url = "https://api.openweathermap.org/data/2.5/weather?id=4274994&units=metric&APPID=69b4441f84773f60a7ac0fc6567723c1";
  json = loadJSON(url);

}

function setup() {
  nightBackgroundColor = color(108,123,149);
  dayBackgroundColor = color(178,252,255);
  nightTextColor = color(235,255,251);
  dayTextColor = color(132,59,98);
  createCanvas(400, 300);
  background(dayBackgroundColor); //default: night
  fill(dayTextColor);
  
  city = json.name;

  // Get the temperature
  temperature = json.main.temp;
  temp_min = json.main.temp_min;
  temp_max = json.main.temp_max;
  
  // Grab the description, look how we can "chain" calls.
  weather = json.weather[0].description;
  icon = json.weather[0].icon;

  img = loadImage("https://openweathermap.org/img/wn/" + icon + "@2x.png");

  //testing
  //day
  //img = loadImage("https://openweathermap.org/img/wn/01d@2x.png");
  //night
  //img = loadImage("https://openweathermap.org/img/wn/01n@2x.png");
  img.resize (100, 100);
}

function draw() {

  updateColors();
  // Display all the stuff we want to display
  textFont("Kanit");
  

  textAlign(CENTER);
  textSize(32);
  text(city, width/2, 70);

  imageMode(CORNER);
  textAlign(LEFT);
  image(img, 0, 60, 2 * img.width , 2 * img.height);
  textSize(28);
  text(weather.charAt(0).toUpperCase() + weather.slice(1) , 35, 250);
  
  textAlign(CENTER);
  textSize(70);
  text(round(temperature) + "ºC", 290, 180);
  textSize(28);
  text(round(temp_min) + "ºC - " + round(temp_max) + "ºC", 290, 250);

}
function updateColors() {
  if (Array.from(icon)[2] == 'd') {
    //print("day");
    fill(dayTextColor);
    background(dayBackgroundColor);
  } else {
    //print("night");
    fill(nightTextColor);
    background(nightBackgroundColor);
  }
}
