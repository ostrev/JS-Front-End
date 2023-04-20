window.addEventListener('load', solve);

function solve() {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const lebel = document.getElementById('label');
   const estimationPoints = document.getElementById("points");
    const assignee = document.getElementById("assignee");
    const taskIDinput = document.getElementById("task-id");

    const totalSprintPoints = document.getElementById("total-sprint-points");
    const taskSection = document.getElementById("tasks-section")

    const createBtn = document.getElementById("create-task-btn");
    const deleteBtn = document.getElementById("delete-task-btn");

    let totalNumberOfTasks = 0;
    let totalPoints = 0;
    let allTasks = {};
    totalSprintPoints.innerText = `Total Points ${totalPoints}pts`;

    createBtn.addEventListener ("click", addEventHandler);
    deleteBtn.addEventListener("click", deleteTaskHandler)

    function addEventHandler (event) {
        if (event) {
            event.preventDefault();
        }

    let titleValue = title.value;
    let descriptionValue = description.value;
    let lebelValue = lebel.value;
    let estimationPointsValue = estimationPoints.value
    let assigneeValue = assignee.value;

    if (titleValue === '' || descriptionValue === '' || 
    lebelValue === '' || estimationPointsValue === '' || assigneeValue === '') {
    return;
    } 
    totalNumberOfTasks += 1;
    let taskId = `task-${totalNumberOfTasks}`;
    allTasks[taskId] = {titleValue, descriptionValue, lebelValue, estimationPointsValue, assigneeValue};

    const article = createElement ("article", taskSection, null, ["task-card"], taskId);
    const divTask = createElement("div", article, "", ["task-card-label"])
    
    if (lebelValue === "Feature") {
    divTask.innerHTML = `Feature &#8865`;
    divTask.classList.add('feature');
    }
    if (lebelValue === "Low Priority Bug") {
        divTask.innerHTML = `Low Priority Bug &#9737`
        divTask.classList.add('low-priority');
    }
    if (lebelValue === "High Priority Bug") {
        divTask.innerHTML = `High Priority Bug &#9888`
        divTask.classList.add('high-priority');
    }

    createElement("h3", article, titleValue, ["task-card-title"]);
    createElement("p", article, descriptionValue, ["task-card-description"]);
    createElement("div", article, `Estimated at ${estimationPointsValue} pts`, ["task-card-points"]);
    createElement("div", article, `Assigned to: ${assigneeValue}`, ['task-card-assignee']);
    const divDeleteBtn = createElement("div", article, null, ["task-card-actions"])
    const deleteBtn2 = createElement("button", divDeleteBtn, "Delete")

    deleteBtn2.addEventListener("click", moveTaskHandler);

    title.value = '';
    description.value = '';
    lebel.value = '';
    estimationPoints.value = '';
    assignee.value = '';

    totalPoints += Number (estimationPointsValue);
   totalSprintPoints.innerText = `Total Points ${totalPoints}pts`;

    }

    function moveTaskHandler() {
    const articleId = this.parentNode.parentNode.id;

    currentTask = allTasks[articleId];

    title.value = currentTask['titleValue'];
    description.value = currentTask['descriptionValue'];
    lebel.value = currentTask["lebelValue"];
    estimationPoints.value = currentTask["estimationPointsValue"];
    assignee.value = currentTask["assigneeValue"];

    title.disabled = true;
    description.disabled = true;
    lebel.disabled = true;
    estimationPoints.disabled = true;
    assignee.disabled = true;

    taskIDinput.value = articleId.split('-')[1];
    
    createBtn.disabled = true;
    deleteBtn.removeAttribute("disabled");
   
    }

    function deleteTaskHandler (event) {
if (event) {
    event.preventDefault();
}

        let Id = "task-" + taskIDinput.value;
        
        
        totalPoints -= Number (estimationPoints.value);
        
        totalSprintPoints.innerText = `Total Points ${totalPoints}pts`;

        const articleToDelete = document.getElementById(Id);
        
        articleToDelete.remove();
        title.removeAttribute('disabled');
        description.removeAttribute('disabled');
        lebel.removeAttribute('disabled');
        estimationPoints.removeAttribute('disabled');
        assignee.removeAttribute('disabled');
        title.value = '';
        description.value = '';
        lebel.value = '';
        estimationPoints.value = '';
        assignee.value = '';
        taskIDinput.value = '';

        createBtn.removeAttribute('disabled');
        deleteBtn.setAttribute("disabled", true);


    }




    
    function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    
        const htmlElement = document.createElement(type);
        if (content && useInnerHtml) {
          htmlElement.innerHTML = content;
        } else  { 
        if (content && type !== "input") {
         htmlElement.textContent = content;
        } 
        if (content && type === 'input' ) {
          htmlElement.value = content;
        }
      }
    
      if (classes && classes.length > 0) {
        htmlElement.classList.add(... classes)
      }
      if (id) {
        htmlElement.id = id;
      }
    
      // src: 'link', href: 'http'
      if (attributes) {
        for (const key in attributes) {
          htmlElement.setAttribute(key, attributes[key])
        }
      }
       if (parentNode) {
        parentNode.appendChild(htmlElement);
       }
      
        
        return htmlElement;
      }

}