function wordsTracker(input) {
    let searchedWords = {};
    for (let searched of input.shift().split(' ')) {
        let filteredInput = input.filter((w) => searched == w);
        searchedWords[searched] = filteredInput.length
    };
    
    let sortedWords = Object.entries(searchedWords)
    .sort((arrayA, arrayB) =>{
        let [nameA, countA] = arrayA;
        let [nameB, countB] = arrayB;
        return countB - countA;
    })

    sortedWords
        .forEach((word) => console.log(`${word[0]} - ${word[1]}`));
}

wordsTracker([
    'this sentence', 
    'In', 'this', 'sentence', 'you', 'have', 'to', 'count', 'the', 'occurrences', 'of', 'the', 'words', 'this', 'and', 'sentence', 'because', 'this', 'is', 'your', 'task'
    ]);

wordsTracker([
    'is the', 
    'first', 'sentence', 'Here', 'is', 'another', 'the', 'And', 'finally', 'the', 'the', 'sentence']);