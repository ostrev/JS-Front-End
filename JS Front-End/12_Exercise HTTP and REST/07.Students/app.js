function attachEvents() {
  const BASE_URL = 'http://localhost:3030/jsonstore/collections/students';
  const tableBodyRef = document.querySelector('#results > tbody');
  const btnSubmitRef = document.getElementById('submit');

  window.addEventListener('load', handlerLoadStudents);
  btnSubmitRef.addEventListener('click', handlerCreateStudent);

  function handlerLoadStudents() {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        data = Object.values(data);
        tableBodyRef.innerHTML = '';
        for ({ firstName, lastName, facultyNumber, grade } of data) {
          let trowContent = `<td>${firstName}</td>
          <td>${lastName}</td>
          <td>${facultyNumber}</td>
          <td>${grade}</td>`
          let row = document.createElement('tr');
          row.innerHTML = trowContent;
          tableBodyRef.appendChild(row);
        }
      })
      .catch((err) => console.error(err))
  }

  function handlerCreateStudent() {
    const firstNameRef = document.querySelector('[name="firstName"]');
    const lastNameRef = document.querySelector('[name="lastName"]');
    const fNumberRef = document.querySelector('[name="facultyNumber"]');
    const gradeRef = document.querySelector('[name="grade"]');
    if (fNumberRef.value === '' || lastNameRef.value === '' || fNumberRef.value === '' || gradeRef.value === '') {
      return
    }

    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameRef.value,
        lastName: lastNameRef.value,
        facultyNumber: fNumberRef.value,
        grade: gradeRef.value
      })
    })
    .then((res) => res.json())
    .then(() => {
      handlerLoadStudents()
      firstNameRef.value = '';
      lastNameRef.value = '';
      fNumberRef.value = '';
      gradeRef.value = '';
    })
    .catch((err) => console.log(err))
  }
}

attachEvents();