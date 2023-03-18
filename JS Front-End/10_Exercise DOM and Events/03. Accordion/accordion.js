function toggle() {

    const btnRef = document.getElementsByClassName('button')[0];
    const textRef = document.getElementById('extra')

    if (btnRef.textContent === 'More') {
        textRef.style.display = 'block';
        btnRef.textContent = 'Less';
        
    } else {
        textRef.style.display = 'none';
        btnRef.textContent = 'More';
    
    }
}
