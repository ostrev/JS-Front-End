window.addEventListener("load", solve);

function solve() {
    const publishBtn = document.getElementById('form-btn');

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const age = document.getElementById('age');
    const storyTitle = document.getElementById('story-title');
    const genre = document.getElementById('genre');
    const story = document.getElementById('story');
    const preview = document.getElementById('preview-list');


    publishBtn.addEventListener('click', handlerPublish);

    let collectionInputs = {};

    function handlerPublish(event) {
        if (event) {
            event.preventDefault();
        }
        collectionInputs = {
            'firstName': firstName.value,
            'lastName': lastName.value,
            'age': age.value,
            'storyTitle': storyTitle.value,
            'genre': genre.value,
            'story': story.value
        }

        for (let value of Object.values(collectionInputs)) {
            if (value === '') {
                return
            }
        }

        let li = createElement('li', '', '', preview, '', ['story-info']);
        let article = createElement('article', '', '', li);
        createElement('h4', `Name: ${firstName.value} ${lastName.value}`, '', article);
        createElement('p', `Age: ${age.value}`, '', article);
        createElement('p', `Title: ${storyTitle.value}`, '', article);
        createElement('p', `Genre: ${genre.value}`, '', article);
        createElement('p', `${story.value}`, '', article);
        let saveBtn = createElement('button', 'Save Story', '', li, '', ['save-btn']);
        let editBtn = createElement('button', 'Edit Story', '', li, '', ['edit-btn']);
        let deleteBtn = createElement('button', 'Delete Story', '', li, '', ['delete-btn']);

        saveBtn.addEventListener('click', handlerSave);
        editBtn.addEventListener('click', handlerEdit);
        deleteBtn.addEventListener('click', handlerDelete);

        firstName.value = '';
        lastName.value = '';
        age.value = '';
        storyTitle.value = '';
        genre.value = '';
        story.value = '';

        publishBtn.setAttribute('disabled', true)
    }

    function handlerSave(event) {
        if (event) {
            event.preventDefault();
        }
        let main = document.getElementById('main');
        main.innerHTML = '';
        createElement('h1', "Your scary story is saved!", '', main)


    }

    function handlerEdit(event) {
        if (event) {
            event.preventDefault();
        }
        preview.innerHTML = '<h3>Preview</h3>';
        publishBtn.removeAttribute('disabled');
        firstName.value = collectionInputs.firstName;
        lastName.value = collectionInputs.lastName;
        age.value = collectionInputs.age;
        storyTitle.value = collectionInputs.storyTitle;
        genre.value = collectionInputs.genre;
        story.value = collectionInputs.story;
    }

    function handlerDelete(event) {
        if (event) {
            event.preventDefault();
        }

        publishBtn.removeAttribute('disabled');
        preview.innerHTML = '<h3>Preview</h3>';
    }

    function createElement(type, content, value, parentNode, id, classes, attributes) {
        const htmlElement = document.createElement(type);
    
        if (content && type !== 'input') {
            htmlElement.textContent = content;
        }
        
        if (content && type === 'input') {
            htmlElement.value = content;
        }
    
        if (value) {
            htmlElement.value = value
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
