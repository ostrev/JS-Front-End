function fruit(name, grams, price) {

    let money = grams * price / 1000
    console.log(`I need $${money.toFixed(2)} to buy ${(grams / 1000).toFixed(2)} kilograms ${name}.`)
}

fruit('orange', 2500, 1.80);
fruit('apple', 1563, 2.35);
