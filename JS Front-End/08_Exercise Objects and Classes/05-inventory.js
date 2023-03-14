function createHero(input) {
    let heroes = [];
    for (let line of input) {
        let temp = line.split(' / ');
        let [name, level, items] = temp;
        let tempObj = {'Hero': name, 'level': level, 'items': items}
        heroes.push(tempObj)
    }

    let sortedHeroes = heroes
        .sort((heroA, heroB) => {
            let output = heroA.level - heroB.level;

            if (output === 0) {
                return heroA.Hero.localeCompare(heroB.Hero)
            } 

            return output;
        });
    
    sortedHeroes
        .forEach(hero => console.log(`Hero: ${hero.Hero}\nlevel => ${hero.level}\nitems => ${hero.items}`))
}

createHero([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]);

// createHero([
//     'Batman / 2 / Banana, Gun',
//     'Superman / 18 / Sword',
//     'Poppy / 28 / Sentinel, Antara'
// ]);
