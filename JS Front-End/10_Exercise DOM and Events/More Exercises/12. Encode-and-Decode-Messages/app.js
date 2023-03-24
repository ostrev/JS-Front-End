function encodeAndDecodeMessages() {
    const buttonEncode = document.querySelectorAll('#main > div > button')[0];
    const buttonDecode = document.querySelectorAll('#main > div > button')[1];


    buttonEncode.addEventListener('click', encode)
    buttonDecode.addEventListener('click', decode)

    function encode() {
        const message = document.querySelectorAll('#main > div > textarea')[0].value;
        const encodeMsg = document.querySelectorAll('#main > div > textarea')[1];

        let result = '';
        for (let char of message) {
            asciiNum = char.charCodeAt(0) + 1;
            result += String.fromCharCode(asciiNum);
        }
        encodeMsg.value = result;
        document.querySelectorAll('#main > div > textarea')[0].value = '';
    }

    function decode() {
        debugger
        const messageDecode = document.querySelectorAll('#main > div > textarea')[1].value;
        let result = '';
        for (let char of messageDecode) {
            asciiNum = char.charCodeAt(0) - 1;
            result += String.fromCharCode(asciiNum);
        }
        document.querySelectorAll('#main > div > textarea')[1].value = result;
    }
}