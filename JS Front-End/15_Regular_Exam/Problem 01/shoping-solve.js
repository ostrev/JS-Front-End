function solve(input) {

    const initial = input.shift();
    let container = initial.split('!');

    for (let line of input) {
        if (line === 'Go Shopping!') {
            break
        }

        let data = line.split(' ')
        if (data[0] === 'Urgent') {
            if (!(container.includes(data[1]))) {
                container.unshift(data[1]);
            }
        }

        if (data[0] === 'Unnecessary') {
            if (container.includes(data[1])) {
                const index = container.indexOf(data[1]);
                container.splice(index, 1);
            }
        }

        if (data[0] === 'Correct') {
            if (container.includes(data[1])) {
                const index = container.indexOf(data[1]);
                container[index] = data[2];
            }
        }

        if (data[0] === 'Rearrange') {
            if (container.includes(data[1])) {
                const index = container.indexOf(data[1]);
                container.splice(index, 1);
                container.push(data[1]);
            }
        }
    }
    console.log(initialList.join(', '))
}

solve(["Tomatoes!Potatoes!Bread",
"Unnecessary Milk",
"Urgent Tomatoes",
"Go Shopping!"])

solve(["Milk!Pepper!Salt!Water!Banana",
"Urgent Salt",
"Unnecessary Grapes",
"Correct Pepper Onion",
"Rearrange Grapes",
"Correct Tomatoes Potatoes",
"Go Shopping!"])