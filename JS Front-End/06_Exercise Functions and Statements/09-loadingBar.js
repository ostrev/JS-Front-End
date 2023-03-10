function loadingBar(number) {
    if (number === 100) {
        console.log('100% Complete!')
    } else {
        console.log(`${number}% ` +
        `[${'%'.repeat(number/10)}${'.'.repeat(10 - number/10)}]\n` + 
        `Still loading...`)
    }
}
loadingBar(0);
loadingBar(30);
loadingBar(50);
loadingBar(100);
