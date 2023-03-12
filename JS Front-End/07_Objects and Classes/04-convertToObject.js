function convertJson(input) {
    let output = JSON.parse(input);
    for (const [key, value] of Object.entries(output)) {
        console.log(`${key}: ${value}`)
    }

}
convertJson('{"name": "George", "age": 40, "town": "Sofia"}');
convertJson('{"name": "Peter", "age": 35, "town": "Plovdiv"}');