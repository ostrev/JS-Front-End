function hashTag(text) {
    let pattern = /#[a-zA-Z]+\b/g;
    let result = text.match(pattern);
    for (const word of result) {
        console.log(word.substring(1, 15))
    }

}

hashTag('Nowadays everyone uses # to tag a #special word in #socialMedia');
hashTag('The symbol # is known #variously in English-speaking #regions as the #number sign');
