function sumDigits(num) {
    let strNum = String(num);
    let totalSum = 0;
    for (const dig of strNum) {
        totalSum += Number(dig)
        
    }
    console.log(totalSum)
}
sumDigits(245678);
sumDigits(97561);
sumDigits(543);