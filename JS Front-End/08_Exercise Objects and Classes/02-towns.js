function townCreate(input) {
    let town = {}
    for (const line of input) {
        let [townName, latitude, longitude] = line.split(' | ')
        town['town'] = townName;
        town['latitude'] = Number(latitude).toFixed(2);
        town['longitude'] = Number(longitude).toFixed(2);
        console.log(town);
    }
     
}

townCreate(['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']);
townCreate(['Plovdiv | 136.45 | 812.575']);
