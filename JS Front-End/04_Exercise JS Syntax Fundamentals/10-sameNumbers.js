function sameNumbers(num) {
    let nameAsString = String(num);
    let output = false;
    let firstDig = nameAsString[0];
    let sumDigits = 0;
    for (let i = 0; i < nameAsString.length; i ++) {
        sumDigits += Number(nameAsString[i]);

        if (firstDig === nameAsString[i]) {
            output = true;
        } else {
            output = false;
        }
    }
    console.log(output)
    console.log(sumDigits)
}

sameNumbers(2222222);
