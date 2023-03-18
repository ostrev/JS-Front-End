function lockedProfile() {
    const btnRef = Array.from(document.querySelectorAll('div > button'));

    for (let btn of btnRef) {
        btn.addEventListener('click', handler);
    }
    
    function handler(event) {
        const currentBtn = event.target;
        const currentParent = event.target.parentElement;
        const radioBtn = currentParent.querySelector('input[type="radio"]');
        let divRef = currentParent.querySelector('div');
        if (radioBtn.checked) {
            return;
        }

        if (currentBtn.textContent === 'Show more') {
            divRef.style.display = 'block';
            currentBtn.textContent = 'Hide it';
        } else {
            divRef.style.display = 'none';
            currentBtn.textContent = 'Show more';
        } 
    }
}