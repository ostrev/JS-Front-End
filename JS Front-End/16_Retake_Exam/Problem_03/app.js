window.addEventListener("load", solve);

function solve() {
    BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    inputDomSelectors = {
        title: document.getElementById('course-name'),
        type: document.getElementById('course-type'),
        description: document.getElementById('description'),
        teacher: document.getElementById('teacher-name'),


    }

    otherDomSelectors = {
        formRef: document.querySelector('form'),
        loadBtn: document.getElementById('load-course'),
        addBtn: document.getElementById('add-course'),
        editBtn: document.getElementById('edit-course'),
        divList: document.getElementById('list'),

    }

    otherDomSelectors.loadBtn.addEventListener('click', loadHandler);
    otherDomSelectors.addBtn.addEventListener('click', addHandler);
    otherDomSelectors.editBtn.addEventListener('click', editHandler)

    let currentId = null

    function loadHandler(event){
        if (event) {
            event.preventDefault();
        } 
        otherDomSelectors.divList.innerHTML = ''
        
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                for (const task of Object.values(data)) {
                    let div = createElement('div', null, otherDomSelectors.divList, `${task._id}`, ['container']);
                    createElement('h2', `${task.title}`, div);
                    createElement('h3', `${task.teacher}`, div);
                    createElement('h3', `${task.type}`, div);
                    createElement('h4', `${task.description}`, div);
                    let editCourseBtn = createElement('button', 'Edit Course', div, null, ['edit-btn']);
                    let finishBtn = createElement('button', 'Finish Course', div, null, ['finish-btn']);
                    editCourseBtn.addEventListener('click', editCourseHandler);
                    finishBtn.addEventListener('click', finishHandler);
                }
            })
            .catch(errorHandler)
    }
    function editCourseHandler(event){
        if (event) {
            event.preventDefault();
        } 
    
        currentId = event.currentTarget.parentNode.id
        const itemForRemove = event.currentTarget.parentNode
        let obj = {title: event.currentTarget.parentNode.children[0].textContent,
            type: event.currentTarget.parentNode.children[2].textContent,
            description: event.currentTarget.parentNode.children[3].textContent,
            teacher: event.currentTarget.parentNode.children[1].textContent,
        }

        for (const key in obj) {
            inputDomSelectors[key].value = obj[key]
        }

        itemForRemove.remove()

        otherDomSelectors.editBtn.removeAttribute('disabled');
        otherDomSelectors.addBtn.setAttribute('disabled', true);

    }

    function finishHandler(event) {
        if (event) {
            event.preventDefault();
        } 
        debugger
        currentId = event.currentTarget.parentNode.id
        fetch(`${BASE_URL}${currentId}`, {method: 'DELETE'})
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
    }

    function addHandler(event){
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
            type: inputDomSelectors.type.value,
            description: inputDomSelectors.description.value,
            teacher: inputDomSelectors.teacher.value 
            })
        })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)

        otherDomSelectors.formRef.reset()
    }

    function editHandler(event) {
        if (event) {
            event.preventDefault();
        } 

        fetch(`${BASE_URL}${currentId}`, {
            method: 'PUT',
            body: JSON.stringify({
            title: inputDomSelectors.title.value,
            type: inputDomSelectors.type.value,
            description: inputDomSelectors.description.value,
            teacher: inputDomSelectors.teacher.value,
            _id: currentId
            })
        })
            .then(() => {})
            .then(loadHandler)
            .catch(errorHandler)
        otherDomSelectors.formRef.reset()
        otherDomSelectors.editBtn.setAttribute('disabled', true);
        otherDomSelectors.addBtn.removeAttribute('disabled');
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