function solve (input) {
    const numberOfParameters = input.shift();
    let container = {}

    let totalPints = {
        'ToDo': 0, 
        'In Progress': 0,
        'Code Review': 0,
        'Done Points': 0

    }
   
    for (let i = 0; i < numberOfParameters; i += 1) {
        let data = input.shift();
        let [assignee, taskId, title, status, estimatedPoints ] = data.split(':')
        if (assignee in container) {
            let temp = {taskId, title, status, estimatedPoints }
            container[assignee].push(temp)
        } else {
            container[assignee] = [{taskId, title, status, estimatedPoints }]
        } 
    }

    for (let line of input) {
    
        let commands = line.split(':');

        if (commands[0] === 'Add New') {
            add(commands[1], commands[2], commands[3], commands[4], commands[5]);
        }

        if (commands[0] === 'Change Status') {
            change(commands[1], commands[2], commands[3]);
        }

        if (commands[0] === 'Remove Task') {
            remove(commands[1], commands[2]);
        }
    }

    function add(assignee, taskId, title, status, estimatedPoints) {
        if (assignee in container) {
            let temp = {taskId, title, status, estimatedPoints }
            container[assignee].push(temp)
        } else {
            console.log(`Assignee ${assignee} does not exist on the board!`)
        }
    }

    function change(assignee, taskId, newStatus) {
        let checkBool = false
        if (assignee in container) {
            let tasks = container[assignee]
            for (let i = 0; i < container[assignee].length ; i += 1) {
                if (container[assignee][i].taskId === taskId) {
                    container[assignee][i].status = newStatus
                    checkBool = false
                    break
                } else {
                    checkBool = true
                }

            }
            if (checkBool) {
                console.log(`Task with ID ${taskId} does not exist for ${assignee}!`)
            }
            
        } else {
            console.log(`Assignee ${assignee} does not exist on the board!`)
        }
    }

    function remove(assignee, index) {
        if (assignee in container) {
            let tempLen = container[assignee].length
            if (index < 0 || index >= tempLen) {
                console.log('Index is out of range!')
            } else {
                container[assignee].splice(index, 1)
            }
        } else {
            console.log(`Assignee ${assignee} does not exist on the board!`)
        }
    }

    for (let assignee in container) {
        for (let task of container[assignee]) {
            if (task.status === 'ToDo' ) {
                totalPints['ToDo'] += Number(task.estimatedPoints)
            }
            if (task.status === 'In Progress' ) {
                totalPints['In Progress'] += Number(task.estimatedPoints)
            }
            if (task.status === 'Code Review' ) {
                totalPints['Code Review'] += Number(task.estimatedPoints)
            }
            if (task.status === 'Done' ) {
                totalPints['Done Points'] += Number(task.estimatedPoints)
            }
        }

    }
    let allPoint = 0
    for (let key in totalPints) {
        allPoint += totalPints[key]
        console.log(`${key}: ${totalPints[key]}pts`)
    }

    allPoint -= totalPints['Done Points']

    if (totalPints['Done Points'] >= allPoint ) {
        console.log('Sprint was successful!')
    } else {
        console.log('Sprint was unsuccessful...')
    }

}

solve(    [
    '5',
    'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
    'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
    'Peter:BOP-1211:POC:Code Review:5',
    'Georgi:BOP-1212:Investigation Task:Done:2',
    'Mariya:BOP-1213:New Account Page:In Progress:13',
    'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
    'Change Status:Peter:BOP-1290:ToDo',
    'Remove Task:Mariya:1',
    'Remove Task:Joro:1',
    ])

solve([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
])