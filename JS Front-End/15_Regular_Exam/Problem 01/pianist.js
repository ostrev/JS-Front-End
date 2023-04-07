function solve(input) {
    const numberOfPieces = input.shift();
    let piecesContainer = {}
    for (let i = 0; i < numberOfPieces; i += 1) {
        let data = input.shift();
        let [piece, composer, key ] = data.split('|')
        piecesContainer[piece] = {composer, key}
    }

    for (let line of input) {
        if (line === "Stop") {
            break
        }

        let commands = line.split('|');

        if (commands[0] === 'Add') {
            add(commands[1], commands[2], commands[3]);
        }

        if (commands[0] === 'Remove') {
            remove(commands[1]);
        }

        if (commands[0] === 'ChangeKey') {
            changeKey(commands[1], commands[2]);
        }
    }

    function add(piece, composer, key) {
        if (piece in piecesContainer) {
            console.log(`${piece} is already in the collection!`);
        } else {
            piecesContainer[piece] = {composer, key}
            console.log(`${piece} by ${composer} in ${key} added to the collection!`)
        }
    }

    function remove(piece) {
        if (piece in piecesContainer) {
            delete piecesContainer[piece]
            console.log(`Successfully removed ${piece}!`);
        } else {
            
            console.log(`Invalid operation! ${piece} does not exist in the collection.`)
        }
    
    }

    function changeKey(piece, newKey) {
        if (piece in piecesContainer) {
            piecesContainer[piece].key = newKey
            console.log(`Changed the key of ${piece} to ${newKey}!`);
        } else {
            
            console.log(`Invalid operation! ${piece} does not exist in the collection.`)
        }
    }
    for (let pieceKey in piecesContainer) {
        console.log(`${pieceKey} -> Composer: ${piecesContainer[pieceKey].composer}, Key: ${piecesContainer[pieceKey].key}`)
    }
    
}

solve([
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
  ])