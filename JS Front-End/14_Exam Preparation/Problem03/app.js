function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';
    const inputDOMSelectors = {
        product: document.getElementById('product'),
        count: document.getElementById('count'),
        price: document.getElementById('price')
    }
    const otherDOMSelectors = {
        loadBtn: document.getElementById('load-product'),
        updateProductBtn: document.getElementById('update-product'),
        addProductBtn: document.getElementById('add-product'),
        tableContainer: document.getElementById('tbody'),
        formRef: document.querySelector('form')
    }   
    
    otherDOMSelectors.loadBtn.addEventListener('click', loadHandler);
    otherDOMSelectors.addProductBtn.addEventListener('click', addProductHandler);
    otherDOMSelectors.updateProductBtn.addEventListener('click', updateProductHandler)

    let products = {}
    let currentId = null

    function loadHandler(event) {
        if (event) {
            event.preventDefault();
        }  
        otherDOMSelectors.tableContainer.innerHTML = ''
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                products = data
                for (let obj of Object.values(data)) {
                    const {product, count, price, _id} = obj
                    let tableRow = createElement('tr', null, otherDOMSelectors.tableContainer, `${_id}`);
                    createElement('td', `${product}`, tableRow, null, ['name']);
                    createElement('td', `${count}`, tableRow, null, ['count-product']);
                    createElement('td', `${price}`, tableRow, null, ['product-price']);
                    let buttons = createElement('td', null, tableRow, null, ['btn']);
                    let updateBtn = createElement('button', 'Update', buttons, null, ['update']);
                    let deleteBtn = createElement('button', 'Delete', buttons, null, ['delete']);
                    updateBtn.addEventListener('click', updateHandler);
                    deleteBtn.addEventListener('click', deleteHandler);
                } 
            } )
            .catch(errorHandler)

    }

    function addProductHandler(event) {
        if (event) {
            event.preventDefault();
        }    
    
        let allInputsAreNonEmpty = Object.values(inputDOMSelectors)
        .every((input) => input.value !== '');
    
        if (!allInputsAreNonEmpty) {
        console.log("HAS INVALID");
        return;
        }

        let { product, count, price } = inputDOMSelectors
        fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({ 
                product: product.value, count: count.value, price: price.value

            })
        })
        .then(() => {})
        .then(loadHandler)
        .catch(errorHandler)

        otherDOMSelectors.formRef.reset()
    }

    function updateHandler(event) {
        let parentRef = this.parentNode.parentNode
        let id = parentRef.id
        currentId = id
        for (const key in products) {
            if (products[key]._id === id) {
                inputDOMSelectors.product.value = products[key].product
                inputDOMSelectors.count.value = products[key].count
                inputDOMSelectors.price.value = products[key].price
                break
            } 
        }
        otherDOMSelectors.addProductBtn.setAttribute('disabled', true);
        otherDOMSelectors.updateProductBtn.removeAttribute('disabled');
    }

    function updateProductHandler(event) {
        if (event) {
            event.preventDefault();
        } 
        let { product, count, price} = inputDOMSelectors
        fetch(`${BASE_URL}${currentId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                product:product.value,
                count: count.value,
                price: price.value
            })
        })
        .then(() => {})
        .then(() => {
            loadHandler()
            otherDOMSelectors.updateProductBtn.setAttribute('disabled', true);
            otherDOMSelectors.addProductBtn.removeAttribute('disabled');
            otherDOMSelectors.formRef.reset()
        })
        .catch(errorHandler)
    }

    function deleteHandler(event) {
        let parentRef = this.parentNode.parentNode
        let id = parentRef.id

        fetch(`${BASE_URL}${id}`, {method: 'DELETE'})
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
    }

    function errorHandler() {
        console.error("ERROR")
    }
    
    function createElement(type, content, parentNode, id, classes, attributes) {
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

solve();



