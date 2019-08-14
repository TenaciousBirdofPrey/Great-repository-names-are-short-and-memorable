var mic;
var fft;

// used to spin shape
var counter=0;

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


  // set background but don't refresh it.
  // put in draw() for refreshing background
  background(0);
}


function draw() {

  //set cordinates of screen so center x,y both equal 0
  translate(width/2, height/2);

  // recieve and analyze audio
  micLevel = mic.getLevel();
  var spectrum = fft.analyze();
  var bassLevel =fft.getEnergy("bass");
  var lowMidLevel =fft.getEnergy("lowMid");
  var midLevel =fft.getEnergy("mid");//a , b
  var highMidLevel =fft.getEnergy("highMid");//n2
  var trebleLevel =fft.getEnergy("treble");//ns

  //spin superformula
  rotate(PI+counter);

  //begin super formula

  // set color to heavily faded white
  fill(255, 10);

  //control stroke by bass level
  stroke(lowMidLevel, 0, 0);


  beginShape();
  for (var theta =0; theta<2*PI; theta += 0.01) {
    var rad = superFormula(theta, 
      //a -controls diameter or bottom/size of shape based on m. effects outer spikes
      map(midLevel, 0, 255, 0, 10), 
      //b -controls diameter or top/size of shape based on m. effect inner spikes
      map(midLevel, 0, 255, 0, 6), 
      //m-acts on a and b. sets number of spikes.rotational symetry
      20, 
      //n1 determines smoothness vs spikeyness
      map(lowMidLevel, 0, 255, 0, 1), 
      //n2 adjusts shape of spikes
      map(highMidLevel, 0, 255, 0, 4), 
      //n3 adjusts shape of spikes
      map(trebleLevel, 0, 255, 0, 4)
      );

    //convert  polar cordinates
    var x = rad * cos(theta)*100;
    var y = rad * sin(theta)*100 ;

    vertex(x, y);
  }
  endShape(CLOSE);


  //increase counter. controls how fast the shape spins
  counter+=0.001;
}


//superformula function
function superFormula( theta, a, b, m, n1, n2, n3) {
  return pow(pow(abs(cos(m * theta / 4.0) / a), n2)+
    pow(abs(sin(m * theta / 4.0) / b), n3), -1.0 / n1);
}

//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
