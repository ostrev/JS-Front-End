function solve(text, word) {
    let censored = '*'.repeat(word.length);
    let result = text.replace(word, censored);
    while (result.includes(word)) {
        result = result.replace(word, censored);
    }
    console.log(result)
}

solve('A small sentence with small some words', 'small')