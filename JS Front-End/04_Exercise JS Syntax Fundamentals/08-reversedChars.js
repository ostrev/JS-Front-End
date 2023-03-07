function reversedChars(...chars) {
    chars.reverse()
    let strChar = '';
    for (const char of chars) {
        strChar += char + ' '; 
    }
    
    console.log(strChar.trim())
}
reversedChars('A', 'B', 'C');
reversedChars('1', 'L', '&');