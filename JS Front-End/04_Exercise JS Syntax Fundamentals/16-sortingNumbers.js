function sortingNumbers(numbers) {
    let sortedNumbers = [...numbers].sort((a, b) => {
        let result = a - b;
        return result;
    });

    let output = [];
    let lengthArr = numbers.length / 2
    for (let i = 0; i < lengthArr; i++) {
        output.push(sortedNumbers.shift());
        output.push(sortedNumbers.pop());
    }
    return output;
}


sortingNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);