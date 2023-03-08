function cooking(number, ...params) {
    for (const param of params) {
        switch (param) {
            case 'chop':
                number /= 2;
                console.log(number)
                break;
            case 'dice':
                number = Math.sqrt(number)
                console.log(number)
                break;
            case 'spice':
                number += 1
                console.log(number)
                break;
            case 'bake':
                number *= 3
                console.log(number)
                break;
            case 'fillet':
                number -= number * 0.2
                console.log(number)
                break;
        }
    }
}
cooking('32', 'chop', 'chop', 'chop', 'chop', 'chop');
cooking('9', 'dice', 'spice', 'chop', 'bake', 'fillet');