//https://workshops.hackclub.com/platformer/
var groundSprites;
var GROUND_SPRITE_WIDTH = 100;
var GROUND_SPRITE_HEIGHT = 100;
var numGroundSprites;
var GRAVITY = 2;
var numGroundSprites;
var mario, mario_running;
var JUMP = -10;
var obstacleSprites;
var isGameOver;
var score;

window.preload = () => {
  mario_running = loadAnimation("Capture1.png","Capture3.png","Capture4.png");
};
window.setup= () => {
  isGameOver = false;
  score = 0;
  createCanvas(windowWidth, windowHeight);
  background(150, 200, 250);
  groundSprites = new Group();
  numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;
  for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(
      n * 100,
      height - 10,
      GROUND_SPRITE_WIDTH,
      GROUND_SPRITE_HEIGHT
    );
    groundSprites.add(groundSprite);
  }
  mario = createSprite(50,height-90,50,50);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.5;
  obstacleSprites = new Group();
};
window.draw = () => {
  if (isGameOver) {
    background(0);
    fill(255);
    textAlign(CENTER);
    text('Your score was: ' + score, width/2, height/2);
    text(
      'Game Over! Click anywhere to restart',
      width/2,
      height/2 - 30
    );
    mario.remove();
    obstacleSprites.remove();
    groundSprites.remove();
    if (mouseIsPressed) {
      isGameOver = false;
      score = 0;
      background(150, 200, 250);
      groundSprites = new Group();
      numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;
      for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(
          n * 100,
          height - 10,
          GROUND_SPRITE_WIDTH,
          GROUND_SPRITE_HEIGHT
        );
        groundSprites.add(groundSprite);
      }
      mario = createSprite(50,height-90,50,50);
      mario.addAnimation("running", mario_running);
      mario.scale = 0.5;
      // Reset the game variables
      score = 0;
      isGameOver = false;
    }
  } else {
    background(150, 200, 250);
    mario.overlap(groundSprites, over);
    // let overlapDetected = obstacleSprites.overlap(mario, endGame);
    // console.log("Overlap detected:", overlapDetected);
    // if (groundSprites.overlap(mario)) {
    //   mario.velocity.y = 0;
    //   mario.position.y = (height-75) - (mario.height/2);
    //   console.log("check it");
    // };
    mario.addSpeed(0.25, 90);
    if (kb.presses('w')) {
      mario.velocity.y = JUMP;

      
      // mario.velocity.y -= GRAVITY;
    }    if (mario.position.y < 0) {
      mario.velocity.y = GRAVITY;
    }
    // if (key == "s") {
    //   mario.velocity.y = GRAVITY + 2;
    // }

    mario.position.x = mario.position.x + 5;
    camera.position.x = mario.position.x + width / 2;
    if (mario.position.x > width / 2) {
      mario.position.x = width / 2;
    }
    var firstGroundSprite = groundSprites[0];
    if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
      groundSprites.remove(firstGroundSprite);
      firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
      firstGroundSprite.position.y = height - 10;
      groundSprites.add(firstGroundSprite);
    }
    
    if (random() > 0.97) {
      var obstacle = createSprite(camera.position.x,random(100, height-50),50,50);
      obstacleSprites.add(obstacle);
    }

    for (var i = 0; i < obstacleSprites.length; i++) {
      obstacleSprites[i].position.x -= 5;
      obstacleSprites[i].overlap(mario, endGame);
    }
    for (var i = 0; i < groundSprites.length; i++) {
      groundSprites[i].position.x -= 5;
    }
    
    drawSprites();
    score = score + 1;
    textAlign(CENTER);
    text(score, camera.position.x - width / 2, 10);
  }
};

function endGame() {
  isGameOver = true;
  console.log("ii");
}



function over(mario, groundSprites) {
  mario.velocity.y = 0;
  mario.position.y = height - 90;
}

// function mouseClicked() {
//   if (isGameOver) {
//     // Reset the game variables
//     for (var n = 0; n < numGroundSprites; n++) {
//       var groundSprite = groundSprites[n];
//       groundSprite.position.x = n * 50;
//     }

//     mario.position.x = 50;
//     mario.position.y = height - 90;

//     obstacleSprites.removeSprites();

//     score = 0;
//     isGameOver = false;
//     console.log("weird");
//   }
// }
