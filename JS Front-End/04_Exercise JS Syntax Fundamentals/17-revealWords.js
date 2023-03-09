function revealNumbers(wordsAsStr, text) {
    
    let words = wordsAsStr.split(', ')

    words.sort(function(a, b){
        return b.length - a.length
    });

    for (const word of words) {
        let censored = '*'.repeat(word.length);
        let result = text.replace(censored, word);
        while (result.includes(censored)) {
            result = result.replace(censored, word);
        }
        text = result
        
    }
    console.log(text)
}

revealNumbers('great', 'softuni is ***** place for learning new programming languages');
revealNumbers('great, learning', 'softuni is ***** place for ******** new programming languages');

