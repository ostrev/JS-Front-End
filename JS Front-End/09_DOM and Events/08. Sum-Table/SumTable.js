function sumTable() {
    const sumRef = document.getElementById('sum');
    const rows = Array.from(document.querySelectorAll('body > table > tbody > tr:not(:last-child):not(:first-child) > td:nth-child(2)'));

    let sum = Number(sumRef.textContent)
    rows
        .forEach((num) => {
            sum += Number(num.textContent)
            console.log(Number(num.textContent))
            console.log(sum)
        })
    sumRef.textContent = sum
}