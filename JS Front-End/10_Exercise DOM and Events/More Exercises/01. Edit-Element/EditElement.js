function editElement(reference, match, replacer) {
    let text = reference.textContent;
    let newText = text.replace(match, replacer);
    while (newText.includes(match)) {
        newText = newText.replace(match, replacer);
    }
    
    reference.textContent = newText;
}