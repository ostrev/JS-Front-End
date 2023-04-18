window.addEventListener('load', solve);

function solve() {
    const inputDOMSelectors = {
        genre: document.getElementById('genre'),
        name: document.getElementById('name'),
        author: document.getElementById('author'),
        date: document.getElementById('date'),
    }

    const otherDOMSelectors = {
        addBtn: document.getElementById('add-btn'),
        sectionAllHits: document.getElementById('all-hits'),
        divAllHits: document.querySelector('.all-hits-container'),

        sectionSavedHits: document.getElementById('saved-hits'),
        divSave: document.querySelector('.saved-container'),

        sectionTotalLikes: document.getElementById('total-likes'),
        likes: document.querySelector('.likes > p'),

        formRef: document.querySelector('form')
    }

    otherDOMSelectors.addBtn.addEventListener('click', addHandler);

    let container = {}
    let totalLikes = 0

    function addHandler(event) {
        if (event) {
            event.preventDefault()
        }
        let allInputsAreNonEmpty = Object.values(inputDOMSelectors)
            .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
            console.log("HAS INVALID");
            return;
        }

        const {genre, name, author, date} = inputDOMSelectors;
        const div = createElement('div', null, otherDOMSelectors.divAllHits, null, ['hits-info']);
        createElement('img', null, div, null, null, {src: './static/img/img.png'});
        createElement('h2', `Genre: ${genre.value}`, div);
        createElement('h2', `Name: ${name.value}`, div);
        createElement('h2', `Author: ${author.value}`, div);
        createElement('h3', `Date: ${date.value}`, div);
        const saveBtn = createElement('button', 'Save song', div, null, ['save-btn']);
        const likeBtn = createElement('button', 'Like song', div, null, ['like-btn']);
        const deleteBtn = createElement('button', 'Delete', div, null, ['delete-btn']);

        otherDOMSelectors.formRef.reset()


        saveBtn.addEventListener('click', saveHandler);
        likeBtn.addEventListener('click', likeHandler);
        deleteBtn.addEventListener('click', deleteHandler);
    }

    function saveHandler(event) {
        if (event) {
            event.preventDefault()
        }

        const item = event.currentTarget.parentNode
        otherDOMSelectors.divSave.appendChild(item)

        const remSaveBtn = event.currentTarget.parentNode.querySelector('.save-btn');
        const remLikeBtn = event.currentTarget.parentNode.querySelector('.like-btn');

        remLikeBtn.remove();
        remSaveBtn.remove();
    }
    function likeHandler(event) {
        if (event) {
            event.preventDefault()
        }
        const currentBtn = event.currentTarget
        totalLikes += 1
        otherDOMSelectors.likes.textContent = `Total Likes: ${totalLikes}`
        currentBtn.setAttribute('disabled', true)
    }
    function deleteHandler(event) {
        if (event) {
            event.preventDefault()
        }
        const item = event.currentTarget.parentNode
        item.remove()
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
