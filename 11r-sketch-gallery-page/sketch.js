let rain = [];
let splash = [];
let totalNum = 0;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasContainer");
  background(0);
  strokeWeight(2);
  for (let i = 0; i < splash.length; i++) {
    splash[i] = new Water(this.x, this.y);
  }

  for (let i = 0; i < rain.length; i++) {
    rain[i] = new Raindrop(this.x, this.y);
  }
  noStroke();
}

function draw() {
  background(0);
  let speed = map(mouseX, 0, width, 0.01, 0.115);
  let resolution = 8;
  for (let y = 0; y < height; y += resolution) {
    for (let x = 0; x < width; x += resolution) {
      let freq1 = x * 0.02 + frameCount * 0.8 * speed;
      let freq2 = y * 0.02 + frameCount * 0.8 * speed;
      let noiseValue = noise(freq1, freq2);
      let brightness = map(noiseValue, 0, 1, 0, 120);

      fill(brightness);
      rect(x, y, resolution, resolution);
    }
  }

  rain.push(new Raindrop(this.x, this.y));

  for (let i = 0; i < rain.length; i++) {
    let r = rain[i];
    r.display();
    r.move();
  }

  if (frameCount > 120) {
    let frq = map(mouseX, 0, width, 0.05, 0.9);
    if (random() < frq) {
      splash.push(new Water(this.x, this.y));
    }
  }

  for (let i = 0; i < splash.length; i++) {
    let s = splash[i];
    s.move();
    s.display();
  }

  if (rain.length > 900) {
    let index = 0;
    let numberOfElement = 1;
    rain.splice(index, numberOfElement);
  } else {
  }

  if (splash.length > 130) {
    let index = 0;
    let numberOfElement = 1;
    splash.splice(index, numberOfElement);
  } else {
  }

  if (mouseIsPressed) {
    background(random(70, 235), random(150, 230));
  }
}
class Water {
  constructor(x, y) {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.dia = random(30, 60);
    this.xSpd;
    this.ySpd;
    this.r = random(130, 150);
    this.f = 255;
  }
  move() {
    this.f -= 3.5;
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(this.r, this.f);
    stroke(this.r, this.f * 4);
    strokeWeight(1);
    circle(0, 0, this.dia);
    pop();
  }
}

class Raindrop {
  constructor(x, y) {
    this.x = random(width);
    this.y = random(height);
    this.z = width;
    this.xSpd = random(0.5, 1);
    this.ySpd = random(0.5, 1);
    this.r = random(70, 110);
    this.mSpd = 25;
    if (this.x < width / 2) {
      this.xSpd = this.xSpd * -1;
    } else {
    }

    if (this.y < height / 2) {
      this.ySpd = this.ySpd * -1;
    } else {
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
    this.z -= this.mSpd;
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
      this.pz = this.z;
    }
  }
  display() {
    push();
    translate(width / 2, height / 2);
    fill(this.r);
    stroke(this.r, this.g, this.b);

    let cx = map(this.x / this.z, 0, 1, 0, width);
    let cy = map(this.y / this.z, 0, 1, 0, height);

    let r = map(this.z, 0, width, 5, 0);
    ellipse(cx, cy, r, r);

    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(this.r);
    strokeWeight(r);
    line(px, py, cx, cy);
    pop();
  }
}