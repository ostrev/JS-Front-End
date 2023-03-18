function focused() {
   
    const divRef = document.querySelectorAll('div div');
    const inputRef = Array.from(document.querySelectorAll('body > div > div > input'));
    
    for (let input of inputRef) {
        input.addEventListener('focus', handlerFocus);
        input.addEventListener('blur', handlerBlur); 
    }
        

    function handlerFocus(event){
        const divParent = event.target.parentElement
        divParent.classList.add('focused')
    }

    function handlerBlur(event){
        const divParent = event.target.parentElement
        if (divParent.classList.contains('focused')) {
            divParent.classList.remove('focused')
        }
    }
}