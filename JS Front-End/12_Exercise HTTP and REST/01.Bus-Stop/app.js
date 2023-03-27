function getInfo() {
    const inputId = document.getElementById('stopId').value;
    const stopNameRef = document.getElementById('stopName');
    const busesRef = document.getElementById('buses');

    const BASE_URL = 'http://localhost:3030/jsonstore/bus/businfo/';
    let url = `${BASE_URL}${inputId}`;

    fetch(url, { method: 'GET' })
        .then(handlerResponse)
        .then(handlerData)
        .catch(handlerError)

    function handlerResponse(response) {

        return response.json();

    }

    function handlerData(data) {
        debugger
        const { name, buses } = data;
        stopNameRef.textContent = name
        
        for (let bus in buses) {
            li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${buses.bus} minutes`;
            busesRef.appendChild(li)
        }
        
    }

    function handlerError(error) {
        stopNameRef.textContent = 'Error'

    }
}