function employeesAdd(input) {
    let employees = input.reduce((data, element) => {
        data[element] = element.length;
        return data
    }, {});

    for ([key, value] of Object.entries(employees)) {
        console.log(`Name: ${key} -- Personal Number: ${value}`)
    }
}

employeesAdd([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
    ]);
employeesAdd([
    'Samuel Jackson',
    'Will Smith',
    'Bruce Willis',
    'Tom Holland'
    ]);
    