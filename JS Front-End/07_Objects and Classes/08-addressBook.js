function addressBookSolve(input) {
    let addressBook = input.reduce((data, element) => {
        data[element.split(':')[0]] = element.split(':')[1];
        return data;
    }, {});

    function sortObj(obj) {
        return Object.keys(obj)
        .sort((aName, bName) => {
            let result = aName.localeCompare(bName);
            return result;
        })
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
    }

    for ([key, value] of Object.entries(sortObj(addressBook))) {
        console.log(`${key} -> ${value}`)
    }
}

addressBookSolve(['Tim:Doe Crossing',
'Bill:Nelson Place',
'Peter:Carlyle Ave',
'Bill:Ornery Rd']);

addressBookSolve(['Bob:Huxley Rd',
'John:Milwaukee Crossing',
'Peter:Fordem Ave',
'Bob:Redwing Ave',
'George:Mesta Crossing',
'Ted:Gateway Way',
'Bill:Gateway Way',
'John:Grover Rd',
'Peter:Huxley Rd',
'Jeff:Gateway Way',
'Jeff:Huxley Rd']);
