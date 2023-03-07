function printSum(start, end) {
    let printArray = [];
    let sum = 0;
    for (let index = start; index <= end; index++) {
        printArray.push(index);
        sum += index
    }
    console.log(printArray.join(' '))
    console.log(`Sum: ${sum}`)
}
printSum(5, 10);