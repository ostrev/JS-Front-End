function extract(content) {
    debugger;
    const text = document.getElementById(content).textContent;
    const re = /(?<=\()[A-Za-z0-9\s]+/g;
    let found = text.match(re)
    console.log(found.join('; '))
    return found.join('; ');

}