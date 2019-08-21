var mic;
var fft;
var feeder =0.0;

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
    //use amplitude to control size of circle.
  var grow = map(micLevel, 0, 1, 10, 400);
  var col =  map(micLevel, 0, 1, 100, 210);
  var colGrid =  map(micLevel, 0, 1, 0, 200);
  
  //background grid
  stroke(colGrid);
  for (x=0; x<width; x+=50) {

    line(x, 0, x, width);
  }

  for (y=0; y<height; y+=50) {

    line(0, y, width, y);
  }



  noFill();
  stroke(col);


  push();
  rectMode(CENTER);
  translate(width/2, height/2);

  rotate(PI+feeder);


  for (i=700; i>85; i-=15) {
    rotate(PI+feeder/i);
    fill(i%255);
    rect(0, 0, i, i);
  }
  fill(255);
  strokeWeight(4);
  //center square
  rect(0, 0, grow, grow);

  strokeWeight(1);
  pop();





  feeder+=0.008;
}

//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
