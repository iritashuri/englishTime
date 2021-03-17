var counter = 0 
if (document.URL.includes('cards')) {
    user = JSON.parse(user);
    
    console.log(user);
    var card_words = collect_word_list_for_cards(category,user.level)
    console.log(card_words);
    display_card()

    document.getElementById("next").addEventListener("click", function() {
        if (counter < card_words.length-1){
        counter++;
        console.log(counter)
        display_card()
        }
      });
    
    document.getElementById("prev").addEventListener("click", function() {
        if (counter !=0 ){
        counter--;
        console.log(counter)
        display_card()
        }
      });
    
    document.getElementById("speak").addEventListener("click", function() {
        var msg = new SpeechSynthesisUtterance();
        msg.text = card_words[counter]['word'];
        window.speechSynthesis.speak(msg);
      });
}




  function display_card(){
    var word_text = document.createTextNode(card_words[counter]['word']);
    var translation_text = document.createTextNode(card_words[counter]['translation']);
    var back_card = document.getElementById("headline-back");
    var front_card = document.getElementById("headline-front");
    front_card.innerHTML = '';
    back_card.innerHTML = '';
    front_card.appendChild(word_text);
    back_card.appendChild(translation_text);
  }

function collect_word_list_for_cards(catagory,level){
    var not_studied_array = find_catagory_in_not_studied(catagory,level)
    var known_array =  find_catagory_in_known(catagory,level)
    var unknown_array = find_catagory_in_unknown(catagory,level)
    return not_studied_array.concat(known_array.concat(unknown_array))
}

function find_catagory_in_not_studied(catagory,level){
    var listOfWords =[]
    user.words.not_studied.forEach(element => {
        if (element['catagory'] == catagory && element['level'] == level){
            listOfWords.push(element)
        }
    });
    return listOfWords;
}

function find_catagory_in_known(catagory,level){
    var listOfWords =[]
    user.words.known.forEach(element => {
        if (element['catagory'] == catagory && element['level'] == level){
            listOfWords.push(element)
        }
    });
    return listOfWords;
}

function find_catagory_in_unknown(catagory,level){
    var listOfWords =[]
    user.words.unknown.forEach(element => {
        if (element['catagory'] == catagory && element['level'] == level){
            listOfWords.push(element)
        }
    });
    return listOfWords;
}