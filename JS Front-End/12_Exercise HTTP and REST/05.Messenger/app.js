function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/messenger';
   
    const btnSend = document.querySelector('#submit');
    const btnRefresh = document.querySelector('#refresh');

    btnSend.addEventListener('click', handlerSend);
    btnRefresh.addEventListener('click', handlerRefresh);

    function handlerSend() {
        const name = document.querySelector("[name='author']").value;
        const message = document.querySelector("[name='content']").value;
      

        let newObject = {
            author: name,
            content: message
        }

        fetch(BASE_URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newObject)
            })
            .then((res) => {
                if (res.ok == false) {
                    throw new Error('Error creating new record');
                }

                return res.json();
            })

            .catch(err => alert(err))

        document.querySelector("[name='author']").value = '';
        document.querySelector("[name='content']").value = '';
    }


    function handlerRefresh() {
        const textAreaRef = document.getElementById('messages');

        fetch(BASE_URL)
            .then((res) => {
                if (res.ok == false) {
                    throw new Error('Error')
                }
                return res.json()
            })

            .then((data) => {
                let comments = []
                Object.values(data)
                .forEach(obj => {
                    comments.push(`${obj.author}: ${obj.content}`)
                })
                textAreaRef.value = comments.join('\n')

            })
            .catch((err) => alert(err))
    }
}

attachEvents();