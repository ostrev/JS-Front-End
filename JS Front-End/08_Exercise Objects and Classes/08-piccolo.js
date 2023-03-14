function piccolo(input) {
    let parkingSet = new Set();
    for (let line of input) {
        let [command, number] = line.split(', ');
        if (command === 'IN') {
            parkingSet.add(number)
        } else {
            parkingSet.delete(number)
        }
    }
    let result = new Array(...parkingSet);

    let sortedParking = result
        .sort((a, b) => {
            return a.localeCompare(b);
        });
        
    if (sortedParking.length !== 0) {
        sortedParking
        .forEach((num) => console.log(num))
    } else {
        console.log('Parking Lot is Empty')
    }
    
}

piccolo(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'IN, CA9999TT',
'IN, CA2866HI',
'OUT, CA1234TA',
'IN, CA2844AA',
'OUT, CA2866HI',
'IN, CA9876HH',
'IN, CA2822UU']);

piccolo(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'OUT, CA1234TA']);
