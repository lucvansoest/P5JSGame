


class Wave {

    constructor(speedFactor) {
        this.x = random(width);
        this.y = random(height);
        this.length = random(2, 25);
        this.color = color(0, random(90, 105), 148);
        this.speedFactor = speedFactor;
    }

    move() {    
        if (this.y > height) {
            this.x = random(width);
            this.y = random(-100, 0);
        } 
        this.y += backgroundSpeed * this.speedFactor;
    }

    display() {      
        push();
        strokeWeight(5);
        stroke(this.color);
        line(this.x, this.y, this.x, (this.y + this.length));
        pop();
    }
}

class Cloud {

    constructor(speedFactor) {
        this.x = random(width);
        this.y = random(height);
        this.color = color(255, 255, random(225, 255), 50);
        this.speedFactor = speedFactor;
        this.cloudSprite = random(cloudSprites);
    }

    move() {    
        if (this.y > height + 100) {
            this.x = random(width);
            this.y = random(-200, 0);
        } 
        this.y += backgroundSpeed * this.speedFactor;
    }

    display() {      
        
        image(this.cloudSprite, this.x, this.y, this.cloudSprite.width / 2, this.cloudSprite.height / 2)
    }
}

class Bullit {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        this.y -= 1;
    }

    display() {      
        push();
        strokeWeight(2);
        stroke(30);
        line(this.x, this.y - 30,  this.x, this.y - 27);
        pop();
    }
}

let waves = [];
let cloudsBottom = [];
let cloudsTop = [];
let numberOfWaves = 50;
let numberOfCloudsBottom = 6;
let numberOfCloudsTop = 5;

let bullits = [];

let planeSpriteSheet;
let planeSpriteWidth = 217;
let planeSpriteHeight = 142;
let planeSpriteXPosition = 434;
let planeDefaultSpeed = 2;
let planeSpeed = planeDefaultSpeed;
let planeXPosition = 0;
let planeYPosition = 0;

let cloudSprites = [];

let defaultBackgroundSpeed = 1;
let backgroundSpeed = defaultBackgroundSpeed;

let playFieldMargin = 100;

function preload() {

    console.log('preload');
    
    planeSpriteSheet = loadImage('img/plane-sprite.png');

    for(let i = 0; i < 10; i++) {
        cloudSprites[i] = loadImage('img/cloud' + (i + 1) + '.png');
    }
}

function setup() {

    console.log('setup');

    createCanvas(800, 600);

    planeXPosition = width / 2;
    planeYPosition = height / 2;

    for (let i = 0; i < numberOfWaves; i++) {
        waves.push(new Wave(1));
    }

    for (let i = 0; i < numberOfCloudsBottom; i++) {
        cloudsBottom.push(new Cloud(2));
    }
    
    for (let i = 0; i < numberOfCloudsTop; i++) {
        cloudsTop.push(new Cloud(3));
    }
}
  
function draw() {
	
    background('#006994');

    for(let i = 0; i < numberOfWaves; i++) {
        waves[i].move();
        waves[i].display();
    }

    for(let i = 0; i < numberOfCloudsBottom; i++) {
        cloudsBottom[i].move();
        cloudsBottom[i].display();
    }

    for(let i = 0; i < bullits.length; i++) {
        bullits[i].move();
        bullits[i].display();
    }

    //reset plane sprite position to default;
    planeSpriteXPosition = 434;

    //reset background speed;
    backgroundSpeed = defaultBackgroundSpeed;

    if (keyIsDown(LEFT_ARROW)) {
        if (planeXPosition > playFieldMargin) {
            planeXPosition -= planeSpeed;
            planeSpriteXPosition = 0;
            planeSpeed *= 1.003;
        }
        else{
            planeSpeed = planeDefaultSpeed;
        }
    }

    if (keyIsDown(RIGHT_ARROW)) {
        if (planeXPosition < width - playFieldMargin) {
            planeXPosition += planeSpeed;     
            planeSpriteXPosition = 651;
            planeSpeed *= 1.003;
        }
        else{
            planeSpeed = planeDefaultSpeed;
        }
    }
    
    if (keyIsDown(UP_ARROW)) { 
        if (planeYPosition > playFieldMargin * 3) {
            planeYPosition -= planeSpeed;
            planeSpeed *= 1.003;
        }
        else{
            planeSpeed = planeDefaultSpeed;
        }
        backgroundSpeed = backgroundSpeed * 2;
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        if (planeYPosition < height - playFieldMargin) {
            planeYPosition += planeSpeed;
            planeSpeed *= 1.003;
        }
        else{
            planeSpeed = planeDefaultSpeed;
        }
        //backgroundSpeed = backgroundSpeed / 2;
    }

    imageMode(CENTER);
    let planeSprite = planeSpriteSheet.get(planeSpriteXPosition, 0, planeSpriteWidth, planeSpriteHeight);
    image(planeSprite, planeXPosition, planeYPosition, planeSpriteWidth / 2, planeSpriteHeight / 2);

    for(let i = 0; i < numberOfCloudsTop; i++) {
        cloudsTop[i].move();
        cloudsTop[i].display();
    }

}
  

function keyPressed() {

    if (keyCode === 32) {
      bullits.push(new Bullit(planeXPosition, planeYPosition));
    }

  }