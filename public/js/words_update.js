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
            // Check how many words was success in the category and check if its was finished  
            // Give a message accordingley  
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