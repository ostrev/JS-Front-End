function attachEvents() {
    const selectIDRef = document.getElementById('posts');
    const btnLoadPostsRef = document.getElementById('btnLoadPosts');
    const btnViewPostRef = document.getElementById('btnViewPost');
    const BASE_URL = 'http://localhost:3030/jsonstore/blog/';

    btnLoadPostsRef.addEventListener('click', handlerLoad);
    btnViewPostRef.addEventListener('click', handlerView);

    let postsObj = {};

    function handlerLoad() {
        fetch(`${BASE_URL}posts`)
            .then((response) => response.json())
            .then(getPosts)
            .catch((err) => console.error(err))
    }

    function getPosts(posts) {

        // check and delate posts not duplicates and reset comments title and body 
        const removePosts = Array.from(document.querySelectorAll('#posts > option'));
        for (let line of removePosts) {
            line.remove()
        }

        const removeComments = Array.from(document.querySelectorAll('#post-comments > li'));
        for (let line of removeComments) {
            line.remove()
        }
        document.getElementById('post-title').textContent = 'Post Details'
        document.getElementById('post-body').textContent = ''

        postsObj = posts
        
        for (let key in posts) {
            let optionValue = posts[key]['id']
            let optionText = posts[key]['title']
            createElement('option', optionText, optionValue, selectIDRef);
        }
    }

    function handlerView() {
        fetch(`${BASE_URL}comments`)
            .then((response) => response.json())
            .then(getComments)
            .catch((err) => console.error(err))
    }

    function getComments(comments) {
        const selectedOptionId = document.getElementById('posts').value;
        const postCommentsRef = document.getElementById('post-comments');

        // check and delate comments
        const removeComments = Array.from(document.querySelectorAll('#post-comments > li'));
        for (let line of removeComments) {
            line.remove()
        }
        
        for (const key in postsObj) {
            if (selectIDRef.value === postsObj[key]['id']) {
                document.getElementById('post-title').textContent = postsObj[key].title
                document.getElementById('post-body').textContent = postsObj[key].body
            }
        }
        
        for (let key in comments) {
            if (comments[key].postId === selectedOptionId) {
                let contentComment = comments[key].text
                let idComment = comments[key].id
                createElement('li', contentComment, '', postCommentsRef, idComment  )
            
            }

        }
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

        if (id) {
            htmlElement.id = id;
        }
        
        if (parentNode) {
            parentNode.appendChild(htmlElement);
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

attachEvents();

