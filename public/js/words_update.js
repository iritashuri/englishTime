
export function categoryAndLevelStateMachine(user) {
    let gamesCounter = localStorage.getItem('gamesCounter');
    // Get all category known words
    let knownCategory = [];
    const currentCategory = localStorage.getItem('category');

    user.words.known.forEach(word => {
        if (word.catagory === currentCategory)
            knownCategory.push(word);
    });

    // Check what is the precent of the known words 
    switch (gamesCounter) {
        case 1:
            // Go to next stage in the statmnt machine
            if (knownCategory.length >= 7) {
                localStorage.setItem('gamesCounter', gamesCounter + 1);
            }
            break;
        case 2:
            // Go to next stage in the statmnt machine
            if (knownCategory.length >= 8) {
                localStorage.setItem('gamesCounter', gamesCounter + 1);
            }
            break;
        case 3:
            // Go to next stage in the statmnt machine
            if (knownCategory.length >= 9) {
                localStorage.setItem('gamesCounter', gamesCounter + 1);
            }
            break;
        default:
            // Accepting status - open more categories to the user if he pass
            if (knownCategory.length >= 9) {
                if (user.categories.includes('personality')) {
                    user.categories.push('animals');
                } else if (user.categories.includes('animals')) {
                    user.categories.push('nature');
                    user.categories.push('clothes');
                } else if (user.categories.includes('nature')) {
                    user.categories.push('food');
                } else if (user.categories.includes('food')) {
                    user.categories.push('education');
                    user.categories.push('activites');
                } else if (user.categories.includes('education')) {
                    // Go up in the level
                    user.level = 'A2';
                }

            }
            break;
    }
    // Update local storage
    localStorage.setItem('current_user', JSON.stringify(user));
    return true;

}

export function reduseWordCounter(word, user) {
    counterChange('-', word, user.words.not_studied, user);
    counterChange('-', word, user.words.unknown, user);
    counterChange('-', word, user.words.known, user);



}


export function increaseWordCounter(word, user) {
    counterChange('+', word, user.words['not_studied'], user);
    counterChange('+', word, user.words['unknown'], user);
    counterChange('+', word, user['words.known'], user);
    //localStorage.setItem('current_user', user);
}


function counterChange(op, word, words_array, user) {

    //localStorage.setItem('gamesCounter', gamesCounter);
    let i = 0;
    for (const current_word in words_array) {
        if (words_array[current_word].word === word.word) {
            if (op === '+') {
                if (word.counter < 3) {
                    words_array[current_word].counter++;
                    if (words_array[current_word].counter === 3)
                        moveWord(words_array, user.words.known, words_array[current_word], i);
                }

            }

            else {
                if (word.counter >= 0) {
                    words_array[current_word].counter--;
                    if (words_array[current_word].counter === 0)
                        moveWord(words_array, user.words.unknown, words_array[current_word], i);
                }
            }

            // Give a message 

            // Update local storage
            localStorage.setItem('current_user', JSON.stringify(user));
            return true;
        }
        i++;
    }
    return false;
}

function moveWord(from, to, word, index) {
    from.splice(index, 1);
    to.push(word);
}