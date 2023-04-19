function attachEvents() {
    BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    inputDomSelectors = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),

    }

    otherDomSelectors = {
        formRef: document.querySelector('form'),
        loadBoardBtn: document.getElementById('load-board-btn'),
        createTaskBtn: document.getElementById('create-task-btn'),
        todoSection: document.querySelector('#todo-section > ul'),
        inProgressSection: document.querySelector('#in-progress-section > ul'),
        codeReviewSection: document.querySelector('#code-review-section > ul'),
        doneSection: document.querySelector('#done-section > ul'),
    }

    otherDomSelectors.loadBoardBtn.addEventListener('click', loadHandler);
    otherDomSelectors.createTaskBtn.addEventListener('click', addHandler)


    let buttonName = null
    let parent = null
    let setStatus = null

    function loadHandler(event) {
        if (event) {
            event.preventDefault();
        }
        for (let element of Array.from(document.querySelectorAll('.task'))) {
            element.remove()
        }
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                for (const task of Object.values(data)) {
                    statusCheck(task.status)
                    
                    let li = createElement('li', null, parent, `${task._id}`, ['task'] );
                    createElement('h3', task.title, li);
                    createElement('p', task.description, li)
                    const moveBtn = createElement('button', buttonName, li)

                    moveBtn.addEventListener('click', moveHandler)
                }
            })
            .catch(errorHandler)
    }  
    function moveHandler(event){
        if (event) {
            event.preventDefault();
        }

        const id = event.currentTarget.parentNode.id
        const title = event.currentTarget.parentNode.children[0].textContent
        const description = event.currentTarget.parentNode.children[1].textContent
        const status = event.currentTarget.parentNode.parentNode.parentNode.children[0].textContent
        statusCheck(status)
        if (setStatus === 'ToDelete') {
            fetch(`${BASE_URL}${id}`, {method: 'DELETE'})
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
            return
        }

        fetch(`${BASE_URL}${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
            title: title,
            description: description,
            status: setStatus
            })
        })
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
            title: inputDomSelectors.title.value,
            description: inputDomSelectors.description.value,
            status: 'ToDo' 
            })
        })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)

        otherDomSelectors.formRef.reset()
    }
    function statusCheck(status) {
        if (status === "ToDo") {
            buttonName = 'Move to In Progress';
            parent = otherDomSelectors.todoSection
            setStatus = 'In Progress'
        } else if (status === "In Progress") {
            buttonName = 'Move to Code Review';
            parent = otherDomSelectors.inProgressSection
            setStatus = 'Code Review'
        } else if (status === "Code Review") {
            buttonName = 'Move to Done';
            parent = otherDomSelectors.codeReviewSection
            setStatus = 'Done'
        } else if (status === "Done") {
            buttonName = 'Close';
            parent = otherDomSelectors.doneSection
            setStatus = 'ToDelete'
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