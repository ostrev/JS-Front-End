function convertToJson(firstName, secondName, hairColor) {
    let person = {
        name: firstName,
        lastName: secondName,
        hairColor
    }

    let text = JSON.stringify(person);
    console.log(text);
}
convertToJson('George', 'Jones', 'Brown');
convertToJson('Peter', 'Smith', 'Blond');
