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
      { left: 200, top: 100 ,word:0},
     // { left: 300, top: 100 },
     // { left: 400, top: 100 },
     // { left: 500, top: 100 },
      { left: 600, top: 100 ,word:0},
      //{ left: 700, top: 100 },
      //{ left: 800, top: 100 },
      { left: 900, top: 100 ,word:0},
  ];
    demo_words=[];
    //choose_random_enemy();
    init_words();
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
        `<div class='enemy' id=${'enemy-'+i} style='left:${enemies[i].left}px; top:${enemies[i].top}px'>${enemies[i].word}</div>`;
      }
    document.getElementById("enemies").style.color = "red";
  }
     
  

  function moveEnemies() {
      for(var i = 0 ; i < enemies.length ; i++ ) {
          enemies[i].top = enemies[i].top + 1;
      }
  }

  function collisionDetection() {
      for (var enemy = 0; enemy < enemies.length; enemy++) {
          for (var missile = 0; missile < missiles.length; missile++) {
          var reset_game=0;
            if ( 
                missiles[missile].left >= enemies[enemy].left  &&
                missiles[missile].left <= (enemies[enemy].left + 50)  &&
                missiles[missile].top <= (enemies[enemy].top + 50)  &&
                missiles[missile].top >= enemies[enemy].top
            ) {
              if(enemies[enemy].word===real_word){
                score++;
                reset_game=1;

              }else{
                life--;
                console.log(life)
              }
                enemies.splice(enemy, 1);
                missiles.splice(missile, 1);
                if(reset_game){// condition to restart the game if choose the right word
                  restart_enemies();
                }
                console.log("score: "+score);

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
      }

      if(life<=0){
        alert(" כדי להתחיל מחדש OK הפסדת , לחץ");
        clearTimeout(timeout);
        start_game();
        gameLoop();
      }
  }

  function all_enemies_dead(){
    if(enemies.length==0){
      restart_enemies()
    }
  }
/*
  function choose_random_enemy(){
    init_words();
    word_location=Math.floor(Math.random() * enemies.length);
    enemies[word_location].word=real_word;
    for(var j=0;j<enemies.length-1;j++){
      for (var i=0;i<enemies.length;i++){
        if(enemies[i].word !== 0){
          enemies[i].word=demo_words[j];
        }
      }
    }
  }
*/
function init_words(){
  demo_words=[];
  var word_list=['bingo','afeka','shit','fun','day','me','you',"go","no","maybe"];
  var words_index_in_db=[];
  var words_4_game=[];
  var rand=Math.floor(Math.random() * word_list.length);
  console.log("0: "+rand);
  words_index_in_db.push(rand);

  var rand1=Math.floor(Math.random() * word_list.length);
  console.log("1: "+rand1);
  var rand2=Math.floor(Math.random() * word_list.length);
  console.log("2: "+rand2);
  console.log(words_index_in_db.includes(rand1));
  console.log(words_index_in_db.includes(rand2));
  while(words_index_in_db.includes(rand1) || words_index_in_db.includes(rand2)|| rand1==rand2){
     rand1=Math.floor(Math.random() * word_list.length);
     rand2=Math.floor(Math.random() * word_list.length);

  }
  words_index_in_db.push(rand1,rand2);

  for(var i=0;i<words_index_in_db.length;i++){
    words_4_game.push(word_list[words_index_in_db[i]]);
    enemies[i].word=words_4_game[i];
    console.log("?: "+words_4_game[i]);
  }

  console.log("nums: "+words_index_in_db);
  console.log("nums: "+words_4_game);
  
  var real_word_index=Math.floor(Math.random() * words_4_game.length)
  real_word=words_4_game[real_word_index];
  msg.text=real_word;
  window.speechSynthesis.speak(msg);
  console.log("real: "+real_word);

  /*console.log("real: "+real_word);
    for (var i=0;i<enemies.length-1;i++){
      //demo_words.splice(i,0,choose_random_word_from_db());
      demo_words.push(word_list[words_index_in_db[i+1]])
    }*/
    console.log("demo: "+demo_words);
}

  function gameLoop() {
      var timeout= setTimeout(gameLoop, 50)
      all_enemies_dead();
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
  var word_location;
  var rand;
  var real_word;
  var demo_words=[];
  var msg = new SpeechSynthesisUtterance();


  document.getElementById("speaker").addEventListener("click", function () {
    window.speechSynthesis.speak(msg);
  });

  //alert("start game");
document.getElementById("play").addEventListener("click", function () {
    start_game()
    gameLoop()

});




}
