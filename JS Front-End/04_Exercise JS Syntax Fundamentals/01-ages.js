function ages(age) {
    switch(true) {
        case age >= 66:
            console.log('elder');
            break;
        case age >= 20:
            console.log('adult');
            break;
        case age >= 14:
            console.log('teenager');
            break;
        case age >= 3:
            console.log('child');
            break;
        case age >= 0:
            console.log('baby');
            break;
        default:
            console.log('out of bounds');
    }
}
ages(20);
ages(1);
ages(100);
ages(-1);
