window.addEventListener('load', solve);

function solve() {
    const inputDomSelectors = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        label: document.getElementById('label'),
        points: document.getElementById('points'),
        assignee: document.getElementById('assignee'),
    }

    const otherDomSelectors = {
        createBtn: document.getElementById('create-task-btn'),
        deleteTaskBtn: document.getElementById('delete-task-btn'),
        taskSection: document.getElementById('tasks-section'),
        formRef: document.getElementById('create-task-form')
    }

    otherDomSelectors.createBtn.addEventListener('click', createHandler)

    let inputData = {}
    let count = 0
    // ${inputDOMSelectors.label.value} ${"&#8865"}
    

    function createHandler(event) {
        count +=1;
        if (event) {
            event.preventDefault();
        }

        let allInputsAreNonEmpty = Object.values(inputDomSelectors)
            .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
            console.log("Invalid");
            return;
        }

        inputData = {
            title: inputDomSelectors.title.value,
            description: inputDomSelectors.description.value,
            label: inputDomSelectors.label.value,
            points: inputDomSelectors.points.value,
            assignee: inputDomSelectors.assignee.value,
        }
        let priority = 'feature'
        
        if (inputData.label === 'Low Priority Bug') {
            priority = 'low-priority'
            char = '☉'
        }
        if (inputData.label === 'High Priority Bug') {
            priority = 'high-priority'
            char = '&#9888'
        }
        
        let article = createElement('article', null, otherDomSelectors.taskSection, `task-${count}`, ['task-card']);
        createElement('div',`${inputData.label}&#9888;`, article, null, ['task-card-label', `${priority}`]);
        createElement('h3',`${inputData.title}`, article, null, ['task-card-title']);
        createElement('p',`${inputData.description}`, article, null, ['task-card-description']);
        createElement('div',`${inputData.points}`, article, null, ['task-card-points']);
        createElement('div',`${inputData.assignee}`, article, null, ['task-card-assignee']);
        let divActions = createElement('div',null, article, null, ['task-card-actions']);
        let delBtn = createElement('button', 'Delete', divActions);

        delBtn.addEventListener('click', delHandler)
        otherDomSelectors.formRef.reset()

    }

    function delHandler(event) {

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