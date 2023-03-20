function solve() {
    const [generateBtnRef, buyBtnRef] = Array.from(document.getElementsByTagName('button'));
    const [generateTextareaRef, buyTextarea] = Array.from(document.getElementsByTagName('textarea'));

    const tbodyRef = document.getElementsByTagName('tbody')[0];
    
    generateBtnRef.addEventListener('click', handler);
    buyBtnRef.addEventListener('click', handlerBuy);

    function handlerBuy() {
        const inputCheckboxRef = Array.from(document.querySelectorAll('input:checked'));
        let resultStr = 'Bought furniture: ';
        let bought = [];
        let sum = 0;
        let decFactorOutput = 0;
    
        for (let input of inputCheckboxRef) {
            let parent = input.parentNode.parentNode;
            let listInput = Array.from(parent.querySelectorAll('td > p'));
            bought.push(listInput[0].textContent);
            sum += Number(listInput[1].textContent);
            decFactorOutput += Number(listInput[2].textContent);
        }

        resultStr += bought.join(', ')
        resultStr += '\n';
        resultStr += `Total price: ${sum.toFixed(2)}` + '\n';
        resultStr += `Average decoration factor: ${decFactorOutput/bought.length}`;
        
        buyTextarea.textContent = resultStr;

    }
    
    function handler() {
        const generateTextarea = JSON.parse(generateTextareaRef.value);

        for (let { img, name, price, decFactor } of generateTextarea) {
            let row = document.createElement('tr');
            tbodyRef.appendChild(row);

            let firstColumn = document.createElement('td');
            firstColumn.appendChild(elementCreate('img', '', firstColumn, '', '', { src: img }));
            row.appendChild(firstColumn);

            let secondColumn = document.createElement('td');
            secondColumn.appendChild(elementCreate('p', name, secondColumn));
            row.appendChild(secondColumn);

            let thirdColumn = document.createElement('td');
            thirdColumn.appendChild(elementCreate('p', price, thirdColumn));
            row.appendChild(thirdColumn);

            let fourthColumn = document.createElement('td');
            fourthColumn.appendChild(elementCreate('p', decFactor, fourthColumn));
            row.appendChild(fourthColumn);

            let fifthColumn = document.createElement('td');
            fifthColumn.appendChild(elementCreate('input', '', fifthColumn, '', '', { type:'checkbox' }));
            row.appendChild(fifthColumn);
        }
        
    }

    function elementCreate(type, content, parentNode, id, classes, attributes) {
        const htmlElement = document.createElement(type);

        if (content && type !== 'input') {
            htmlElement.textContent = content;
        }

        if (content && type === 'input') {
            htmlElement.value = content;
        }

        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }

        if (id) {
            htmlElement.id = id;
        }

        if (classes) {
            htmlElement.classList.add(...classes);
        }

        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key]);
            }
        }

        return htmlElement;
    }
}