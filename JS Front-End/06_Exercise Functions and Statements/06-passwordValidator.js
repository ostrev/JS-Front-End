function passValidator(pass) {
    let flag = true;
    
    if (pass.length < 6 || pass.length > 10) {
        console.log('Password must be between 6 and 10 characters')
        flag = false;
    }

    if (!pass.match(/^[A-Za-z0-9]+$/g)) {
        console.log('Password must consist only of letters and digits')
        flag = false;
    }

    if (!pass.match(/[0-9]{2,}/g)) {
        console.log('Password must have at least 2 digits')
        flag = false;
    }

    if (flag) {
        console.log('Password is valid')
    }

}
passValidator('logIn');
passValidator('MyPass123');
passValidator('Pa$s$s');

