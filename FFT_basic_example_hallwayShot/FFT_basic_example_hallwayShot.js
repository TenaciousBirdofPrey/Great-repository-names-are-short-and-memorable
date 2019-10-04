var mic;
var fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create mic
  mic = new p5.AudioIn();
  mic.start();

  //fft analysis
  fft = new p5.FFT();

  // pass audio through speakers
  //may not engage until mouse is clicked while hovering over browser.
  mic.connect();
}


function draw() {
  background(0);
  micLevel = mic.getLevel();
  
  var spectrum = fft.analyze();
  var bassLevel =fft.getEnergy("bass");
  var lowMidLevel =fft.getEnergy("lowMid");
  var midLevel =fft.getEnergy("mid");
  var highMidLevel =fft.getEnergy("highMid");
  var trebleLevel =fft.getEnergy("treble");

  //fill(trebleLevel);
  //rect(0,0,100,100);
  
  //fill(highMidLevel);
  //rect(0,100,100,100);
  
  //fill(midLevel);
  //rect(0,200,100,100);
  
  //fill(lowMidLevel);
  //rect(0,300,100,100);  
  
  //fill(bassLevel);
  //rect(0,400,100,100);  
  
  translate(width/2,height/2);
  rectMode(CENTER);
  noFill();
  strokeWeight(1);
  stroke(255);
 for( i =0;i< width;i+=25){

   rect(0,0,i,i);
  
 }
 
strokeWeight(25);
var sq = map(trebleLevel,0,255,0,width);
rect(0,0,sq,sq);


}

//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
