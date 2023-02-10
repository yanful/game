var groundSprites;
var GROUND_SPRITE_WIDTH = 100;
var GROUND_SPRITE_HEIGHT = 100;
var numGroundSprites;
var GRAVITY = 0.3;
var numGroundSprites;
var mario, mario_running;
var JUMP = -5;
var obstacleSprites;
var isGameOver;
var score;

window.preload = () => {
  mario_running = loadAnimation("Capture1.png","Capture3.png","Capture4.png");
}
window.setup= () => {
  isGameOver = false;
  score = 0;
  createCanvas(1000, 500);
  background(150, 200, 250);
  groundSprites = new Group();
  numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;
  for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(
      n * 100,
      height - 10,
      GROUND_SPRITE_WIDTH,
      GROUND_SPRITE_HEIGHT
    )
    groundSprites.add(groundSprite);
  }
  mario = createSprite(50,400,20,410);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.5;
  obstacleSprites = new Group();
}
window.draw = () => {
  if (isGameOver) {
    background(0)
    fill(255)
    textAlign(CENTER)
    text('Your score was: ' + score, camera.position.x, camera.position.y - 20)
    text(
      'Game Over! Click anywhere to restart',
      camera.position.x,
      camera.position.y
    )
  } else {
    background(150, 200, 250);
    mario.velocity.y = mario.velocity.y + GRAVITY;
    if (groundSprites.overlap(mario)) {
      mario.velocity.y = 0
      mario.position.y = height - 50 - mario.height / 2
    }
    if (key == 'w') {
      mario.velocity.y = JUMP;
    } 

    mario.position.x = mario.position.x + 5;
    camera.position.x = mario.position.x + width / 4;
    var obstacle = createSprite(
      camera.position.x + width,
      random(0, height - 70),
      60,
      60
    )
    var firstObstacle = obstacleSprites[0];
    if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
      groundSprites.remove(firstGroundSprite);
      firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
      groundSprites.add(firstGroundSprite);
    }
    
    if (random() > 0.95) {
      var obstacle = createSprite(
        camera.position.x + width, random(0, (height-50)-15), 30, 30
      );
      obstacleSprites.add(obstacle)
    }


    var firstGroundSprite = groundSprites[0]
    if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
      removeSprite(firstObstacle);
    }
    obstacleSprites.overlap(mario, endGame);
    drawSprites();
    score = score + 1;
    textAlign(CENTER);
    text(score, camera.position.x, 10);
  }
}

function endGame() {
  isGameOver = true;
}

function mouseClicked() {
  if (isGameOver) {
      
    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n*50;
    }

    mario.position.x = 100;
    mario.position.y = height-75;

    obstacleSprites.removeSprites();
    
    score = 0;
    isGameOver = false;
  }
}


