function validate() {
    const textRef = document.getElementById('email')
    const re = new RegExp('^[a-z]+@[a-z]+.[a-z]+$', 'gm');

    textRef.addEventListener('change', handler);

    function handler(event) {
        
        let found = textRef.value.match(re);
        
        if (!found) {
            textRef.classList.add('error');
        } else {
            textRef.classList.remove('error');
        }
    }
}