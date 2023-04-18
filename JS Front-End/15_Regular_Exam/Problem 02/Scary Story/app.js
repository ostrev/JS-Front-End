window.addEventListener("load", solve);

function solve() {
    const inputDomSelectors = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        age: document.getElementById('age'),
        storyTitle: document.getElementById('story-title'),
        genre: document.getElementById('genre'),
        story: document.getElementById('story')
    }

    const otherDomSelectors = {
        publishBtn: document.getElementById('form-btn'),
        previewList: document.getElementById('preview-list'),
        formRef: document.querySelector('form'),
        mainDiv: document.getElementById('main')

    }

    otherDomSelectors.publishBtn.addEventListener('click', publishHandler);
    let inputData = {}
    
    function publishHandler(event) {
        if (event) {
            event.preventDefault();
        }

        let allInputsAreNonEmpty = Object.values(inputDomSelectors)
            .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
            console.log("HAS INVALID");
            return;
        }
        inputData = {
            firstName: inputDomSelectors.firstName.value,
            lastName: inputDomSelectors.lastName.value,
            age: inputDomSelectors.age.value,
            storyTitle: inputDomSelectors.storyTitle.value,
            genre: inputDomSelectors.genre.value,
            story: inputDomSelectors.story.value
        }

        let li = createElement('li', null, otherDomSelectors.previewList, null, ['story-info']);
        let article = createElement('article', null, li);
        createElement('h4', `Name: ${inputData.firstName} ${inputData.lastName}`, article);
        createElement('p', `Age: ${inputData.age}`, article);
        createElement('p', `Title: ${inputData.storyTitle}`, article);
        createElement('p', `Genre: ${inputData.genre}`, article);
        createElement('p', `${inputData.story}`, article);

        let saveBtn = createElement('button', 'Save Story', li, null, ['save-btn']);
        let editBtn = createElement('button', 'Edit Story', li, null, ['edit-btn']);
        let deleteBtn = createElement('button', 'Delete Story', li, null, ['delete-btn']);

        saveBtn.addEventListener('click', saveHandler);
        editBtn.addEventListener('click', editHandler);
        deleteBtn.addEventListener('click', deleteHandler);


        otherDomSelectors.formRef.reset()
        otherDomSelectors.publishBtn.setAttribute('disabled', true)
    }

    function saveHandler() {
        otherDomSelectors.mainDiv.innerHTML = '';
        createElement('h1', 'Your scary story is saved!', otherDomSelectors.mainDiv)
    }

    function editHandler() {
        for (const key in inputData) {
            inputDomSelectors[key].value = inputData[key];
        }

        otherDomSelectors.previewList.innerHTML = '<h3>Preview</h3>'

        otherDomSelectors.publishBtn.disabled = false
    }

    function deleteHandler() {
        document.querySelector('#preview-list > li').remove()
        otherDomSelectors.publishBtn.disabled = false
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
