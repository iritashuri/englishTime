if (document.URL.includes('card-game')) {
  user = JSON.parse(user);
  console.log(category);
  var hero;
  var missiles = [];
  var enemies=[];

  function start_game(){
    score=0;
    life=4;
     hero = {
        left: 575,
        top: 700
    };

     missiles = [];
     restart_enemies();
     
  }

  function restart_enemies(){
    enemies = [
      { left: 200, top: 100 },
     // { left: 300, top: 100 },
     // { left: 400, top: 100 },
     // { left: 500, top: 100 },
      { left: 600, top: 100 },
      //{ left: 700, top: 100 },
      //{ left: 800, top: 100 },
      { left: 900, top: 100 },
  ];
  }

    document.onkeydown = function(e) {
        if (e.keyCode === 37 && hero.left>0) {
            // Left
            hero.left = hero.left - 20;
        }
        if (e.keyCode === 39 && hero.left<1150) {
            // Right
            hero.left = hero.left + 20;
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
          document.getElementById('enemies').innerHTML +=
           `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'>`+user.name+`</div>`;
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
                  console.log(enemies)
                  console.log(missiles)
                  score++;
                  console.log(score);

              }
          }
      }
  }

  function check_game(timeout){
      if(enemies[0].top > 650 && life>0){
        console.log('inside2')
        life--;
        restart_enemies();
        console.log("life: "+life);
        if(life==0){
          alert("Game Over");
          clearTimeout(timeout);
          start_game();
          gameLoop();
        }
          

      }

  }

  function all_enemie_dead(){
    if(enemies.length==0){
      restart_enemies()
    }
  }

  function gameLoop() {
      var timeout= setTimeout(gameLoop, 50)
      all_enemie_dead();
      moveMissiles();
      drawMissiles();
      moveEnemies();
      check_game(timeout);
      drawEnemies();
      collisionDetection();
  }

  var gameover=0;
  var score;
  var life;
  start_game()
  alert("start game");
  gameLoop()


}
