function movieCreate(input) {
    let moviesArr = [];
    
    for (let line of input) {
        if (line.includes('addMovie')) {
            let temp = line.split(' ');
            temp.shift();
            let name = temp.join(' ');
            let tempObj = {'name': name}
            moviesArr.push(tempObj)
        } else if (line.includes('directedBy')) {
            temp = line.split(' directedBy ');
            let nameMovie = temp[0];
            let director = temp[1];
            addDirector(nameMovie, director);

        } else if (line.includes('onDate')) {
            temp = line.split(' onDate ');
            let nameMovie = temp[0];
            let data = temp[1];
            addData(nameMovie, data);
        }
    }

    for (const movie of moviesArr) {
        if (movie.hasOwnProperty('name') && movie.hasOwnProperty('date') && movie.hasOwnProperty('director')) {
            console.log(JSON.stringify(movie))
        }
    }

    function addDirector(name, directedBy) {
        let movie = moviesArr.find(mov => mov.name === name);
        if (movie) {
            movie.director = directedBy
        }  
    }

    function addData(name, data) {
        let movie = moviesArr.find(mov => mov.name === name);
        if (movie) {
            movie.date = data
        }    
    }

}
    


movieCreate([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
    ]);

movieCreate([
    'addMovie The Avengers',
    'addMovie Superman',
    'The Avengers directedBy Anthony Russo',
    'The Avengers onDate 30.07.2010',
    'Captain America onDate 30.07.2010',
    'Captain America directedBy Joe Russo'
    ]);
