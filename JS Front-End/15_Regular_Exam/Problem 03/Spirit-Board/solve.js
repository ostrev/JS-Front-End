// TODO:
function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    const inputDOMSelectors = {
        title: document.getElementById('title'),
        description: document.getElementById('description')
    }

    const otherDOMSelectors = {
        loadBtn: document.getElementById('load-board-btn'),
        createTaskBtn: document.getElementById('create-task-btn'),
        formRef: document.querySelector('form'),
        boardSection: document.getElementById('board-section'),
        todoSection: document.getElementById('todo-section'),
        inProgressSection: document.getElementById('in-progress-section'),
        codeReviewSection: document.getElementById('code-review-section'),
        doneSection: document.getElementById('done-section')
    }
    let buttonStatus = null
    let parentRef = null

    otherDOMSelectors.loadBtn.addEventListener('click', loadHandler);
    otherDOMSelectors.createTaskBtn.addEventListener('click', createHandler)

    function loadHandler(event) {
        if (event) {
            event.preventDefault();
        }

        const forDelete = otherDOMSelectors.boardSection.querySelectorAll('li');
        for (const item of forDelete) {
            item.remove()
        }

        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                debugger
                for (const task of Object.values(data)) {
                    if (task.status === 'ToDo') {
                        buttonStatus = 'Move to In Progress';
                        parentRef = otherDOMSelectors.todoSection;
                    } else if (task.status === 'In Progress') {
                        parentRef = otherDOMSelectors.inProgressSection;
                        buttonStatus = 'Move to Code Review';
                    } else if (task.status === 'Code Review') {
                        parentRef = otherDOMSelectors.codeReviewSection;
                        buttonStatus = 'Move to Done';
                    } else if (task.status === 'Done') {
                        parentRef = otherDOMSelectors.doneSection;
                        buttonStatus = 'Close';
                    }

                    let li = createElement('li', null, parentRef, `${task._id}`, ['task'] );
                    createElement('h3', task.title, li);
                    createElement('p', task.description, li)
                    const moveBtn = createElement('button', buttonStatus, li)

                    moveBtn.addEventListener('click', moveHandler)
                }
            })
            .catch(errorHandler)
    }

    function createHandler(event) {
        if (event) {
            event.preventDefault()
        }

        fetch(BASE_URL, { 
            method: 'POST',
            body: JSON.stringify({
                title: inputDOMSelectors.title.value,
                description: inputDOMSelectors.description.value, 
                status: 'ToDo'
                })
            })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)

        otherDOMSelectors.formRef.reset()
    }

    function moveHandler(event) {
        debugger
        const command = event.currentTarget.textContent;
        const item = event.currentTarget.parentNode;
        const id = event.currentTarget.parentNode.id
        const title = event.currentTarget.parentNode.childNodes[0].textContent
        const description = event.currentTarget.parentNode.childNodes[1].textContent
        let status = event.currentTarget.parentNode.childNodes[2].textContent
        if (command === 'Move to In Progress') {
            otherDOMSelectors.inProgressSection.appendChild(item);
            status = 'In Progress';
            fetch(`${BASE_URL}${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status
                })
            })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)

        } else if (command === 'Move to Code Review') {
            otherDOMSelectors.codeReviewSection.appendChild(item);
            status = 'Code Review';
            fetch(`${BASE_URL}${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status
                })
            })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
        } else if (command === 'Move to Done') {
            otherDOMSelectors.doneSection.appendChild(item);
            status = 'Done';
            fetch(`${BASE_URL}${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status
                })
            })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
        } else if (command === 'Close') {
            otherDOMSelectors.doneSection.appendChild(item);
            
            fetch(`${BASE_URL}${id}`, {method: 'DELETE'})
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
        }
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