import { onSnake, expandSnake } from './snake.js';
import { randomGridPosion } from './grid.js'
//import { currentUser as user , currentCategory } from './game.js'


let food = getRandomFoodPosition();
let secondFood = getRandomFoodPosition();
while (food.x === secondFood.x && food.y === secondFood.y) {
    secondFood = getRandomFoodPosition();
}
let thirdFood = getRandomFoodPosition();
while ((food.x === thirdFood.x && food.y === thirdFood.y) || (secondFood.x === thirdFood.x && secondFood.y === thirdFood.y)) {
    secondFood = getRandomFoodPosition();
}

const EXPANSION_RATE = 1;
let randomNum = 0;
let secondRandomNum = 1;
let thirdRandomNum = 2;
let wordsLen = 0;
let knownWordsLen = 0;
var msg = new SpeechSynthesisUtterance();
let no_known_words = false;




export function update(words, knownWords) {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        randomNum = getRandomNum(wordsLen);

        secondRandomNum = getRandomNum(knownWordsLen);
        if (no_known_words && secondRandomNum === randomNum) {
            secondRandomNum = getRandomNum(wordsLen);
            while (secondRandomNum === randomNum)
                secondRandomNum = getRandomNum(knownWordsLen);
        }


        thirdRandomNum = getRandomNum(knownWordsLen);
        if (!no_known_words) {
            thirdRandomNum = getRandomNum(wordsLen);
            while (thirdRandomNum === secondRandomNum || thirdRandomNum === randomNum)
                thirdRandomNum = getRandomNum(wordsLen);
        }
        else {
            while (thirdRandomNum === secondRandomNum)
                thirdRandomNum = getRandomNum(knownWordsLen);
        }

        msg.text = words[randomNum].word;
        window.speechSynthesis.speak(msg);
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard, words, knownWords) {
    wordsLen = words.length;
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    foodElement.innerHTML = words[randomNum].translation;
    gameBoard.appendChild(foodElement);
    /*------------------------------------------*/
    let no_known_words = false;
    if (knownWords.length == 0) {
        knownWords = words;
        no_known_words = true;
    }
    knownWordsLen = knownWords.length !== 0 ? knownWords.length : words.length;
    const secondfoodElement = document.createElement('div');
    secondfoodElement.style.gridRowStart = secondFood.y;
    secondfoodElement.style.gridColumnStart = secondFood.x;
    secondfoodElement.classList.add('food');
    secondfoodElement.innerHTML = knownWords[secondRandomNum].translation;
    gameBoard.appendChild(secondfoodElement);
    /*------------------------------------*/
    const thirdfoodElement = document.createElement('div');
    thirdfoodElement.style.gridRowStart = thirdFood.y;
    thirdfoodElement.style.gridColumnStart = thirdFood.x;
    thirdfoodElement.classList.add('food');
    thirdfoodElement.innerHTML = knownWords[thirdRandomNum].translation;
    gameBoard.appendChild(thirdfoodElement);
}


function getRandomNum(len) {
    return Math.floor(Math.random() * Math.floor(len));
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosion();
    }
    return newFoodPosition;
}
