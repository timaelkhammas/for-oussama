let heartsAssets = [];
let loveAssets = [];
let hearts = [];
let love = [];
let us;
let f;
let s;
let b;
let rb;
let pTouch;
let paused = false;
let txt =
  "oussama, you’re 24 at last and we’re the same age now!!! \n\n i know that you don’t like making a big deal out of your birthday but i still wanted to make you a gift you can receive even from afar. <3 \n\n it feels like just yesterday when we had that nerve-racking conversation and decided to be together. looking back now, that was probably one of the best things that has ever happened to me and life has been so great by your side ever since. \n\n i want to do everything in my power to make this beautiful thing we have last for as long as possible. \n\n everything else is a bonus to being able to be in proximity to you and your jokes and your whole being \n\n thank you for being patient and kind and loving, always.\n\n i love you dearly my beautiful boy.\n\n yours forever, \n tima \n\n\n\n omg wait \n\n ... \n\n there's more \n\n !!! \n\n don't \n\n stop \n\n i miss you so much \n\n and i love you a lot \n\n i can't wait to see you again \n\n we need to take more photos together \n\n and we need to kiss more \n\n happy birthday hobi";

function preload() {
  heartsAssets.push(loadImage("baby.png"));
  heartsAssets.push(loadImage("heart.png"));
  us = loadImage("us.jpg");
  s = loadSound("O.mp3");
  loveAssets.push({
    img: loadImage("marry me.png"),
    xv: random(-0.05, -0.2),
    x: random(-100, 400),
    y: random(400),
  });
  loveAssets.push({
    img: loadImage("reel.png"),
    xv: random(-0.05, -0.2),
    x: random(-100, 400),
    y: random(400),
  });
  loveAssets.push({
    img: loadImage("snoopy.png"),
    xv: random(-0.05, -0.2),
    x: random(-100, 400),
    y: random(400),
  });
  loveAssets.push({
    img: loadImage("chess.jpeg"),
    xv: random(-0.05, -0.2),
    x: random(-100, 400),
    y: random(400),
  });
  f = loadFont("AJensonPro-Regular.otf");
}

let txtStart;

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  imageMode(CENTER);
  textFont(f);
  textSize(20);
  rectMode(CENTER);
  textAlign(LEFT, TOP);
  b = createButton("happy birthday my baby, click me!");

  b.mousePressed(startSound);
  b.style("padding: 16px 24px; border: none; border-radius: 8px; ");
  b.position(width / 2 - b.width / 2, (height / 8) * 7);

  rb = createButton("pause?");

  rb.mousePressed(pauseOrReset);
  rb.style("padding: 8px 16px; border: none; border-radius: 8px; ");
  rb.position(width - rb.width * 1.4, (height / 8) * 7);
  rb.hide();

  txtStart = height;
  setupElements();
  noLoop();
}




function setupElements() {
  for (let i = 0; i < 30; i++) {
    hearts.push(new leaf(random(heartsAssets), random(20, 100)));
  }

  for (let i = 0; i < 10; i++) {
    love.push(random(loveAssets));
  }
}

function pauseOrReset() {
  if (isLooping()) {
    print("Pause!");
    paused = true; 
    noLoop();
    s.pause();
    rb.html("play!!");
    b.show();
    b.html("reset??");
  } else {
    print("play again");
    paused = false; 
    loop();
    rb.html("pause?");
    b.hide();
    s.play();
  }

}

function startSound() {
  if (!paused) {
    print("start!")
    loop();
    s.play();
    rb.show();
    b.hide();
  } else {
    print("reset!")
    hearts = [];
    setupElements();
    txtStart = height; 
    b.html("happy birthday my baby, click me!");
    rb.html("pause?");
    rb.hide();
    paused = false;
    redraw();
    s.stop();
    noLoop();
  }
}


function draw() {
  background("#FFC8DD");

  b.position(width / 2 - b.width / 2, (height / 8) * 7);

  let factor = 5;
  for (let c of love) {
    image(
      c.img,
      (c.x += c.xv),
      c.y,
      c.img.width / factor,
      c.img.height / factor
    );
    if (c.x < -c.img.width / factor) {
      c.x = width + c.img.width / factor;
    }
  }

  for (let l of hearts) {
    l.move();
    l.display();
    l.contain();
  }
  const margin = 40;
  noStroke();
  fill(255, 255, 220, 200);
  rectMode(CORNER);
  rect(
    width / 2 - (width * 0.7) / 2 - margin,
    txtStart,
    width * 0.7 + margin * 2,
    height*3
  );

  fill(10);
  textWrap(WORD)
  text(txt, width / 2 - (width * 0.7) / 2, txtStart + margin, width * 0.7,height*3);
  
  image(us, width/2, txtStart+height*3-(width*.5/us.width)*us.height+50,width*.5,(width*.5/us.width)*us.height);
  txtStart -= .25;
}



function touchMove(){
  txtStart+=mouseY-pmouseY;  

};


function mouseDragged(){
txtStart+=mouseY-pmouseY;  

};

class leaf {
  constructor(l, d) {
    this.p = createVector(random(width), random(-30, -height));
    this.asset = l;
    this.d = d;
    this.rotOff = random(-PI, PI);
    this.ang = 0;
    this.swingRange = (20 / this.d) * -1;
  }

  move() {
    this.ang = sin(frameCount / 100 + this.rotOff);
    this.p.y += map(this.ang, -1, 1, 0.01, 0.2) * 3;
    this.p.x += map(this.ang, -1, 1, -this.swingRange, this.swingRange);
  }
  display() {
    push();
    translate(this.p.x, this.p.y);
    rotate(this.ang * HALF_PI);
    image(this.asset, 0, 0, this.d, this.d);
    pop();
  }

  delete() {
    if (this.p.y > height + this.d) {
      hearts.splice(hearts.indexOf(this), 1);
      print("hearts length: " + hearts.length);
    }
  }

  contain() {
    if (this.p.y > height + this.d) {
      this.p = createVector(random(width), -100);
    }
  }
}
