function create(words) {
    const contentDivRef = document.getElementById('content');
    // debugger;
    for (let word of words) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        p.textContent = word;
        p.style.display = 'none';
        div.appendChild(p);
        contentDivRef.appendChild(div);
    }

    
    let divListenerRef = Array.from(document.querySelectorAll('#content div'));
    
    for (let divListener of divListenerRef) {
        divListener.addEventListener('click', handler);
    }

    function handler(event) {
        const divTrigger = event.target;
        divTrigger.children[0].style.display = 'block';
    }

}