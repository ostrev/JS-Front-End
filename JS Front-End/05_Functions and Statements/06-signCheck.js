function singCheck(...numbers) {
    let isPositive = numbers
        .filter(num => num < 0)
        .length % 2 === 0 ? 'Positive' : 'Negative';
    return isPositive;
}

console.log(
    singCheck(5, 12, -15)
);