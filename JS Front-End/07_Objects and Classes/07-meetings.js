function meetings(input) {
    let meetingObject = {};
    for (const data of input) {
        let [day, name] = data.split(' ');
        if (meetingObject.hasOwnProperty(day)) {
            console.log(`Conflict on ${day}!`);
        } else {
            meetingObject[day] = name;
            console.log(`Scheduled for ${day}`)
        }
    }

    for (const [key, value] of Object.entries(meetingObject)) {
        console.log(`${key} -> ${value}`)
    }
}

meetings(['Monday Peter',
'Wednesday Bill',
'Monday Tim',
'Friday Tim']);
meetings(['Friday Bob',
'Saturday Ted',
'Monday Bill',
'Monday John',
'Wednesday George']);