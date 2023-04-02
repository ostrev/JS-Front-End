function shopList(input) {
    let initialList = input.shift().split('!')

    for (let line of input) {
        if (line === 'Go Shopping!') {
            break
        }

        let data = line.split(' ')
        if (data[0] === 'Urgent') {
            urgent(data[1])
        } else if (data[0] === 'Unnecessary') {
            unnecessary(data[1])
        } else if (data[0] === 'Correct') {
            correct(data[1], data[2])
        } else if (data[0] === 'Rearrange') {
            rearrange(data[1])
        } 

    }

    function urgent(item) {
        if (!initialList.includes(item)) {
            initialList.unshift(item)
        }
    }

    function unnecessary(item) {
        if (initialList.includes(item)) {
            const index = initialList.indexOf(item);
            initialList.splice(index, 1);
        }
    }

    function correct(item, newItem) {
        if (initialList.includes(item)) {
            const index = initialList.indexOf(item);
            initialList[index] = newItem;
        }
    }

    function rearrange(item) {
        if (initialList.includes(item)) {
            const index = initialList.indexOf(item);
            initialList.splice(index, 1);
            initialList.push(item)
        }
    }

    console.log(initialList.join(', '))
}


shopList(["Tomatoes!Potatoes!Bread",
"Unnecessary Milk",
"Urgent Tomatoes",
"Go Shopping!"])

shopList(["Milk!Pepper!Salt!Water!Banana",
"Urgent Salt",
"Unnecessary Grapes",
"Correct Pepper Onion",
"Rearrange Grapes",
"Correct Tomatoes Potatoes",
"Go Shopping!"])