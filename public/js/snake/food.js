import { onSnake, expandSnake } from './snake.js';
import { randomGridPosion } from './grid.js'
//import { currentUser as user , currentCategory } from './game.js'


let food = getRandomFoodPosition();
let demoFood = getRandomFoodPosition();
while (food.x === demoFood.x && food.y === demoFood.y) {
    demoFood = getRandomFoodPosition();
}
let demoFood2 = getRandomFoodPosition();
while ((food.x === demoFood2.x && food.y === demoFood2.y) || (demoFood.x === demoFood2.x && demoFood.y === demoFood2.y)) {
    demoFood = getRandomFoodPosition();
}


const EXPANSION_RATE = 1;
let randomNum = 0;
let demoFoodRandomNum = 1;
let demoFoodRandomNum2 = 2;
let wordsLen = 0;
let demoFoodWordsLen = 0;
var msg = new SpeechSynthesisUtterance();
let no_known_words = false;




export function update(words, knownWords) {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        randomNum = getRandomNum(wordsLen);

        demoFoodRandomNum = getRandomNum(demoFoodWordsLen);
        while (demoFoodRandomNum === randomNum)
            demoFoodRandomNum = getRandomNum(demoFoodWordsLen);

        demoFoodRandomNum2 = getRandomNum(demoFoodWordsLen);
        while (demoFoodRandomNum2 === demoFoodRandomNum || demoFoodRandomNum2 === randomNum)
            demoFoodRandomNum2 = getRandomNum(wordsLen);

        // speak 
        msg.text = words[randomNum].word;
        window.speechSynthesis.speak(msg);
        food = getRandomFoodPosition();
    }
    else {
        if (onSnake(demoFood) || onSnake(demoFood2)) {
            // make a message
            // hart rate goes down in one
            // word countdown --
        }
    }
}

export function draw(gameBoard, notStudiedWords, unknownWords, knownWords) {
    const foodWords = notStudiedWords.concat(unknownWords);
    const demoFoodWords = foodWords.concat(knownWords);
    wordsLen = foodWords.length;
    demoFoodWordsLen = demoFoodWords.length;

    createFoodElement(gameBoard, food, foodWords, randomNum)

    // const foodElement = document.createElement('div');
    // foodElement.style.gridRowStart = food.y;
    // foodElement.style.gridColumnStart = food.x;
    // foodElement.classList.add('food');
    // foodElement.innerHTML = foodWords[randomNum].translation;
    // gameBoard.appendChild(foodElement);
    /*------------------------------------------*/

    // if (knownWords.length === 0) {
    //     knownWords = notStudiedWords;
    //     no_known_words = true;
    // }

    createFoodElement(gameBoard, demoFood, demoFoodWords, demoFoodRandomNum);


    // const demoFoodElement = document.createElement('div');
    // demoFoodElement.style.gridRowStart = demoFood.y;
    // demoFoodElement.style.gridColumnStart = demoFood.x;
    // demoFoodElement.classList.add('food');
    // demoFoodElement.innerHTML = demoFoodWords[demoFoodRandomNum].translation;
    // gameBoard.appendChild(demoFoodElement);

    /*------------------------------------*/

    createFoodElement(gameBoard, demoFood2, demoFoodWords, demoFoodRandomNum2);

    // const demoFoodElement2 = document.createElement('div');
    // demoFoodElement2.style.gridRowStart = demoFood2.y;
    // demoFoodElement2.style.gridColumnStart = demoFood2.x;
    // demoFoodElement2.classList.add('food');
    // demoFoodElement2.innerHTML = demoFoodWords[demoFoodRandomNum2].translation;
    // gameBoard.appendChild(demoFoodElement2);
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

function createFoodElement(gameBoard, foodPos, foodWordsArray, randNum) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPos.y;
    foodElement.style.gridColumnStart = foodPos.x;
    foodElement.classList.add('food');
    foodElement.innerHTML = foodWordsArray[randNum].translation;
    gameBoard.appendChild(foodElement);
}