function listOfNames(names) {
    let sortedNamesAsc = names.sort()

    // let sortedNamesAsc = [...names].sort((aName, bName) => {
    //     let result = aName.localeCompare(bName);
    //     return result;
    //   });
    for (let i = 1; i <= names.length; i++) {
        console.log(`${i}.${sortedNamesAsc[i-1]}`)
    }
    
}
listOfNames(["John", "Bob", "Christina", "Ema"]);
