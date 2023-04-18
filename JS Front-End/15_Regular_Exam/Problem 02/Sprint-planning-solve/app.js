window.addEventListener('load', solve);

function solve() {
    inputDomSelectors = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        label: document.getElementById('label'),
        points: document.getElementById('points'),
        assignee: document.getElementById('assignee'),

    }

    otherDomSelectors = {
        formRef: document.getElementById('create-task-form'),
        taskIdHidden: document.getElementById('task-id'),
        createTaskBtn: document.getElementById('create-task-btn'),
        deleteTaskBtn: document.getElementById('delete-task-btn'),
        tasksSection: document.getElementById('tasks-section'),
        totalSprintPoints: document.getElementById('total-sprint-points')
    }

    otherDomSelectors.createTaskBtn.addEventListener('click', createHandler);
    otherDomSelectors.deleteTaskBtn.addEventListener('click', deleteHandler);

    let container = {}
    let counter = 0
    let priority = null
    let icon = null
    let taskId = null
    let totalPoints = 0


    function createHandler(event) {
        if (event) {
            event.preventDefault();
        }    
    
        let areEmpty = Object.values(inputDomSelectors)
            .every((input) => input.value !== '');

        if (!areEmpty) {
            console.log("Empty input");
            return;
        }
        counter += 1

        container[`task-${counter}`] = {
            title: inputDomSelectors.title.value,
            description: inputDomSelectors.description.value,
            label: inputDomSelectors.label.value,
            points: inputDomSelectors.points.value,
            assignee: inputDomSelectors.assignee.value
        }
        
        checkPriority(inputDomSelectors.label.value);

        let article = createElement('article', null, otherDomSelectors.tasksSection, `task-${counter}`, ['task-card'] ); 
        createElement('div', `${inputDomSelectors.label.value} ${icon}`, article, null, ['task-card-label', `${priority}`]);
        createElement('h3', `${inputDomSelectors.title.value}`, article, null, ['task-card-title']);
        createElement('p', `${inputDomSelectors.description.value}`, article, null, ['task-card-description']);
        createElement('div', `Estimated at ${inputDomSelectors.points.value} pts`, article, null, ['task-card-points']);
        createElement('div', `Assigned to: ${inputDomSelectors.assignee.value}`, article, null, ['task-card-assignee']);
        let divBtn = createElement('div', null, article, null, ['task-card-actions']);
        let deleteTaskCardBtn = createElement('button', 'Delete', divBtn)

        deleteTaskCardBtn.addEventListener('click', deleteTaskCardHandler)

        totalPoints += Number(inputDomSelectors.points.value)
        otherDomSelectors.totalSprintPoints.textContent = `Total Points ${totalPoints}pts`

        otherDomSelectors.formRef.reset()
    }

    function deleteHandler (event) {
        if (event) {
            event.preventDefault();
        } 

        let task = document.getElementById(`${taskId}`)
        task.remove()

        for (const input in inputDomSelectors) {
            inputDomSelectors[input].removeAttribute('disabled')
        }

        otherDomSelectors.deleteTaskBtn.setAttribute('disabled', true);
        otherDomSelectors.createTaskBtn.removeAttribute('disabled');

        totalPoints -= Number(inputDomSelectors.points.value)
        otherDomSelectors.totalSprintPoints.textContent = `Total Points ${totalPoints}pts`

        otherDomSelectors.formRef.reset();
    }

    function deleteTaskCardHandler(event) {
        if (event) {
            event.preventDefault();
        }

        taskId = event.currentTarget.parentNode.parentNode.id
        otherDomSelectors.taskIdHidden.value = taskId

        for (const id in container) {
            if (id === taskId) {
                for (const key in container[id])
                inputDomSelectors[key].value = container[id][key];
            }
        }
        otherDomSelectors.deleteTaskBtn.removeAttribute('disabled');
        otherDomSelectors.createTaskBtn.setAttribute('disabled', true);
        
        for (const input in inputDomSelectors) {
            inputDomSelectors[input].setAttribute('disabled', true)
        }
    }

    function checkPriority( label ) {
        if (label === 'Feature') {
            priority = 'feature'
            icon = '⊡'
        } else if (label === 'Low Priority Bug') {
            priority = 'low-priority';
            icon = '☉'
        } else if (label === 'High Priority Bug') {
            priority = 'high-priority';
            icon = '⚠'
        }

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