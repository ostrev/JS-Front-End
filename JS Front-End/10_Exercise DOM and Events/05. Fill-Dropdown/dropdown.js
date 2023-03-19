function addItem() {
    const text = document.getElementById('newItemText').value;
    const value = document.getElementById('newItemValue').value;
    const selectMenuRef = document.getElementById('menu');

    let selectOption = document.createElement('option');
    selectOption.textContent = text;
    selectOption.value = value;

    selectMenuRef.appendChild(selectOption);
    document.getElementById('newItemText').value = '';
    document.getElementById('newItemValue').value = '';

}