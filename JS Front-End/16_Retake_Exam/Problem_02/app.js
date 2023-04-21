window.addEventListener("load", solve);

function solve() {
    const inputDomSelectors = {
        title: document.getElementById('task-title'),
        category: document.getElementById('task-category'),
        content: document.getElementById('task-content')
    }

    const otherDOMSelectors = {
        formRef: document.querySelector('form'),
        publishBtn: document.getElementById('publish-btn'),
        reviewList: document.getElementById('review-list'),
        publishedList: document.getElementById('published-list')


    }

    otherDOMSelectors.publishBtn.addEventListener('click', publishHandler);
    let container = {}

    function publishHandler(event) {
        if (event) {
            event.preventDefault();
        }    
    
        let areEmpty = Object.values(inputDomSelectors)
        .every((input) => input.value !== '');
    
        if (!areEmpty) {
        console.log("Empty input");
        return;
        }

        let li = createElement('li', null, otherDOMSelectors.reviewList, null, ['rpost'])
        let article = createElement('article', null, li);
        createElement('h4', `${inputDomSelectors.title.value}`, article);
        createElement('p', `Category: ${inputDomSelectors.category.value}`, article);
        createElement('p', `Content: ${inputDomSelectors.content.value}`, article);
        let editBtn = createElement('button', 'Edit', li, null, ['action-btn', 'edit'])
        let postBtn = createElement('button', 'Post', li, null, ['action-btn', 'post'])

        container = {
            title: inputDomSelectors.title.value,
            category: inputDomSelectors.category.value,
            content: inputDomSelectors.content.value
        }

        editBtn.addEventListener('click', editHandler);
        postBtn.addEventListener('click', postHandler);

        otherDOMSelectors.formRef.reset()
    }

    function editHandler(event) {
        if (event) {
            event.preventDefault();
        } 
        
        const parentForDel = event.currentTarget.parentNode
        parentForDel.remove()

        for (const key in container) {
            inputDomSelectors[key].value = container[key]
        }
    }

    function postHandler(event) {
        if (event) {
            event.preventDefault();
        }

        const liForMove = event.currentTarget.parentNode
        otherDOMSelectors.publishedList.appendChild(liForMove);
        const butEdit = liForMove.children[1]
        const butPost = liForMove.children[2]
        butEdit.remove()
        butPost.remove()



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
