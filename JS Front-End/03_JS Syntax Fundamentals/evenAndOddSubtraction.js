function solve(array) {
    let evenSum = 0;
    let oddSum = 0;
    let result;
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            evenSum += array[i];
        } else {
            oddSum += array[i];
        }
    }
    result = evenSum - oddSum;
    console.log(result);
}
solve([1, 2, 3, 4, 5, 6]);
solve([3,5,7,9]);
