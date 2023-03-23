function generateReport() {
    const checkedPropRef = Array.from(document.querySelectorAll('thead > tr > th > input:checked'));
    const dataRef = Array.from(document.querySelectorAll('tbody > tr'));


    let checkedProperties = [];
    for (let line of checkedPropRef) {
        checkedProperties.push(line.name)
    }

    let output = [];
    
    for (let row of dataRef) {
        let rowTd = row.querySelectorAll('td')
        
        let dataCurrentRow = hardCode(rowTd);

        let tempObj = {};
        
        for (let word of checkedProperties) {
            let text = Object.entries(dataCurrentRow).filter( arr => arr.includes(word))[0][1]
            tempObj[word] = text
            
        }

        output.push(tempObj)
    }

    document.getElementById('output').value = JSON.stringify(output, null, 2);

    function hardCode( rowTd) {
        let ref = Array.from(document.querySelectorAll('thead > tr > th > input'));
        let result = {}
        for ( let i = 0; i < ref.length; i += 1) {
            let nameKey = ref[i]
            let key = nameKey.name   
            result[key] = rowTd[i].textContent
        }
        return result;
    }
}

// function generateReport() {
//     let checkboxes = document.querySelectorAll('table>thead>tr>th>input');
//     let rows = document.querySelectorAll('tbody>tr');
//     let output = [];

//     for (let i = 0; i < rows.length; i++) {
//         let obj = {};
//         let values = Array.from(rows[i].getElementsByTagName('td')).map(el => el.textContent);
//         for (let j = 0; j < checkboxes.length; j++) {
//             if (checkboxes[j].checked) {
//                 obj[checkboxes[j].name] = values[j];
//             }
//         }
//         output.push(obj);

//     }
//     document.querySelector('#output').value = JSON.stringify(output, null, 2);
// }
