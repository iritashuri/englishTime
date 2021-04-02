if (document.URL.includes('card-game')) {
  user = JSON.parse(user);
  console.log(category);
  var hero;
  var missiles = [];
  var enemies=[];

  function start_game(){
     hero = {
        left: 575,
        top: 700
    };

     missiles = [];

     enemies = [
        { left: 200, top: 100 },
        { left: 300, top: 100 },
        { left: 400, top: 100 },
        { left: 500, top: 100 },
        { left: 600, top: 100 },
        { left: 700, top: 100 },
        { left: 800, top: 100 },
        { left: 900, top: 100 },
    ];
  }

    document.onkeydown = function(e) {
        if (e.keyCode === 37) {
            // Left
            hero.left = hero.left - 10;
        }
        if (e.keyCode === 39) {
            // Right
            hero.left = hero.left + 10;
        }
        if (e.keyCode === 32) {
            // Spacebar (fire)
            missiles.push({
                left: hero.left + 20,
                top: hero.top - 20 
            });
            drawMissiles()
        }
        drawHero();
    }
  

  function drawHero() {
      document.getElementById('hero').style.left = hero.left + 'px';
      document.getElementById('hero').style.top = hero.top + 'px';
  }

  function drawMissiles() {
      document.getElementById('missiles').innerHTML = ""
      for(var i = 0 ; i < missiles.length ; i++ ) {
          document.getElementById('missiles').innerHTML += `<div class='missile1' style='left:${missiles[i].left}px; top:${missiles[i].top}px'></div>`;
      }
  }

  function moveMissiles() {
      for(var i = 0 ; i < missiles.length ; i++ ) {
          missiles[i].top = missiles[i].top - 8
      }
  }

  function drawEnemies() {
      document.getElementById('enemies').innerHTML = ""
      for(var i = 0 ; i < enemies.length ; i++ ) {
          document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
      }
  }

  function moveEnemies() {
      for(var i = 0 ; i < enemies.length ; i++ ) {
          enemies[i].top = enemies[i].top + 1;
      }
  }

  function collisionDetection() {
      for (var enemy = 0; enemy < enemies.length; enemy++) {
          for (var missile = 0; missile < missiles.length; missile++) {
              if ( 
                  missiles[missile].left >= enemies[enemy].left  &&
                  missiles[missile].left <= (enemies[enemy].left + 50)  &&
                  missiles[missile].top <= (enemies[enemy].top + 50)  &&
                  missiles[missile].top >= enemies[enemy].top
              ) {
                  enemies.splice(enemy, 1);
                  missiles.splice(missile, 1);
              }
          }
      }
  }

  function check_game(ti){
      if(enemies[0].top > 650){
        console.log('inside2')
        alert("Game Over");
        clearTimeout(ti);
        start_game();
        gameLoop();
          

      }

  }

  function gameLoop() {
      var ti= setTimeout(gameLoop, 5)
      moveMissiles();
      drawMissiles();
      moveEnemies();
      check_game(ti);
      drawEnemies();
      collisionDetection();
  }

  var gameover=0;
  start_game()
  gameLoop()


}
