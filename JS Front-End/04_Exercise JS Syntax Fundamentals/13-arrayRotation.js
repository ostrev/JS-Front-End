function arrRot(arrList, number) {
    let array = [...arrList];
    for (let i = 0; i < number; i++) {
        let element = array.shift()
        array.push(element)
    }
    console.log(array.join(' '))
}

arrRot([51, 47, 32, 61, 21], 2);
arrRot([32, 21, 61, 1], 4);
arrRot([2, 4, 15, 31], 5);
