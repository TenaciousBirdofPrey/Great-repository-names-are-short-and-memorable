var mic;
var fft;

let n =6;
let d = 71;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  angleMode(DEGREES);
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
  //bassLevel
  var b =map(fft.getEnergy("bass"),0,255,0,100 );
  //low Mid Level
  var lm =fft.getEnergy("lowMid");
  //mid level
  var m =map(fft.getEnergy("mid"),0,255,0,200);
  //high mid level
  var hm =fft.getEnergy("highMid");
  // treble
  var t =map(fft.getEnergy("treble"),0,255,0,200);



  
  translate(width/2,height/2);
  stroke(255,90);
  
  noFill();
  beginShape();
  strokeWeight(1);
  
 for(let i =0;i<361;i++){
 
 let k = i *(d+b);
 let r = (150+m) * sin(n*k);
 let x = r *cos(k+t);
 let y = r * sin(k+t);
 vertex(x,y);
 }
  endShape(CLOSE);
  
  

 //edge color of rose
 noFill();
 stroke(lm,0,0);
  beginShape();
  strokeWeight(3);
  
 for(let i =0;i<361;i++){
 
 let k = i+b ;
 let r = (150+m) * sin(n*k);
 let x = r *cos(k+t);
 let y = r * sin(k+t);
 vertex(x,y);
 }
  endShape(CLOSE);  
  

  

}

//chrome won't allow auto play, add workaround
function mousePressed() { 
  getAudioContext().resume();
}
