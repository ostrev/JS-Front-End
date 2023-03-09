function orders(product, quantity) {
    let totalSum = 0;
    switch(product) {
        case 'coffee':
            totalSum += quantity * 1.5
        break;
        case 'water':
            totalSum += quantity * 1
        break;
        case 'coke':
            totalSum += quantity * 1.4
        break;
        case 'snacks':
            totalSum += quantity * 2
        break;
    }
    
    function printResult(sum) {
        return sum.toFixed(2)
    }

    console.log(printResult(totalSum))
}
orders("water", 5);
orders("coffee", 2);