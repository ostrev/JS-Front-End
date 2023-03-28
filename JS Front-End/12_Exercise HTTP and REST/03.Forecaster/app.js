function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/forecaster/';
    const btn = document.getElementById('submit');
    const conditionsContainer = document.getElementById('forecast')
    const currentConditionsRef = document.querySelector('#current')
    const upcomingConditionsRef = document.querySelector('#upcoming')
    btn.addEventListener('click', handler);
    let code = ''

    function handler() {
        fetch(`${BASE_URL}locations`)
            .then((res) => res.json())
            .then(getLocation)
            .catch(err => {
                conditionsContainer.style.display = 'block'
                conditionsContainer.textContent = err.message
            })
    }

    function getLocation(data) {
        const location = document.getElementById('location').value;
        for (let obj of data) {
            if (obj.name === location) {
                code = obj.code
                break
            }
        }
        if (code === '') {
            throw new Error('Error3')
        }

        fetch(`${BASE_URL}today/${code}`)
            .then((res) => res.json())

            .then(currentCondition => {
                console.log(currentCondition)
                
                let symbolCode = getSymbol(currentCondition.forecast.condition)

                conditionsContainer.style.display = 'block';
                // Create Forecast Container div
                let forecastDiv = document.createElement('div')
                forecastDiv.classList.add('forecasts');

                // Create Condition Symbol Span and append it to the div
                let conditionSymbolSpan = document.createElement('span');
                conditionSymbolSpan.classList.add('condition');
                conditionSymbolSpan.classList.add('symbol');
                let textNote = document.createTextNode(`${symbolCode}`);
                conditionSymbolSpan.appendChild(textNote);
                forecastDiv.appendChild(conditionSymbolSpan);
                // Create Condition Span, loop and append the spans inside. Append it to the div
                let {forecast, name} = currentCondition;
                let conditionSpan = document.createElement('span');
                conditionSpan.classList.add('condition');

                let firstForecastDataSpan = document.createElement('span');
                firstForecastDataSpan.classList.add('forecast-data');
                firstForecastDataSpan.textContent = name;
                conditionSpan.appendChild(firstForecastDataSpan);

                let secondForecastDataSpan = document.createElement('span');
                secondForecastDataSpan.classList.add('forecast-data');
                secondForecastDataSpan.textContent = `${forecast.low}°/${forecast.high}°`;
                conditionSpan.appendChild(secondForecastDataSpan);

                let thirdForecastDataSpan = document.createElement('span');
                thirdForecastDataSpan.classList.add('forecast-data');
                thirdForecastDataSpan.textContent = forecast.condition;
                conditionSpan.appendChild(thirdForecastDataSpan);

                forecastDiv.appendChild(conditionSpan);

                // Append all info in Forecast div
                currentConditionsRef.appendChild(forecastDiv)
            })
            .catch(err => {
                conditionsContainer.style.display = 'block';
                conditionsContainer.textContent = 'Error1';
            })

        fetch(`${BASE_URL}upcoming/${code}`)
            .then((res) => res.json())
            .then(upcomingCondition => {
                conditionsContainer.style.display = 'block';
                // Create Forecast-info Container div
                let forecastInfoDiv = document.createElement('div')
                forecastInfoDiv.classList.add('forecast-info');

                // Create Upcoming Span, loop and append the spans inside. Append it to the div
                let {forecast, name} = upcomingCondition;
                

                for (let element of forecast) {
                    let conditionSpan = document.createElement('span');
                    conditionSpan.classList.add('upcoming');

                    let firstSpan = document.createElement('span');
                    firstSpan.classList.add('symbol');
                    let symbolCode = getSymbol(element.condition)
                    firstSpan.textContent = symbolCode;
                    conditionSpan.appendChild(firstSpan);
                    // debugger
                    let secondSpan = document.createElement('span');
                    secondSpan.classList.add('forecast-data');
                    secondSpan.textContent = `${element.low}°/${element.high}°`;
                    conditionSpan.appendChild(secondSpan);

                    let thirdSpan = document.createElement('span');
                    thirdSpan.classList.add('forecast-data');
                    thirdSpan.textContent = element.condition;
                    conditionSpan.appendChild(thirdSpan);

                    forecastInfoDiv.appendChild(conditionSpan)
                    
                }
                
                upcomingConditionsRef.appendChild(forecastInfoDiv);
            })
            .catch(err => {
                conditionsContainer.style.display = 'block';
                conditionsContainer.textContent = 'Error2';
            })
    }

    function getSymbol(symbol) {
        let symbolCode = ''
        if (symbol === 'Sunny') {
            symbolCode = '☀'
        } else if (symbol === 'Partly sunny') {
            symbolCode = '⛅'
        } else if (symbol === 'Overcast') {
            symbolCode = '☁'
        } else if (symbol === 'Rain') {
            symbolCode = '☂'
        }
        return symbolCode;
    }
}

attachEvents();