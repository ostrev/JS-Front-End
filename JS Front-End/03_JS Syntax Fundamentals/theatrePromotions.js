function solve(day, age) {
    let price;
    if (0 <= age && age <= 18) {

        if (day === 'Weekday') {
            price = '12$';
        } else if (day === 'Weekend') {
            price = '15$';
        } else {
            price = '5$';
        }

    } else if (18 < age && age <= 64) {
        if (day === 'Weekday') {
            price = '18$';
        } else if (day === 'Weekend') {
            price = '20$';
        } else {
            price = '12$';
        }
    } else if (64 < age && age <= 122) {
        if (day === 'Weekday') {
            price = '12$';
        } else if (day === 'Weekend') {
            price = '15$';
        } else {
            price = '10$';
        }
    } else {
        price = 'Error!';
    }
    console.log(price)
}

solve('Holiday', 10)
solve('Holiday', 18)
solve('Holiday', 10)