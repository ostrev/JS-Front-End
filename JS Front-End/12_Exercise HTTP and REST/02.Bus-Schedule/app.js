function solve() {
    const btnDepartRef = document.getElementById('depart');
    const btnArriveRef = document.getElementById('arrive');
    const containerRef = document.getElementsByClassName('info')[0];
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';
    let arrivingStop = 'Depot'
    let nextStop = 'Depot'

    function depart() {

        fetch(`${BASE_URL}${nextStop}`)
            .then(response => response.json())
            .then(data => {
                arrivingStop = nextStop
                containerRef.textContent = `Next stop ${data.name}`
                btnDepartRef.disabled = true;
                btnArriveRef.disabled = false;
                nextStop = data.next
            })
    }

    async function arrive() {
        containerRef.textContent = `Arriving at ${arrivingStop}`
        btnDepartRef.disabled = false;
        btnArriveRef.disabled = true;
        
    }

    return {
        depart,
        arrive
    };
}

let result = solve();