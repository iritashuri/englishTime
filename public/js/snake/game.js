
user = JSON.parse(user);
// Set games counter to 0;
localStorage.setItem('gamesCounter', 0);
// console.log(category);
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js'
import { drowHearts } from './game-page.js'
import { categoryAndLevelStateMachine } from '../words_update.js'


let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
let allWords = [];
let categoryNotStudiedWords = [];
let categoryKnownWords = [];
let categoryUnknownWords = [];
let firstStep = true;
localStorage.setItem('first_step', firstStep);
let heartRate = 3;
localStorage.setItem('heart_rate', heartRate);
let gameOverSound = new Audio('/sounds/game-over.wav');



// Find all words in the same category and level
getCategoryWords('not_studied', categoryNotStudiedWords);
getCategoryWords('unknown', categoryUnknownWords);
getCategoryWords('known', categoryKnownWords);

document.getElementById("speaker").addEventListener("click", function () {
    var msg = new SpeechSynthesisUtterance();
    msg.text = localStorage.getItem('current_word');
    window.speechSynthesis.speak(msg);
});


document.body.onkeyup = (e) => {
    if (e.keyCode == 32) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = localStorage.getItem('current_word');
        window.speechSynthesis.speak(msg);
    }
}

function main(currentTime) {
    if (gameOver) {
        categoryAndLevelStateMachine(localStorage.getItem('current_user'));
        updateUserInMongo();
        setTimeout(gameOverSound.play(), 200000);
        if (confirm(' כדי להתחיל מחדש OK הפסדת , לחץ ')) {
            window.location = '/games/snake';
        }
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    update()
    draw()
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood(categoryNotStudiedWords.concat(getCategoryWords), user);
    checkForDeath();
    heartRate = localStorage.getItem('heart_rate');
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard);
    drawFood(gameBoard, categoryNotStudiedWords, categoryUnknownWords, categoryKnownWords);
    drowHearts(heartRate);
}


function checkForDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || localStorage.getItem('heart_rate') == 0;
}

function getCategoryWords(type, aarray) {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    console.log(current_user.words);
    current_user.words[type].forEach(word => {
        if (word.level === current_user.level && word.catagory === localStorage.getItem('category'))
            aarray.push(word);
    });
}

function updateUserInMongo() {
    var current_user = localStorage.getItem('current_user');
    const option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: current_user
    };
    fetch('/games/todos', option);
}

