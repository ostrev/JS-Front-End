// TODO
function attachEvents() {
    BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    inputDomSelectors = {
        name: document.getElementById('title')
    }
    

    otherDomSelector = {
        formRef: document.querySelector('form'),
        addBtn: document.getElementById('add-button'),
        loadBtn: document.getElementById('load-button'),
        todoList: document.getElementById('todo-list')
    }

    otherDomSelector.loadBtn.addEventListener('click', loadHandler)
    otherDomSelector.addBtn.addEventListener('click', addHandler)

    function loadHandler(event) {
        if (event) {
            event.preventDefault();
        }    
        otherDomSelector.todoList.innerHTML = ''
        fetch(BASE_URL, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                for (const task of Object.values(data)) {
                    let taskId = task._id;
                    let li = createElement('li', null, otherDomSelector.todoList, taskId);
                    createElement('span', `${task.name}`, li);
                    const removeBtn = createElement('button', 'Remove', li);
                    const editBtn = createElement('button', 'Edit', li);

                    removeBtn.addEventListener('click', removeHandler);
                    editBtn.addEventListener('click', editHandler)
                }

            })
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
                name: inputDomSelectors.name.value,
            })
        })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
        otherDomSelector.formRef.reset()
    }

    function removeHandler(event) {
        const id = event.currentTarget.parentNode.id
        fetch(`${BASE_URL}${id}`, {method: 'DELETE'})
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
    }

    function editHandler(event) {
        const id = event.currentTarget.parentNode.id;
        const name = event.currentTarget.parentNode.children[0].textContent;
        const item = event.currentTarget.parentNode;
        const span = event.currentTarget.parentNode.children[0];
        const editBtnForRemove = event.currentTarget.parentNode.children[2];
        editBtnForRemove.remove()

        const input = createElement('input', name, item, 'tempInput');
        item.replaceChild(input, span);
        const submitBtn = createElement('button', 'Submit', item);

        submitBtn.addEventListener('click', submitHandler);

    }

    function submitHandler(event) {
        const id = event.currentTarget.parentNode.id;
        debugger
        fetch(`${BASE_URL}${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
            name: document.getElementById('tempInput').value,
            })
        })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
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

attachEvents();
