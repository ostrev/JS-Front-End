function phoneBook(input) {
    let phoneBookObj = input.reduce((data, element) => {
        data[element.split(' ')[0]] = element.split(' ')[1];
        return data;
        }, {});
    
    for ([key, value] of Object.entries(phoneBookObj)) {
        console.log(`${key} -> ${value}`)
    }
}
phoneBook(['Tim 0834212554',
'Peter 0877547887',
'Bill 0896543112',
'Tim 0876566344']);
phoneBook(['George 0552554',
'Peter 087587',
'George 0453112',
'Bill 0845344']);
