window.addEventListener('load', solve);

function solve() {
    BASE_URL = 'http://localhost:3030/jsonstore/grocery/';

    inputDomSelectors = {
        product: document.getElementById('product'),
        count: document.getElementById('count'),
        price: document.getElementById('price')
    }

    otherDomSelectors = {
        formRef: document.querySelector('form'),
        addProductBtn: document.getElementById('add-product'),
        updateProductBtn: document.getElementById('update-product'),
        loadProductBtn: document.getElementById('load-product'),
        tableBody: document.getElementById('tbody'),

    }
    let id = null

    otherDomSelectors.loadProductBtn.addEventListener('click', loadHandler);
    otherDomSelectors.addProductBtn.addEventListener('click', addHandler);
    otherDomSelectors.updateProductBtn.addEventListener('click', updateHandler);

    function loadHandler(event) {
        if (event) {
            event.preventDefault();
        } 
        otherDomSelectors.tableBody.innerHTML = ''
        otherDomSelectors.addProductBtn.removeAttribute('disabled');
        otherDomSelectors.updateProductBtn.setAttribute('disabled', true);

        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                debugger
                for (const object of Object.values(data)) {
                    let tr = createElement('tr', null, otherDomSelectors.tableBody, `${object._id}`);
                    createElement('td', `${object.product}`, tr, null, ['name']);
                    createElement('td', `${object.count}`, tr, null, ['count-product']);
                    createElement('td', `${object.price}`, tr, null, ['product-price']);
                    const divBtn = createElement('td', null, tr, null, ['btn']);
                    const productUpdateBtn = createElement('button','Update', divBtn, null, ['update']);
                    const productDeleteBtn = createElement('button','Delete', divBtn, null, ['delete']);
                    
                    productUpdateBtn.addEventListener('click', productUpdateHandler);
                    productDeleteBtn.addEventListener('click', productDeleteHandler)
                }
            })
            .catch(errorHandler)
    }
    function productUpdateHandler(event) {
        if (event) {
            event.preventDefault();
        }
    
        id  = event.currentTarget.parentNode.parentNode.id
        inputDomSelectors.product.value  = event.currentTarget.parentNode.parentNode.children[0].textContent
        inputDomSelectors.price.value  = event.currentTarget.parentNode.parentNode.children[2].textContent
        inputDomSelectors.count.value  = event.currentTarget.parentNode.parentNode.children[1].textContent

        otherDomSelectors.addProductBtn.setAttribute('disabled', true);
        otherDomSelectors.updateProductBtn.removeAttribute('disabled');

    }
    function productDeleteHandler(event) {
        if (event) {
            event.preventDefault();
        }
        id  = event.currentTarget.parentNode.parentNode.id
        fetch(`${BASE_URL}${id}`, {method: 'DELETE'})
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
    }
    function addHandler(event) {
        if (event) {
            event.preventDefault();
        }    
    
        let areEmpty = Object.values(inputDomSelectors)
        .every((input) => input.value !== '');
    
        if (!areEmpty) {
        console.log("Empty input");
        return;
        }

        fetch(BASE_URL, { 
            method: 'POST',
            body: JSON.stringify({
                product: inputDomSelectors.product.value,
                count: inputDomSelectors.count.value,
                price: inputDomSelectors.price.value
            })
        })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
        
        otherDomSelectors.formRef.reset()
    }
    function updateHandler(event) {
        if (event) {
            event.preventDefault();
        } 

        fetch(`${BASE_URL}${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
            product: inputDomSelectors.product.value,
            price: inputDomSelectors.price.value,
            count: inputDomSelectors.count.value
            })
        })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)

        otherDomSelectors.formRef.reset()
    }
    function errorHandler() {
        console.error("ERROR")
    }
    function createElement(type, content, parentNode, id, classes, attributes, useInnerHtml) {
        const htmlElement = document.createElement(type);
    
        if (content && useInnerHtml) {
            htmlElement.innerHTML = content;
        } else {
            if (content && type !== 'input') {
                htmlElement.textContent = content;
            }
            if (content && type === 'input') {
                htmlElement.value = content;
            }
        }
    
        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }
    
        if (id) {
            htmlElement.id = id;
        }
        // ['list', 'item']
        if (classes) {
            htmlElement.classList.add(...classes);
        }
        // {src: 'link to image', href: 'link to site', type: 'checkbox' }
        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key])
            }
        }
    
        return htmlElement;
    
    }
}

