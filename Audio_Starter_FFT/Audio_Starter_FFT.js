/*
https://p5js.org/reference/#/p5.FFT

A template to start creating scenes easily
*/


var mic;
var fft;



function setup() {
  createCanvas(windowWidth, windowHeight);


  // create mic
  mic = new p5.AudioIn();
  mic.start();

  //init fft analysis
  fft = new p5.FFT();

  // pass audio through speakers
  //may not engage until mouse is clicked while hovering over browser.
  mic.connect();



  
}


function draw() {
  background(135);

  //set cordinates of screen so center x,y both equal 0
  translate(width/2, height/2);

  // recieve and analyze audio
  micLevel = mic.getLevel();
  var spectrum = fft.analyze();
  var bass =fft.getEnergy("bass");
  var lowMid =fft.getEnergy("lowMid");
  var mid =fft.getEnergy("mid");
  var highMid =fft.getEnergy("highMid");
  var treble =fft.getEnergy("treble");

// each circle grows according levels

ellipse(-500,0,bass,bass);
ellipse(-250,0,lowMid,lowMid);
ellipse(0,0,mid,mid);
ellipse(250,0,highMid,highMid);
ellipse(500,0,treble,treble);

  

  
}




//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
