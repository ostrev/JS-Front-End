// function matrix(num) {
//     return new Array(num).fill(new Array(num).fill(num))
//     .forEach(x => console.log(x.join(' ')));
// }
// matrix(7);

function matrix(num) {
    let result = new Array(num).fill(num);
    for (let i = 0; i < result.length; i += 1) {
        console.log(result.join(' '))
    }
    
}
matrix(7);