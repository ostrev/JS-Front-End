function pascalSplitter(text) {

    let pattern = new RegExp('[A-Z][a-z]*', "g");
    let result = text.match(pattern);
    console.log(result.join(', '))  
}
pascalSplitter('SplitMeIfYouCanHaHaYouCantOrYouCan');
