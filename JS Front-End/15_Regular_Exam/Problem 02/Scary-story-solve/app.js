window.addEventListener("load", solve);

function solve() {

    inputDomSelectors = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        age: document.getElementById('age'),
        storyTitle: document.getElementById('story-title'),
        genre: document.getElementById('genre'),
        story: document.getElementById('story')
    }

    otherDomSelectors = {
        formBtn: document.getElementById('form-btn'),
        previewList: document.getElementById('preview-list'),
        formRef: document.querySelector('form'),
        main: document.getElementById('main')
    }

    otherDomSelectors.formBtn.addEventListener('click', publishHandler)
    let container = {}

    function publishHandler(event) {
        if (event) {
            event.preventDefault()
        }

        let allInputsAreNonEmpty = Object.values(inputDomSelectors)
            .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
            console.log("HAS INVALID");
            return;
            }
        container = {
            firstName: inputDomSelectors.firstName.value,
            lastName: inputDomSelectors.lastName.value,
            age: inputDomSelectors.age.value,
            storyTitle: inputDomSelectors.storyTitle.value,
            genre: inputDomSelectors.genre.value,
            story: inputDomSelectors.story.value
            }

        const li =  createElement('li', null, otherDomSelectors.previewList, null, ['story-info']);
        const article = createElement('article', null, li);
        createElement('h4', `Name: ${container.firstName} ${container.lastName}`, article);
        createElement('p', `Age: ${container.age}`, article);
        createElement('p', `Title: ${container.storyTitle}`, article);
        createElement('p', `Genre: ${container.genre}`, article);
        createElement('p', `${container.story}`, article);

        let saveBtn = createElement('button', 'Save Story', li, null, ['save-btn']);
        let editBtn = createElement('button', 'Edit Story', li, null, ['edit-btn']);
        let deleteBtn = createElement('button', 'Delete Story', li, null, ['delete-btn']);


        otherDomSelectors.formRef.reset()
        otherDomSelectors.formBtn.setAttribute('disabled', true)
        
        saveBtn.addEventListener('click', saveHandler);
        editBtn.addEventListener('click', editHandler);
        deleteBtn.addEventListener('click', deleteHandler);

        }

    function saveHandler(event) {
        if (event) {
            event.preventDefault()
        }
        otherDomSelectors.main.innerHTML = '<h1>Your scary story is saved!</h1>'
    }

    function editHandler(event) {
        if (event) {
            event.preventDefault()
        }

        for (const key in container) {
            inputDomSelectors[key].value = container[key]
        }

        let item = otherDomSelectors.previewList.querySelector('li');
        item.remove()
        otherDomSelectors.formBtn.removeAttribute('disabled')

    }

    function deleteHandler(event) {
        if (event) {
            event.preventDefault()
        }
        
        let item = otherDomSelectors.previewList.querySelector('li');
        item.remove()
        otherDomSelectors.formBtn.removeAttribute('disabled')
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
