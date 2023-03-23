function attachEventsListeners() {
    
    const buttonsRef = Array.from(document.querySelectorAll('input[type = button]'));
    buttonsRef
        .forEach(but => but.addEventListener('click', handlerConvert));

    function handlerConvert(event) {
        let currentBtnRef = event.target
        let currentInput = currentBtnRef.parentNode.querySelector('input[type = text]').value
        let currentInputId = currentBtnRef.parentNode.querySelector('input[type]').id
        convert(currentInput, currentInputId)

    }

    function convert(inputStr, name) {
        input = Number(inputStr);
        const daysResult = document.getElementById('days');
        const hoursResult = document.getElementById('hours');
        const minutesResult = document.getElementById('minutes');
        const secondsResult = document.getElementById('seconds');
        if (name === 'days') {
            hoursResult.value = input * 24;
            minutesResult.value = input * 1440;
            secondsResult.value = input * 86400;
        } else if (name === 'hours') {
            daysResult.value = (input / 24).toFixed(1);
            minutesResult.value = input * 60;
            secondsResult.value = input * 3600;
        } else if (name === 'minutes') {
            daysResult.value = (input / 1440).toFixed(1);
            hoursResult.value = (input / 60).toFixed(1);
            secondsResult.value = input * 60;
        } else if (name === 'seconds') {
            daysResult.value = (input / 86400).toFixed(1);
            hoursResult.value = (input / 3600).toFixed(1);
            minutesResult.value = (input / 60).toFixed(1);
            
        }


    }

}