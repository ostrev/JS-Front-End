function storeCreate(storeInput, orderInput) {
    let storeArr = [...storeInput, ...orderInput];
    let store = {}
    for (let i = 0; i < storeArr.length; i += 2){
        if (!store.hasOwnProperty(storeArr[i])) {
            store[storeArr[i]] = 0 ;
        } 
        store[storeArr[i]] += Number(storeArr[i + 1])
    }
    for (const key in store) {
        console.log(`${key} -> ${store[key]}`)
    }
    
}

storeCreate(['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],
    ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30']);

storeCreate(['Salt', '2', 'Fanta', '4', 'Apple', '14', 'Water', '4', 'Juice', '5'],
    ['Sugar', '44', 'Oil', '12', 'Apple', '7', 'Tomatoes', '7', 'Bananas', '30']);