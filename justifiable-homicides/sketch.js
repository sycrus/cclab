let table;
let states = [ 'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'FM', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC',  'ND', 'NE', 'NJ', 'NH', 'NM',' NV', 'NY', 'MP', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SD', 'SC', 'TN', 'TX', 'UT', 'VI', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
let deathsPerState = []; //array of tablerow objects
let dps =[]; //array of ints
var source;
var xScaleValue = 20;
var yScaleValue = 1.2;

function preload() {
  table = loadTable('assets/counted2016.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1250, 300);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
}

function draw(){
  background(220);
  fill(0);
  stroke(0);

  textSize(40);
  text("Justifiable Homicides, 2016", width/2 - 250, 50);

  // ********* plots deaths per state ************
  for (var j= 0; j < states.length; j++) {
    deathsPerState[j]= table.matchRows(states[j], 'state');
    dps[j] = deathsPerState[j].length;
  //print(states[j] + ": " + dps[j]);
  }

  textSize(10);
  for (var i = 0; i < states.length; i++) {
    //label x axis
    text(states[i], i * xScaleValue + 20, 275);
  
    //draw graph
    line (i * xScaleValue + 30, 250- dps[i] * yScaleValue, (i+1) * xScaleValue + 30, 250 - dps[i+1] * yScaleValue);
  }
  //determine highest value
  let maxValue = max(dps);
  //print(maxValue);
  for (var k = 0; k < maxValue ; k = k + 10){
    text(k, 10, 250-k * yScaleValue);
  }
  //************ plots 
  textSize(8);
  source = "Source: https://www.theguardian.com/us-news/ng-interactive/2015/jun/01/about-the-counted";
  text(source, width/2 - 140, height - 10);
}