function deleteByEmail() {
    let email = document.querySelector('label > input').value;
    let emails = document.querySelectorAll('#customers > tbody > tr > td:nth-child(2)')
    
    for (let searchedEmail of emails) {
        if (searchedEmail.textContent === email) {
            let row = searchedEmail.parentNode;
            row.parentNode.removeChild(row);

            document.getElementById('result').textContent = 'Deleted.';
            return;
        };

    document.getElementById('result').textContent = 'Not found.'
        
    }
}