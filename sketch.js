var percy;
var percyImg;
var enemyImg;
var enemys = [];
var dropImg;
var drops = [];
var enemySound;
var dropSound;
var gameOverSound;
var victorySound;
var gameSound;
var score = 0;
var bulletsLeft = 40;
var playing = true;

function preload() {
  percyImg = loadImage('img_percy.png');
  enemyImg = loadImage('img_enemy.png');
  dropImg = loadImage('drop.png');
  enemySound = loadSound('/EnemyWasHit.wav');
  dropSound = loadSound('PlayerDidFire.wav');
  gameOverSound = loadSound('gameOver.wav');
  victorySound = loadSound('victory.mp3');
  gameSound = loadSound('game_sound.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gameSound.loop();

  percy = new Percy();
  for (var i = 0; i < 6; i++) {
    enemys[i] = new Enemy(((width - 570) / 2) + i * 80 + 80, 80);
  }
  for (var i = 6; i < 12; i++) {
    enemys[i] = new Enemy(((width - 570) / 2) + (i - 6) * 80 + 80, 160);
  }
  for (var i = 12; i < 18; i++) {
    enemys[i] = new Enemy(((width - 570) / 2) + (i - 12) * 80 + 80, 240);
  }
}

function draw() {
  if (playing === true) {
    background(4, 3, 17);

    var edge = false;
    var gameOver = false;

    fill(255, 255, 255);

    textSize(20);
    text("Score " + score, 50, 50);

    fill(255, 255, 255);
    textSize(20);
    text("Bullets " + bulletsLeft, width - 150, 50);

    for (var i = 0; i < enemys.length; i++) {
      enemys[i].show();
      enemys[i].move();
      if ((enemys[i].x + 20) > width || (enemys[i].x - 20 < 0)) {
        edge = true;
      }
      if ((enemys[i].y > (height - 160)) || bulletsLeft < 1) {
        gameOver = true;
      }

      if (edge) {
        for (var i = 0; i < enemys.length; i++) {
          enemys[i].shiftDown();
        }
      }

      if (gameOver) {
        noLoop();
        gameOverSound.play();
        fill(255, 255, 255);
        textSize(30);
        textAlign(CENTER);
        text("Don't feel bad, I'm usually about to die.", width / 2, height / 2);
      }
    }

    percy.show();
    percy.move();
    for (var i = 0; i < drops.length; i++) {
      drops[i].show();
      drops[i].move();
      for (var j = 0; j < enemys.length; j++) {
        if (drops[i].hits(enemys[j])) {
          drops[i].destroy1();
          enemys[j].destroy2();
        }
      }
    }

    for (var i = drops.length - 1; i >= 0; i--) {
      if (drops[i].toDelete) {
        drops.splice(i, 1);
      }
    }

    for (var j = enemys.length - 1; j >= 0; j--) {
      if (enemys[j].toDelete1) {
        enemys.splice(j, 1);
        enemySound.play();
        score += 1;
        if (score > 17) {
          fill(255, 255, 255);
          textSize(30);
          textAlign(CENTER);
          text("Looks like the sea does not like to be restrained.", width / 2, height / 2);
          victorySound.play();
          noLoop();
        }
      }
    }
  }
}
function touchEnded() {
  playing = !playing;
}

function keyReleased() {
  if (keyCode !== 32) {
    percy.setDir(0);
  }
}

function keyPressed() {
  if (keyCode === 32 && bulletsLeft > 0) {
    var drop = new Drop(percy.x, height - 70);
    drops.push(drop);
    dropSound.play();
    bulletsLeft--;
  }

  if (keyCode === RIGHT_ARROW) {
    percy.setDir(1);
  }
  else if (keyCode === LEFT_ARROW) {
    percy.setDir(-1);
  }
}
