var mic;
var fft;
var spin = 0.0;
var spin2 = 0.0;

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
  background(0);
}


function draw() {

  micLevel = mic.getLevel();
  translate(width/2, height/2);

  var spectrum = fft.analyze();
  var bassLevel =fft.getEnergy("bass");
  var lowMidLevel =fft.getEnergy("lowMid");
  var midLevel =fft.getEnergy("mid");
  var highMidLevel =fft.getEnergy("highMid");
  var trebleLevel =fft.getEnergy("treble");
  var bass200_300 =fft.getEnergy(200, 250);

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

  stroke(255,highMidLevel);
  fill(0, 10);
  let t =0;

  push();
  rotate(PI+spin2);

  //outer shape
  beginShape();
  for (let a = 0; a < TWO_PI; a+= 0.05) {

    //create perlin noise and map it to bass 
    let r = map(noise(t), 0, 1, bassLevel, 500);
    let x = r*cos(a);
    let y = r*sin(a);
    vertex(x, y);
    t+=0.1+spin;
  }
  endShape(CLOSE);
  pop();

  push();
  rotate(PI+(spin2*-1));
  // inner shape
  noFill();
  stroke(midLevel,0,0);
  beginShape();
  for (let i= 0; i < TWO_PI; i+= 0.05) {

    //create perlin noise and map it to bass 
    let r2 = map(noise(t*-1), 0, 1, trebleLevel, 200);
    let x2 = r2*cos(i);
    let y2 = r2*sin(i);
    vertex(x2, y2);
    t+=0.1+spin;
  }
  endShape(CLOSE);
  pop();


  spin+=0.0001;
  spin2+=0.01;
}

//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
