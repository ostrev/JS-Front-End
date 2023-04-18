function solve(input) {
    const number = input.shift()
    let container = {}
    for (let index = 0; index < number; index++) {
        const element = input.shift()
        let [piece, composer, key] = element.split('|')
        if (!(piece in container)) {
            container[piece] = [composer, key]
        } 
    }

    for (let line of input) {
        if (line === 'Stop') {
            break
        }
        let data = line.split('|')
        if (data[0] === 'Add') {
            [command, piece, composer, key] = data
            if (!(piece in container)) {
                container[piece] = [composer, key]
                console.log(`${piece} by ${composer} in ${key} added to the collection!`)
            } else {
                console.log(`${piece} is already in the collection!`)
            }
        } else if (data[0] === 'Remove') {
            [command, piece] = data
            if (piece in container) {
                delete container[piece]
                console.log(`Successfully removed ${piece}!`)
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            }
        } else if (data[0] === 'ChangeKey') {
            [command, piece, newKey] = data
            if (piece in container) {
                container[piece][1] = newKey
                console.log(`Changed the key of ${piece} to ${newKey}!`)
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            }
        }
    }

    for (let piece in container) {
        let composer = container[piece][0];
        let key = container[piece][1]
        console.log(`${piece} -> Composer: ${composer}, Key: ${key}`)
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

// solve([
//     '4',
//     'Eine kleine Nachtmusik|Mozart|G Major',
//     'La Campanella|Liszt|G# Minor',
//     'The Marriage of Figaro|Mozart|G Major',
//     'Hungarian Dance No.5|Brahms|G Minor',
//     'Add|Spring|Vivaldi|E Major',
//     'Remove|The Marriage of Figaro',
//     'Remove|Turkish March',
//     'ChangeKey|Spring|C Major',
//     'Add|Nocturne|Chopin|C# Minor',
//     'Stop'
//   ])