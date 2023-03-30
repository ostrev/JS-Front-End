function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/collections/books';
    const loadBooksBtnRef = document.getElementById('loadBooks');
    const titleInputRef = document.querySelector('[name="title"]');
    // da promenq selektorite
    const authorInputRef = document.querySelector('[name="author"]');
    const submitBtnRef = document.querySelector('#form > button');
    const formRef = document.querySelector('#form > h3');


    loadBooksBtnRef.addEventListener('click', handlerLoad);
    submitBtnRef.addEventListener('click', handlerSubmit);

    let library = {};
    let currentEditId = null;
    function handlerLoad() {
        const tableBodyRef = document.querySelector('table > tbody');
        formRef.textContent = 'FORM';
        submitBtnRef.textContent = 'Submit'
        titleInputRef.value = '';
        authorInputRef.value = '';


        tableBodyRef.innerHTML = ''
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                library = data
                for (let key in data) {
                    let { author, title } = data[key]
                    let rowTextContent = `<tr>
          <td>${title}</td>
          <td>${author}</td>
          <td>
              <button id="${key}" name="edit">Edit</button>
              <button id="${key}" name="delete">Delete</button>
          </td>
          </tr>`
                    tableBodyRef.innerHTML += rowTextContent
                }

                document.querySelectorAll('[name="edit"]').forEach(item => {
                    item.addEventListener('click', event => {
                        let idEditBtn = event.currentTarget.id;
                        formRef.textContent = 'Edit FORM';
                        submitBtnRef.textContent = 'Save'
                        for (let key in library) {
                            if (key === idEditBtn) {
                                titleInputRef.value = library[key].title;
                                authorInputRef.value = library[key].author;
                                currentEditId = key
                                break
                            }
                        }
                        console.log(idEditBtn)
                    })
                })

                document.querySelectorAll('[name="delete"]').forEach(item => {
                    item.addEventListener('click', event => {
                        let idDelBtn = event.currentTarget.id
                        console.log(idDelBtn)
                        fetch(`${BASE_URL}/${idDelBtn}`, { method: 'DELETE' })
                            .then(() => { })
                            .then(handlerLoad)
                            .catch((err) => console.error(err))
                    })
                })

            })
            .catch((err) => console.error(err))
    }
    function handlerSubmit() {
        let title2 = titleInputRef.value
        let author2 = authorInputRef.value
        if (formRef.textContent === 'FORM' && title2 !== '' && author2 !== '') {
            fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify({
                    'author': author2,
                    'title': title2
                })
            })
                .then(() => {
                    handlerLoad()
                })
                .catch((err) => console.error(err))

        } else if (formRef.textContent === 'Edit FORM' && titleInputRef.value !== '' && authorInputRef.value !== '') {
            fetch(`${BASE_URL}/${currentEditId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'author': authorInputRef.value,
                    'title': titleInputRef.value
                })
            })
                .then(handlerLoad)
                .catch((err) => console.error(err))
        } else {
            return
        }
    }

}

attachEvents();



