import { reduseWordCounter, increaseWordCounter } from './words_update.js'

if (document.URL.includes('card-game')) {
  user = JSON.parse(user);
  console.log(category);
  var hero;
  var missiles = [];
  var enemies=[];

  
    var categoryNotStudiedWords = [];
    var categoryKnownWords = [];
    var categoryUnknownWords = [];
    var words_to_show=[];
    var score;
    var life;
    var real_word;
    var demo_words=[];
    var msg = new SpeechSynthesisUtterance();
    init_words_from_db()
  
    document.getElementById("speaker").addEventListener("click", function () {
      window.speechSynthesis.speak(msg);
    });
  
    //alert("start game");
  document.getElementById("play").addEventListener("click", function () {
      start_game()
      gameLoop()
  
  });


  
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
  

  function start_game(){
    score=0;
    document.getElementById("points").innerHTML =score;
    life=4;
    document.getElementById("life").innerHTML =life-1;
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
              if(enemies[enemy].word===real_word.translation){
                score++;
                increaseWordCounter(real_word, user);
                document.getElementById("points").innerHTML =score;
                reset_game=1;

              }else{
                life--;
                document.getElementById("life").innerHTML =life-1;
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
        document.getElementById("life").innerHTML =life-1;
        restart_enemies();
        console.log("life: "+life);
      }

      if(life<=0){
        alert(" כדי להתחיל מחדש OK הפסדת , לחץ");
        test();
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


function init_words(){
  demo_words=[];
  var words_index_in_db=[];
  var words_4_game=[];
  var rand=Math.floor(Math.random() * words_to_show.length);
  words_index_in_db.push(rand);

  var rand1=Math.floor(Math.random() * words_to_show.length);
  var rand2=Math.floor(Math.random() * words_to_show.length);

  while(words_index_in_db.includes(rand1) || words_index_in_db.includes(rand2)|| rand1==rand2){
     rand1=Math.floor(Math.random() * words_to_show.length);
     rand2=Math.floor(Math.random() * words_to_show.length);

  }
  words_index_in_db.push(rand1,rand2);

  for(var i=0;i<words_index_in_db.length;i++){
    words_4_game.push(words_to_show[words_index_in_db[i]]);
    enemies[i].word=words_4_game[i].translation;
  }

  console.log("nums1: "+JSON.stringify(words_4_game));

  var real_word_index=Math.floor(Math.random() * words_4_game.length)
  real_word=words_4_game[real_word_index];
  localStorage.setItem("current_word:",real_word.translation);
  msg.text=real_word.word;
  window.speechSynthesis.speak(msg);
  console.log("real: "+real_word.word+real_word.translation);
    console.log("demo: "+demo_words);
}
  function getCategoryWords(type, aarray) {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    console.log(current_user.words);
    current_user.words[type].forEach(word => {
        if (word.level === current_user.level && word.catagory === localStorage.getItem('category'))
            aarray.push(word);
    });
}

function init_words_from_db(){
  getCategoryWords('unknown', categoryUnknownWords);
  getCategoryWords('known', categoryKnownWords);
  getCategoryWords('not_studied', categoryNotStudiedWords);
  words_to_show=categoryNotStudiedWords.concat(categoryUnknownWords);
  console.log(words_to_show);
}
function update_db_user(){

    var myquery = { email: user.email };
    var newvalues = { $set: {words: user.words} };
    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated"); 
      db.close();
    });

}

function test(){
  /*
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/games/todos', true);
  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(JSON.stringify(user));
  */
 user = localStorage.getItem('current_user');


    const option = {
      method: 'POST',
      Headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
      
      fetch('/games/todos',option);
    


  }
}