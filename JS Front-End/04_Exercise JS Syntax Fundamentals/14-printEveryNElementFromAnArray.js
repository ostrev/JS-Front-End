function printNthElement(text, number) {
    let outputArr = []
    for (let i = 0; i < text.length; i += number) {
        outputArr.push(text[i])
    }
    return(outputArr)
}
printNthElement(['5', '20', '31', '4', '20'], 2);
printNthElement(['dsa', 'asd', 'test', 'tset'], 2);
printNthElement(['1', '2', '3', '4', '5'], 6);