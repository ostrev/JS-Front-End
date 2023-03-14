function oddOcc(input){
    input = input.toLowerCase().split(' ');
    let output = new Set();

    for (let word of input) {
        
        let filteredWord = input.filter((w) => w === word);
        if (filteredWord.length % 2 !==0) {
            output.add(word);
        }
    }
    let result = new Array(...output);
    console.log(result.join(' '))  
}

oddOcc('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');
oddOcc('Cake IS SWEET is Soft CAKE sweet Food');
