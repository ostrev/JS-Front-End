window.addEventListener('load', solve);

function solve() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const label = document.getElementById('label');
    const points = document.getElementById('points');
    const assignee = document.getElementById('assignee');
    const createTaskBtn = document.getElementById('create-task-btn');
    const deleteTaskBtn = document.getElementById('delete-task-btn');
    const tasksSection = document.getElementById('tasks-section');
    const taskId = document.getElementById('task-id');
    const form = document.getElementById('create-task-form');
    const totalPointsValue = document.getElementById('total-sprint-points')
    let totalPoints = 0;
    let pointsToRemove = 0
    let additionalDivClass = null;
    let tasks = 0;
    let icons = {
        'Feature': '&#8865;',
        'Low Priority Bug': '&#9737;',
        'High Priority Bug': '&#9888;',
    };
    // title.value = 'Limonada';
    // description.value = 'Deiba';
    // label.value = 'Low Priority Bug';
    // points.value = '23';
    // assignee.value = 'Pesho';

    deleteTaskBtn.disabled = true;
    createTaskBtn.addEventListener('click', createHandler);

    function createHandler() {
        if ((title.value !== '') &&
            (description.value !== '') &&
            (label.value !== '') &&
            (points.value !== '') &&
            (assignee.value !== '')) {
            tasks += 1;
            totalPoints += Number(points.value)
            const article = createElement('article', '', tasksSection, `task-${tasks}`, ['task-card']);
            if (label.value === 'Feature') {
                additionalDivClass = 'feature';
            } else if (label.value === 'Low Priority Bug') {
                additionalDivClass = 'low-priority';
            } else {
                additionalDivClass = 'high-priority';
            }
            debugger
            const divFeature = createElement('div', `${label.value} ${icons[label.value]}`, article, '', ['task-card-label', additionalDivClass], '', 1);
            const h3 = createElement('h3', title.value, article, '', ['task-card-title']);
            const pDesc = createElement('p', description.value, article, '', ['task-card-description']);
            const divPoints = createElement('div', `Estimated at ${points.value} pts`, article, '', ['task-card-points']);
            const divAssignee = createElement('div', `Assigned to: ${assignee.value}`, article, '', ['task-card-assignee']);
            const divActions = createElement('div', '', article, '', ['task-card-actions']);
            const delBtn = createElement('button', 'Delete', divActions);
            title.value = '';
            description.value = '';
            label.value = '';
            points.value = '';
            assignee.value = '';
            totalPointsValue.textContent = `Total Points ${totalPoints}pts`
            delBtn.addEventListener('click', loadDeleteHandler);
        }
    }

    function loadDeleteHandler(e) {
        deleteTaskBtn.disabled = false;
        createTaskBtn.disabled = true;
        const element = e.currentTarget.parentNode.parentNode;
        const id = element.id;
        const labelElement = element.children[0].classList[1];
        title.value = element.children[1].textContent;
        description.value = element.children[2].textContent;
        if (labelElement === 'feature') {
            label.value = 'Feature';
        } else if (labelElement === 'low-priority') {
            label.value = 'Low Priority Bug';
        } else {
            label.value = 'High Priority Bug';
        }
        points.value = element.children[3].textContent.split(' ')[2];
        assignee.value = element.children[4].textContent.split('Assigned to: ')[1];
        title.disabled = true;
        description.disabled = true;
        points.disabled = true;
        label.disabled = true;
        assignee.disabled = true;
        taskId.value = id;

        pointsToRemove = points.value
        deleteTaskBtn.addEventListener('click', delHandler);
    }

    function delHandler(e) {
        // Reset form
        form.reset();
        // Reset label field
        e.currentTarget.parentNode.parentNode.children[3].children[1].value = '';
        // Remove DOM element
        document.getElementById(taskId.value).remove();
        taskId.removeAttribute('value')
        title.disabled = false;
        description.disabled = false;
        points.disabled = false;
        label.disabled = false;
        assignee.disabled = false;

        createTaskBtn.disabled = false;
        deleteTaskBtn.disabled = true;
        totalPoints -= pointsToRemove
        totalPointsValue.textContent = `Total Points ${totalPoints}pts`



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

        if (id) {
            htmlElement.id = id;
        }

        if (classes) {
            htmlElement.classList.add(...classes);
        }

        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }

        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key]);
            }
        }
        return htmlElement;
    }
}