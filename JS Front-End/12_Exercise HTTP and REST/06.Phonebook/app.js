function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/phonebook';

    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');
    const personRef = document.getElementById('person');
    const phoneRef = document.getElementById('phone');

    btnLoad.addEventListener('click', handlerLoad);
    btnCreate.addEventListener('click', handlerCreate);

    function handlerLoad() {
        const phoneBookRef = document.getElementById('phonebook');

        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                let phoneBook = Object.values(data);
                phoneBookRef.innerHTML = ''
                for (let {person, phone, _id} of phoneBook) {
                    let content = `${person}: ${phone}`
                    let contentBtn = 'Delete'
                    let btnId = _id
                    let li = createElement('li', content, '',phoneBookRef)
                    let btnRemove = createElement('button', contentBtn, '', li, btnId)
                    btnRemove.addEventListener('click', handlerRemove)
                }
            })
            .catch((err) => console.error(err))
    }

    function handlerCreate() {
        let person = personRef.value;
        let phone = phoneRef.value;
        let secondParam = {
            method: 'POST',
            body: JSON.stringify({
                'person': person,
                'phone': phone
            })
        }
        fetch(BASE_URL, secondParam)
            .then((response) => response.json())
            .then(() => {
                handlerLoad();
                personRef.value = '';
                phoneRef.value = '';
            })
    }

    function handlerRemove(e) {
        let headerHtml = `${BASE_URL}/${e.currentTarget.id}`
        fetch(headerHtml, {method: 'DELETE'})
            .then(() => {})
            .then(handlerLoad)
            .catch((err) => console.error(err))
    }

    function createElement(type, content, value, parentNode, id) {
        const htmlElement = document.createElement(type);
    
        if (content && type !== 'input') {
            htmlElement.textContent = content;
        }
        
        if (content && type === 'input') {
            htmlElement.value = content;
        }
    
        if (value) {
            htmlElement.value = value
        }
    
        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }
    
        if (id) {
            htmlElement.id = id;
        }
    
        return htmlElement;
    }
}

attachEvents();