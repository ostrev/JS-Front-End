function pianist(input) {
    const numberOfPieces = Number(input.shift());
    let collection = {};
    for (let index = 0; index < numberOfPieces; index++) {
        let command = input.shift();
        let [piece, composer, key] = command.split('|');
        collection[piece] = {composer, key};
    }
    
    for (let line of input) {
        if (line === 'Stop') {
            break;
        }

        let lineCommands = line.split('|');

        if (lineCommands[0] === 'Add') {
            piece = lineCommands[1];
            composer = lineCommands[2];
            key = lineCommands[3];
            addPiece(piece, composer, key);
        } else if (lineCommands[0] === 'Remove') {
            piece = lineCommands[1];
            removePiece(piece);
        } else if (lineCommands[0] === 'ChangeKey') {
            piece = lineCommands[1];
            newKey = lineCommands[2]
            changeKey(piece, newKey);
        }
    }

    function addPiece(piece, composer, key) {
        if (piece in collection) {
            console.log(`${piece} is already in the collection!`);
            return;
        }
        collection[piece] = {composer, key};
        console.log(`${piece} by ${composer} in ${key} added to the collection!`);
    }

    function removePiece(piece) {
        if (piece in collection) {
            delete collection[piece]
            console.log(`Successfully removed ${piece}!`);
            return;
        }
        console.log(`Invalid operation! ${piece} does not exist in the collection.`)
    }

    function changeKey(piece, newKey) {
        if (piece in collection) {
            collection[piece].key = newKey
            console.log(`Changed the key of ${piece} to ${newKey}!`);
            return;
        }
        console.log(`Invalid operation! ${piece} does not exist in the collection.`)
    }

    for (let piece in collection ) {
        console.log(`${piece} -> Composer: ${collection[piece].composer}, Key: ${collection[piece].key}`)
    }

}

pianist(
    [
        '3',
        'Fur Elise|Beethoven|A Minor',
        'Moonlight Sonata|Beethoven|C# Minor',
        'Clair de Lune|Debussy|C# Minor',
        'Add|Sonata No.2|Chopin|B Minor',
        'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
        'Add|Fur Elise|Beethoven|C# Minor',
        'Remove|Clair de Lune',
        'ChangeKey|Moonlight Sonata|C# Major',
        'Stop'  
      ]
      
)