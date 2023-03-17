function addItem() {
    let text = document.getElementById('newItemText').value; 
    if (text.length === 0 ) {
        return;
    }

    let li = document.createElement('li');
    // li.textContent = text;

    let addText = document.createTextNode(text);
    li.appendChild(addText);

    let del = document.createElement('a');
    let linkText = document.createTextNode('[Delete]');
    del.appendChild(linkText);
    del.href = '#';
    
    del.addEventListener('click', deleteItem);

    li.appendChild(del);

    let refToParent = document.getElementById('items');
    refToParent.appendChild(li);

    
    
    document.getElementById('newItemText').value = '';

    function deleteItem() {
        li.remove();
      }
}