function vacation(people, group, day) {
    let totalPrice = 0;
    if (group === 'Students') {
        if (day === 'Friday') {
            totalPrice += people * 8.45;
        } else if (day === 'Saturday') {
            totalPrice += people * 9.80;
        } else if (day === 'Sunday') {
            totalPrice += people * 10.46;
        }
        if (people >= 30) {
            totalPrice *= 0.85;
        }
    } else if (group === 'Business') {
        if (people >= 100) {
            people -= 10;
        }
        if (day === 'Friday') {
            totalPrice += people * 10.90;
        } else if (day === 'Saturday') {
            totalPrice += people * 15.60;
        } else if (day === 'Sunday') {
            totalPrice += people * 16;
        }
        
    } else if (group === 'Regular') {
        if (day === 'Friday') {
            totalPrice += people * 15;
        } else if (day === 'Saturday') {
            totalPrice += people * 20;
        } else if (day === 'Sunday') {
            totalPrice += people * 22.5;
        }
        if (people >= 10 && people <= 20) {
            totalPrice *= 0.95;
        }
    }
    console.log(`Total price: ${totalPrice.toFixed(2)}`)
}

vacation(30, "Students", "Sunday");
vacation(40, "Regular", "Saturday");