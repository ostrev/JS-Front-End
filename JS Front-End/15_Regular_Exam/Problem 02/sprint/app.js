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
        formRef: document.getElementById('create-task-form'),
        totalPointsRef: document.getElementById('total-sprint-points'),
        taskId: document.querySelector("[type='hidden']")
    }

    otherDomSelectors.createBtn.addEventListener('click', createHandler)

    let inputData = {}
    let count = 0
    let taskIdIForInput = `task-${count}`
    let fullInputData = {}
    let priority = null
    let char = null
    let sumOfPoints = 0


   
    function createHandler(event) {
        if (event) {
            event.preventDefault();
        }

        let allInputsAreNonEmpty = Object.values(inputDomSelectors)
            .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
            console.log("Invalid");
            return;
        }
        count +=1;
        taskIdIForInput = `task-${count}`
        debugger
        
        fullInputData = {
            title: inputDomSelectors.title.value,
            description: inputDomSelectors.description.value,
            label: inputDomSelectors.label.value,
            points: inputDomSelectors.points.value,
            assignee: inputDomSelectors.assignee.value,
        }

        inputData[taskIdIForInput] = fullInputData
        
        if (inputData[taskIdIForInput].label === 'Feature') {
            priority = 'feature';
            // char = '⊡'
            char = '&#8865;';
        }
        
        if (inputData[taskIdIForInput].label === 'Low Priority Bug') {
            priority = 'low-priority';
            // char = '☉'
            char = '&#9737;';
        }
        if (inputData[taskIdIForInput].label === 'High Priority Bug') {
            priority = 'high-priority';
            // char = '⚠'
            char = '&#9888;';
        }
        // add points
        sumOfPoints += Number(inputData[taskIdIForInput].points)
        otherDomSelectors.totalPointsRef.textContent = `Total Points ${sumOfPoints}pts`
        
        let article = createElement('article', null, otherDomSelectors.taskSection, taskIdIForInput, ['task-card']);
        createElement('div',`${inputData[taskIdIForInput].label} ${char}`, article, null, ['task-card-label', `${priority}`], null, 1);
        createElement('h3',`${inputData[taskIdIForInput].title}`, article, null, ['task-card-title']);
        createElement('p',`${inputData[taskIdIForInput].description}`, article, null, ['task-card-description']);
        createElement('div',`Estimated at ${inputData[taskIdIForInput].points} pts`, article, null, ['task-card-points']);
        createElement('div',`Assigned to: ${inputData[taskIdIForInput].assignee}`, article, null, ['task-card-assignee']);
        let divActions = createElement('div',null, article, null, ['task-card-actions']);
        let delBtn = createElement('button', 'Delete', divActions);

        delBtn.addEventListener('click', delHandler);
        otherDomSelectors.formRef.reset();
       
        
        // inputDomSelectors.label.value = '';

    }

    function delHandler(event) {
        debugger
        const id = event.currentTarget.parentNode.parentNode.id


        for (const key in inputData[id]) {
            inputDomSelectors[key].value = inputData[id][key];
        }

        otherDomSelectors.deleteTaskBtn.removeAttribute('disabled');
        // add to start of function
        otherDomSelectors.createBtn.setAttribute('disabled', true);

        for (const key in inputDomSelectors) {
            inputDomSelectors[key].setAttribute('disabled', true);
        }

        otherDomSelectors.taskId.value = id;

    }

    otherDomSelectors.deleteTaskBtn.addEventListener('click', taskDelHandler);

    function taskDelHandler(event) {
        if (event) {
            event.preventDefault();
        }

        debugger
        const id = event.currentTarget.parentNode.parentNode.querySelector("[type='hidden']").value;
        const articles = Array.from(otherDomSelectors.taskSection.querySelectorAll('article'));
        for (const article of articles) {
            if (article.id === id) {
                article.remove();
            }
        }
        // subtract points get points from form
        sumOfPoints -= Number(inputData[id].points)
        otherDomSelectors.totalPointsRef.textContent = `Total Points ${sumOfPoints}pts`

        otherDomSelectors.formRef.reset()
        for (const key in inputDomSelectors) {
            inputDomSelectors[key].removeAttribute('disabled');
        }
        otherDomSelectors.deleteTaskBtn.setAttribute('disabled', true)
        otherDomSelectors.createBtn.removeAttribute('disabled')

        

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