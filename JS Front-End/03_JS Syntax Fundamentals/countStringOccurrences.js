function solve(text, searchedWord) {
    let count = 0;
    let textArr = text.split(' ')
    for (let word of textArr) {
        if (word === searchedWord) {
            count += 1;
        }
    }
    console.log(count)
}

solve('This is a word and it also is a sentence', 'is');
solve ('softuni is great place for learning new programming languages', 'softuni');