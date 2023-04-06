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
        // event?.preventDefault();
        const {genre, name, author, date} = inputDomSelectors

        let allFieldsAreValid = Object.values(inputDomSelectors)
            .every((input) => input.value === '');
        if (allFieldsAreValid) {
            return
        }

        let newSong = createElement('div', null, null, otherDomSelectors.allHitsContainer, null, ['hits-info']);
        createElement('img', null, null, newSong, null, null, {src: "./static/img/img.png"});
        createElement('h2', `Genre: ${genre.value}`, null, newSong);
        createElement('h2', `Name: ${name.value}`, null, newSong);
        createElement('h2', `Author: ${author.value}`, null, newSong);
        createElement('h3', `Date: ${date.value}`, null, newSong);
        let saveBtn = createElement('button', 'Save song', null, newSong, null, ['save-btn']);
        let likeBtn = createElement('button', 'Like song', null, newSong, null, ['like-btn']);
        let deleteBtn = createElement('button', 'Delete', null, newSong, null, ['delete-btn']);

        document.querySelector('form').reset();
        
        saveBtn.addEventListener('click', saveHandler);
        likeBtn.addEventListener('click', likeHandler);
        deleteBtn.addEventListener('click', deleteHandler);
    }

    function saveHandler(event) {
        // event?.preventDefault();
        const divContainer = this.parentNode;
        const saveBtn = divContainer.querySelector('.save-btn');
        const likeBtn = this.parentNode.querySelector('.like-btn');
        otherDomSelectors.savedContainer.appendChild(divContainer);
        saveBtn.remove()
        likeBtn.remove()
    }

    function likeHandler(event) {
        // event?.preventDefault()
        
        totalLikes += 1;
        otherDomSelectors.likes.textContent = `Total Likes: ${totalLikes}`;
        this.setAttribute('disabled', true);
    }

    function deleteHandler(event) {
        // event?.preventDefault()
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

Unexpected error: expected 
'<imgsrc="./static/img/img.png"><h2>Genre:Pop</h2><h2>Name:PondeReplay</h2><h2>Author:Rihanna</h2><h2>Date:26.11.2009</h2><buttonclass="save-btn">Savesong</button><buttonclass="like-btn">Likesong</button><buttonclass="delete-btn">Delete</button>' to equal 
'<imgsrc="./static/img/img.png"><h2>Genre:Pop</h2><h2>Name:PondeReplay</h2><h2>Author:Rihanna</h2><h3>Date:26.11.2009</h3><buttonclass="save-btn">Savesong</button><buttonclass="like-btn">Likesong</button><buttonclass="delete-btn">Delete</button>'