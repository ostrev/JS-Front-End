function attachEvents() {
    const addBtn = document.getElementById('add-button');
    const loadBtn = document.getElementById('load-button');
    const title = document.getElementById('title');
    const toDoList = document.getElementById('todo-list');
    

    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

    addBtn.addEventListener('click', handlerAdd);
    loadBtn.addEventListener('click', handlerLoad)

    function handlerLoad (event){
        event?.preventDefault();
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                toDoList.innerHTML = ''
                for (let key in data) {
                    let li = createElement('li', '', '', toDoList, `${data[key]._id}` );
                    createElement('span', `${data[key].name}`, '', li );
                    let btnRemove = createElement('button', 'Remove', '', li);
                    let btnEdit = createElement('button', 'Edit', '', li);
                    btnEdit.addEventListener('click', handlerEdit);
                    btnRemove.addEventListener('click', handlerRemove)
                }
            })
            .catch(handlerError)
    }
    
    function handlerAdd(event) {
        event?.preventDefault();

        let name = title.value
        if (name === '') {
            return
        }

        fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(({
                name
            }))
        })
            .then(() => {})
            .then(() => {
                handlerLoad();
            title.value = ''})
            .catch(handlerError)
    }


    function handlerEdit(event) {
        const editLi = event.currentTarget.parentNode
        const span = editLi.querySelector('span')
        const editBtnForRemove = event.currentTarget
        editBtnForRemove.remove()
        let inputLi = createElement('input', '', span.textContent);
        span.remove()
        editLi.prepend(inputLi)
        
        let btnSubmit = createElement('button', 'Submit', '', editLi);
        btnSubmit.addEventListener('click', handlerSubmit)
    }

    function handlerSubmit(event) {
        let submitId = event.currentTarget.parentNode.id
        let name = event.currentTarget.parentNode.querySelector('input').value
        fetch(`${BASE_URL}${submitId}`, {
            method: 'PATCH',
            body: JSON.stringify({name})
        })
        .then(() => {})
        .then(handlerLoad)
        .catch(handlerError)
    }


    function handlerRemove(event) {
        let removeId = event.target.parentNode.id
        fetch(`${BASE_URL}${removeId}`, {
            method: 'DELETE'
        })
        .then(() => {})
        .then(handlerLoad)
        .catch(handlerError)
    }

    function handlerError() {
        console.error("ERROR")
    }

    function createElement(type, content, value, parentNode, id, classes, attributes) {
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


attachEvents();

