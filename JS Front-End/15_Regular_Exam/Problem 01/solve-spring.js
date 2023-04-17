function solve(input) {
    const number = input.shift();
    let sprintBoard = {}
    let totalPoints = {
        ToDo: 0,
        inProgress: 0,
        codeReview: 0,
        donePoints: 0,
        total: 0
    }

    for (let index = 0; index < number; index++) {
        const element = input.shift();
        const [assignee, taskId, title, status, estimatedPoints] = element.split(':');
        if (assignee in sprintBoard) {
            sprintBoard[assignee].push([taskId, title, status, estimatedPoints]);
        } else {
            sprintBoard[assignee] = [[taskId, title, status, estimatedPoints]];
        } 
    }

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        const commands = line.split(':')
        if (commands[0] === 'Add New') {
            assignee = commands[1];
            taskId = commands[2];
            title = commands[3];
            statusN = commands[4];
            estimatedPoints = commands[5];
            add(assignee, taskId, title, statusN, estimatedPoints);
        } else if (commands[0] === 'Change Status') {
            assignee = commands[1];
            taskId = commands[2];
            newStatus = commands[3];
            change(assignee, taskId, newStatus);
        } else if (commands[0] === 'Remove Task') {
            assignee = commands[1];
            index = commands[2];
            remove(assignee, index);
        }
    }

    function add(assignee, taskId, title, statusN, estimatedPoints) {
        for (const name in sprintBoard) {
            if (name === assignee) {
                // add
                sprintBoard[assignee].push([taskId, title, statusN, estimatedPoints]);
                return
            }
        }
        console.log(`Assignee ${assignee} does not exist on the board!`)
    }

    function change(assignee, taskId, newStatus) {
        for (const name in sprintBoard) {
            if (name === assignee) {
                for (let i = 0; i < sprintBoard[name].length; i++ ) {
                    const task = sprintBoard[name][i]
                    if (task[0] === taskId) {
                        // change
                        sprintBoard[assignee][i][2] = newStatus
                        return
                    }
                }
                console.log(`Task with ID ${taskId} does not exist for ${assignee}!`)
                return
            }
        }
        console.log(`Assignee ${assignee} does not exist on the board!`)
    }

    function remove(assignee, index) {
        for (const name in sprintBoard) {
            if (name === assignee) {
                // check index
                if (index >= sprintBoard[assignee].length || index < 0) {
                    console.log('Index is out of range!')
                    return
                } else {
                    // remove
                    sprintBoard[assignee].splice(index, 1)
                    return
                }
            }
        }
        console.log(`Assignee ${assignee} does not exist on the board!`)
    }

    for (const arr of Object.values(sprintBoard)) {
        for (const inArr of arr) {
            let statusPoint = inArr[2]
            let points = Number(inArr[3])
            if (statusPoint === 'ToDo') {
                totalPoints.ToDo += points
                totalPoints.total += points
            }
            if (statusPoint === 'In Progress') {
                totalPoints.inProgress += points
                totalPoints.total += points
            }
            if (statusPoint === 'Code Review') {
                totalPoints.codeReview += points
                totalPoints.total += points
            }
            if (statusPoint === 'Done') {
                totalPoints.donePoints += points
            }
        }
    }

    console.log(`ToDo: ${totalPoints.ToDo}pts`)
    console.log(`In Progress: ${totalPoints.inProgress}pts`)
    console.log(`Code Review: ${totalPoints.codeReview}pts`)
    console.log(`Done Points: ${totalPoints.donePoints}pts`)

    if ( totalPoints.donePoints >= totalPoints.total) {
        console.log('Sprint was successful!')
    } else {
        console.log('Sprint was unsuccessful...')
    }

}

// solve(    [
//     '5',
//     'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
//     'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
//     'Peter:BOP-1211:POC:Code Review:5',
//     'Georgi:BOP-1212:Investigation Task:Done:2',
//     'Mariya:BOP-1213:New Account Page:In Progress:13',
//     'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
//     'Change Status:Peter:BOP-1290:ToDo',
//     'Remove Task:Mariya:1',
//     'Remove Task:Joro:1',
// ]
// )

solve(
    [
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
    ]
)