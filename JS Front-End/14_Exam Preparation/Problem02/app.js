window.addEventListener('load', solve);

function solve() {
    const inputDomSelectors = {
        genre: document.getElementById('genre'),
        name: document.getElementById('name'),
        author: document.getElementById('author'),
        date: document.getElementById('date'),
    }
    const otherDomSelectors = {
        addBtn: document.getElementById('add-btn'),
        allHitsContainer: document.getElementsByClassName('all-hits-container')[0],
        savedContainer: document.getElementsByClassName('saved-container')[0],
        likes: document.querySelector('#total-likes > div > p')
    }

    otherDomSelectors.addBtn.addEventListener('click', addHandler);

    let totalLikes = 0
    
    function addHandler(event) {
        
        event.preventDefault();
        let allInputsAreNonEmpty = Object.values(inputDomSelectors)
        .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
        console.log("HAS INVALID");
        return;
        }

        const {genre, name, author, date} = inputDomSelectors
        let newSong = createElement('div', null, null, otherDomSelectors.allHitsContainer, null, ['hits-info']);
        createElement('img', null, null, newSong, null, null, {src: "./static/img/img.png"});
        createElement('h2', `Genre: ${genre.value}`, null, newSong);
        createElement('h2', `Name: ${name.value}`, null, newSong);
        createElement('h2', `Author: ${author.value}`, null, newSong);
        createElement('h3', `Date: ${date.value}`, null, newSong);
        let saveBtn = createElement('button', 'Save song', null, newSong, null, ['save-btn']);
        let likeBtn = createElement('button', 'Like song', null, newSong, null, ['like-btn']);
        let deleteBtn = createElement('button', 'Delete', null, newSong, null, ['delete-btn']);
        saveBtn.addEventListener('click', saveHandler);
        likeBtn.addEventListener('click', likeHandler);
        deleteBtn.addEventListener('click', deleteHandler);
        document.querySelector('form').reset();
    }

    function saveHandler() {
        const divContainer = this.parentNode;
        const saveBtn = divContainer.querySelector('.save-btn');
        const likeBtn = divContainer.querySelector('.like-btn');
        otherDomSelectors.savedContainer.appendChild(divContainer);
        saveBtn.remove();
        likeBtn.remove();

    }

    function likeHandler() {
        totalLikes += 1;
        otherDomSelectors.likes.textContent = `Total Likes: ${totalLikes}`;
        this.setAttribute('disabled', true);
    }

    function deleteHandler() {
        const divContainer = this.parentNode;
        divContainer.remove()

    }

    function createElement(type, content, value, parentNode, id, classes, attributes) {
        // type = string
        // content = string (text content)
        // id = string
        // classes = array of strings
        // attributes = object
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