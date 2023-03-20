function solve() {
    const inputText = document.getElementById('input').value.split('.');
    const outputRef = document.getElementById('output');
    inputText.pop();

    inputText.forEach((sentence,index) => { 
        inputText[index] = sentence += '.';
        inputText[index] = sentence.trimLeft();
    });

    while (inputText.length > 0) {
        debugger;
        let text = inputText.splice(0, 3);
        let p = document.createElement('p');
        for (let sen of text) {
            p.textContent += sen
        }
        
        outputRef.appendChild(p);
    };
}