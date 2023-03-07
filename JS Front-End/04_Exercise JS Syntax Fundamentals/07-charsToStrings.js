function charsTo(...chars) {
    let strChar = '';
    for (const char of chars) {
        strChar += char;
    
    }
    console.log(strChar)
}
charsTo('a', 'b', 'c')