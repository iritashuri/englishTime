import { onSnake, expandSnake, onSnake2 } from './snake.js';
import { randomGridPosion } from './grid.js'
//import { currentUser as user , currentCategory } from './game.js'
import { reduseWordCounter, increaseWordCounter } from '../words_update.js'
import { goodJobMessage, ExalentMessage, keepGoingMessage } from '../messages.js'



let food = getRandomFoodPosition();
let demoFood = getRandomFoodPosition();
while (food.x === demoFood.x && food.y === demoFood.y) {
    demoFood = getRandomFoodPosition();
}
let demoFood2 = getRandomFoodPosition();
while ((food.x === demoFood2.x && food.y === demoFood2.y) || (demoFood.x === demoFood2.x && demoFood.y === demoFood2.y)) {
    demoFood = getRandomFoodPosition();
}
let eatingSound = new Audio('/sounds/eating.mp3');


const EXPANSION_RATE = 1;
let randomNum = 0;
let demoFoodRandomNum = 1;
let demoFoodRandomNum2 = 2;
let wordsLen = 0;
let demoFoodWordsLen = 0;
let msg = new SpeechSynthesisUtterance();
let no_known_words = false;
let first_step = localStorage.getItem('first_step');

let failSound = new Audio('/sounds/fail.wav');

let counter = 0;

export function update(words, user) {
    if (onSnake(food)) {
        eatingSound.play();
        if (counter == 0)
            counter++;
        if (counter <= 1) {
            goodJobMessage();
            counter++;
        } else if (counter > 1) {
            ExalentMessage();
        }
        if (!first_step)
            increaseWordCounter(words[randomNum], user);
        expandSnake(EXPANSION_RATE);
        randomNum = getRandomNum(wordsLen);

        demoFoodRandomNum = getRandomNum(demoFoodWordsLen);
        while (demoFoodRandomNum === randomNum)
            demoFoodRandomNum = getRandomNum(demoFoodWordsLen);

        demoFoodRandomNum2 = getRandomNum(demoFoodWordsLen);
        while (demoFoodRandomNum2 === demoFoodRandomNum || demoFoodRandomNum2 === randomNum)
            demoFoodRandomNum2 = getRandomNum(wordsLen);

        first_step = false;
        localStorage.setItem('first_step', first_step);
        // speak 
        msg.text = words[randomNum].word;
        setTimeout(function () { window.speechSynthesis.speak(msg) }, 500);
        food = getRandomFoodPosition();
        demoFood = getRandomFoodPosition();
        demoFood2 = getRandomFoodPosition();
    }
    else {
        if (onSnake2(demoFood) || onSnake2(demoFood2)) {
            keepGoingMessage();
            updateHeartRate();
            if (!first_step)
                reduseWordCounter(words[randomNum], user);
            first_step = false;
            localStorage.setItem('first_step', first_step);
        }
    }
}

export function draw(gameBoard, notStudiedWords, unknownWords, knownWords) {
    const foodWords = notStudiedWords.concat(unknownWords);
    const demoFoodWords = foodWords.concat(knownWords);
    wordsLen = foodWords.length;
    demoFoodWordsLen = demoFoodWords.length;

    if (first_step) {
        createFoodElement(gameBoard, food, "<img src='/img/start.png'>");
    }
    else {
        createFoodElement(gameBoard, food, foodWords[randomNum].translation);
        localStorage.setItem('current_word', foodWords[randomNum].word);
        createFoodElement(gameBoard, demoFood, demoFoodWords[demoFoodRandomNum].translation);
        createFoodElement(gameBoard, demoFood2, demoFoodWords[demoFoodRandomNum2].translation);
    }
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

function createFoodElement(gameBoard, foodPos, wordInnerHtml) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPos.y;
    foodElement.style.gridColumnStart = foodPos.x;
    foodElement.classList.add('food');
    foodElement.innerHTML = "<img src='/img/dot.png'><br>";
    foodElement.innerHTML += wordInnerHtml;
    gameBoard.appendChild(foodElement);
}

function updateHeartRate() {
    let heart_rate = localStorage.getItem('heart_rate');
    heart_rate--;
    localStorage.setItem('heart_rate', heart_rate);
    if (heart_rate != 0)
        failSound.play();
}