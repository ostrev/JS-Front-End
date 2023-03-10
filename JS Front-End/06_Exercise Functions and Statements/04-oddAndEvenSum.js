function oddEvenSum(number) {
    let oddSum = 0;
    let evenSum = 0;
    for (const num of number.toString()) {
        if (Number(num) % 2 === 0) {
            evenSum += Number(num)
        } else {
            oddSum += Number(num)
        }
    }
    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`)
}

oddEvenSum(1000435);