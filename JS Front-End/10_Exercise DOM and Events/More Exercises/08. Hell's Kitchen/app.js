function solve() {

    document.querySelector('#btnSend').addEventListener('click', onClick);

    function onClick() {
        
        const input = JSON.parse(document.getElementsByTagName('textarea')[0].value)
        
        let restaurantsObj = {};
        debugger
        for (let restaurant of input) {
            let [name, data] = restaurant.split(' - ')
            let workersSalary = data.split(', ')
            let workers = {};
            
            for (let line of workersSalary) {
                let [worker, salary] = line.split(' ');
                workers[worker] = Number(salary);
                if (!restaurantsObj.hasOwnProperty(name)) {
                    restaurantsObj[name] = {};
                    restaurantsObj[name][worker] = Number(salary);
                } else {
                    restaurantsObj[name][worker] = Number(salary);
                }
            }
        }
            
        debugger
        let bestRestaurantObj = {};
        let bestRest = Object.entries(restaurantsObj)
        
        for (let obj of bestRest) {
            let nameR = obj[0]
            let val = Object.values(obj[1])
            let average = (val.reduce((partialSum, a) => partialSum + a, 0) / val.length).toFixed(2);
            bestRestaurantObj[nameR] = average;
        }

        let outputRest = Object.entries(bestRestaurantObj).sort((a, b) => b[1] - a[1]);

        let workerBestSalary = Object.values(restaurantsObj[outputRest[0][0]]).sort((a, b) => b - a)[0];

        let resultBestRest = `Name: ${outputRest[0][0]} Average Salary: ${outputRest[0][1]} Best Salary: ${workerBestSalary.toFixed(2)}`

        document.querySelector('#bestRestaurant > p').textContent = resultBestRest
    
        debugger
        let secondResult = ''
        let workersOfRest = Object.entries(restaurantsObj[outputRest[0][0]]).sort((a, b) => b[1] - a[1]);
        for (let wor of workersOfRest) {
            secondResult += `Name: ${wor[0]} With Salary: ${wor[1]} `
        }
        document.querySelector('#workers > p').textContent = secondResult
    }
}



