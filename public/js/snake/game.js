
user = JSON.parse(user);
// console.log(category);
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js'

// export const currentUser = JSON.parse(user);
// export const currentCategory = category;

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
let allWords = [];
let categoryNotStudiedWords = [];
let categoryKnownWords = [];
let categoryUnknownWords = [];
let first_step = true;
localStorage.setItem('first_step', first_step);

// Find all words in the same category and level
getCategoryWords('not_studied', categoryNotStudiedWords);
getCategoryWords('unknown', categoryUnknownWords);
getCategoryWords('known', categoryKnownWords);

function main(currentTime) {
    if (gameOver) {
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
    updateFood(categoryNotStudiedWords, categoryKnownWords);
    checkForDeath();
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard);
    drawFood(gameBoard, categoryNotStudiedWords, categoryUnknownWords, categoryKnownWords);
}


function checkForDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function getCategoryWords(type, aarray) {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    console.log(current_user.words);
    current_user.words[type].forEach(word => {
        if (word.level === current_user.level && word.catagory === localStorage.getItem('category'))
            aarray.push(word);
    });
}



