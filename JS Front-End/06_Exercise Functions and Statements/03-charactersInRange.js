function characterRange(firstChar, secondChar) {
    let output = [];
    if (firstChar.charCodeAt(0) > secondChar.charCodeAt(0)) {
        [firstChar, secondChar] = [secondChar, firstChar]
    }
    let start = firstChar.charCodeAt(0);
    let end = secondChar.charCodeAt(0);
    for (let i = start + 1; i < end; i++) {
        output.push(String.fromCharCode(i))
    }
    return output.join(' ')
}

console.log(characterRange('a', 'd'))