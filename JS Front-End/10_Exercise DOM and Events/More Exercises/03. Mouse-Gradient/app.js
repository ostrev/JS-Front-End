function attachGradientEvents() {
    const divRef = document.getElementById('gradient');
    const divResultRef = document.getElementById('result');
    divRef.addEventListener('mousemove', handlerMouseover);
    divRef.addEventListener('mouseout', handlerMouseOut);

    function handlerMouseover(event) {
    
        let area = event.offsetX / (event.target.clientWidth - 1);
        area = Math.trunc(area * 100);
        divResultRef.textContent = `${area}%`;

    }

    function handlerMouseOut(event) {
        divResultRef.textContent = '';

    }
}