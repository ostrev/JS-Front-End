function stringSubstring(word, text) {
    // `${word}`
    let pattern = new RegExp('\\b' + word + '\\b' , "ig");
    let result = text.match(pattern);
    
    if (result) {
        console.log(`${word}`)
    } else {
        console.log(`${word} not found!`)
    }
    
}
stringSubstring('python', ' Python python JavaScript is the best programming language');
stringSubstring('javascript', 'JavaScript is the best programming language');
stringSubstring('python', 'python is the best programming language');