/*
https://p5js.org/reference/#/p5.FFT
 
 A template to start creating scenes easily
 */


var mic;
var fft;
var counter = 0.0;


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
  background(0);

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

  //ellipse(-500,0,bass,bass);
  //ellipse(-250,0,lowMid,lowMid);
  //ellipse(0,0,mid,mid);
  //ellipse(250,0,highMid,highMid);
  //ellipse(500,0,treble,treble);

 let r =0;
  stroke(255);
  noFill();
  beginShape();


  for ( let a = 0; a < width; a+=0.03) {


    let bassSpiral = map(lowMid,0,255,0,5);
    strokeWeight(1,bassSpiral);
    r += 0.01;
    let x = (r*bassSpiral) * cos(a);
    let y = (r*bassSpiral) * sin(a);
    vertex(x, y);
  }

  endShape();

  counter+=0.1;
}




//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
