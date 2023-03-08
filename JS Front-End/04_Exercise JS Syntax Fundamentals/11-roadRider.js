function road(speed, typeRoad) {
    let speedLimit = 0;
    let difference = 0;
    let status = ''
    switch(typeRoad) {
        case 'motorway':
            speedLimit = 130;
            difference = speed - speedLimit;
            if (speed > 130) {
                status = overSpeed(speedLimit)
                console.log(`The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
            } else {
                console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
            }
        break;
        case 'interstate':
            speedLimit = 90;
            difference = speed - speedLimit;
            if (speed > 90) {
                status = overSpeed(speedLimit)
                console.log(`The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
            } else {
                console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
            }
        break;
        case 'city':
            speedLimit = 50;
            difference = speed - speedLimit;
            if (speed > 50) {
                status = overSpeed(speedLimit)
                console.log(`The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
            } else {
                console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
            }
        break;
        case 'residential':
            speedLimit = 20;
            difference = speed - speedLimit;
            if (speed > 20) {
                status = overSpeed(speedLimit)
                console.log(`The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
            } else {
                console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
            }
        break;
    }

    function overSpeed(speedLimit) {
        switch(true) {
            case speed <= (speedLimit + 20):
                status = 'speeding';
            break;
            case speed <= (speedLimit + 40):
                status = 'excessive speeding';
            break;
            default:
                status = 'reckless driving';
            break;
        }
        return status;
    }
}

road(70, 'city');
road(21, 'residential');
road(120, 'interstate');
road(200, 'motorway');
