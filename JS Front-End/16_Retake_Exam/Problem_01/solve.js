function solve(input) {
    const temp = input.shift();
    let container = temp.split('|');

    for (let line of input) {
        if (line === 'Finish') {
            break
        }
        let data = line.split(' ');

        if (data[0] === 'Retake') {
            let overtaking = data[1];
            let overtaken = data[2];
            const indexOne = container.indexOf(overtaking);
            const indexTwo = container.indexOf(overtaken);
            if (indexOne < indexTwo) {
                container[indexOne] = overtaken;
                container[indexTwo] = overtaking;
                console.log(`${overtaking} retakes ${overtaken}.`);
            }
            
        } else if (data[0] === 'Trouble') {
            let horseName = data[1];
            const index = container.indexOf(horseName);
            if (index > 0) {
                let tempHorse = container[index - 1]
                container[index - 1] = horseName
                container[index] = tempHorse
                console.log(`Trouble for ${horseName} - drops one position.`)
            }
    
        } else if (data[0] === 'Rage') {
            let lastIndex = container.length - 1
            let horseName = data[1];
            const index = container.indexOf(horseName);
            
            if (index >= (lastIndex - 2)) {
                container.splice(index, 1)
                container.push(horseName)
            } else {
                container.splice(index, 1)
                let i = index + 2
                container.splice(i, 0, horseName)
            } 

            console.log(`${horseName} rages 2 positions ahead.`)
    
        } else if (data[0] === 'Miracle') {
            let lastHorse = container.shift();
            container.push(lastHorse)
            console.log(`What a miracle - ${lastHorse} becomes first.`)
        }
    }
    console.log(container.join('->'))
    console.log(`The winner is: ${container.pop()}`)
}





solve(
    ['Fancy|Lilly|Onyx|Domino|Sugar|Fiona',
    'Rage Onyx',
    'Finish',
    'Rage Lilly']
)


