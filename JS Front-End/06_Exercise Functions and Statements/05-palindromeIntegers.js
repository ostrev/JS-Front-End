function palindrome(numbers) {
    numbers
    .forEach(num => {
        let revNum = [...num.toString()];
        revNum = Number(revNum.reverse().join(''))
        console.log(revNum === num)
    });
    
}
palindrome([123,323,421,121]);
palindrome([32,2,232,1010]);
