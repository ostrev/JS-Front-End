function colorize() {
    let trRow = Array.from(document.querySelectorAll('body > table > tbody > tr:nth-child(even)'));

    trRow
    .forEach((row) => row.style.backgroundColor = 'Teal');
    
}