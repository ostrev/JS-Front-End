function loadCommits() {
    const username = document.getElementById('username').value;
    const repoInput = document.getElementById('repo').value;
    const commitsRef = document.getElementById('commits');
    const BASE_URL = 'https://api.github.com/repos/';

    fetch(`${BASE_URL}${username}/${repoInput}/commits`)
        .then(res => {
            if (res.ok == false) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            data.forEach(({ commit }) => {
                const li = document.createElement('li');
                li.textContent = `${commit.author.name}:${commit.message}`;
                commitsRef.appendChild(li);
            })
        })
        .catch(err => {
            const li = document.createElement('li');
                li.textContent = err.message;
                commitsRef.appendChild(li);
        })
}