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
    let i = 0;
    for (const current_word in words_array) {
        if (current_word.word === word.word) {
            if (op === '+') {
                if (word.counter < 3) {
                    current_word.counter++;
                    if (current_word.counter === 3)
                        moveWord(words_array, user.words.known, current_word, i);
                }

            }

            else {
                if (word.counter >= 0) {
                    current_word.counter--;
                    if (current_word.counter === 0)
                        moveWord(words_array, user.words.unknown, current_word, i);
                }
            }

            //update local storage
            localStorage.setItem('current_user', user);
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