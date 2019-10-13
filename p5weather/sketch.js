// We're going to store the temperature
var temperature = 0;
var city = "";
// We're going to store text about the weather
var weather = "";

var weatherId;

var icon = "";
var sunriseTime;
var sunsetTime;
let img;

var location;
var json;



function preload() {

  //get by city ID
  //Manhattan: 4274994
  let url = "https://api.openweathermap.org/data/2.5/weather?id=4274994&units=metric&APPID=69b4441f84773f60a7ac0fc6567723c1";
  json = loadJSON(url);

}

function setup() {
  createCanvas(800, 400);

  city = json.name;

  // Get the temperature
  temperature = json.main.temp;

  // Grab the description, look how we can "chain" calls.
  weather = json.weather[0].description;
  weatherId = json.weather[0].id;
  icon = json.weather[0].icon;

  img = loadImage("https://openweathermap.org/img/wn/" + icon + "@2x.png");
  img.resize (100, 100);
}

function draw() {
  background(255);
  fill(0);

  // Display all the stuff we want to display
  textFont("Kanit");
  textSize(32);
  text("City: " + city, 10, 50);
  text("Current temperature: " + round(temperature) + "ºC", 10, 80);
  text("Forecast: " + weather.charAt(0).toUpperCase() + weather.slice(1) , 10, 110);

  //text("Weather ID: " + weatherId, 10, 110);
  //text("Digit: " + ((weatherId /100) % 10), 10, 130);
  
  //background colors based on category of weather
  if (weatherId == 800) { //clear: d-blue, n-dark

  }
  else if (((weatherId /100) % 10) == 2) { //thunderstorm

  } else if (((weatherId /100) % 10) == 3) { //drizzle

  } else if (((weatherId /100) % 10) == 5) { //rain

  } else if (((weatherId /100) % 10) == 6) { //snow

  } else if (((weatherId /100) % 10) == 7) { //atmosphere

  } else if (((weatherId /100) % 10) == 8) { //clouds
    
  }

  image(img, width / 2, 20, img.width , img.height)

}
