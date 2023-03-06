function solve(num, array) {
    let resultArr = [];
    for (let i = 0; i < num; i += 1) {
        resultArr.push(array[i])
    }
    
    console.log(resultArr.reverse().join(' '))
}

solve(2, [1, 2, 3, 4, 5])