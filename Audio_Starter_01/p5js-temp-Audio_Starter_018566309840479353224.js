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



  // us amplitude to control vertical location of ellipse
  //ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);

  //use amplitude to control size of circle.
  var grow = map(micLevel, 0, 1, 100, 900);
  var col =  map(micLevel, 0, 1, 130, 255);
  noFill();
  stroke(col);

  for (i = 0; i<width; i+=55) {
    for (j=0; j<height; j+=55) {
      
      ellipse(i, j, grow, grow);
    }
  }



  ////using fft waveform
  //var waveform = fft.waveform();
  //noFill();
  //beginShape();
  //stroke(255,0,0); // waveform is red
  //strokeWeight(1);
  //for (var i = 0; i< waveform.length; i++){
  //  var x = map(i, 0, waveform.length, 0, width);
  //  var y = map( waveform[i], -1, 1, 0, height);
  //  vertex(x,y);
  //}
  //endShape();


  ////using fft anaylze
  //var spectrum = fft.analyze();
  // noStroke();
  // fill(0,255,0); // spectrum is green
  // for (var j = 0; j< spectrum.length; j++){
  //   var x1 = map(j, 0, spectrum.length, 0, width);
  //   var h1 = -height + map(spectrum[j], 0, 255, height, 0);
  //   rect(x1, height, width / spectrum.length, h1 );
  // }
}

//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
