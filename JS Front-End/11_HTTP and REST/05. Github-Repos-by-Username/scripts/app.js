function loadRepos() {
	debugger
	const username = document.getElementById('username').value;
	const BASE_URL = 'https://api.github.com/users/';
	const reposRef = document.getElementById('repos');
	
	const removeRef = Array.from(document.querySelectorAll('#repos > li'));
	removeRef
		. forEach(list => list.remove())

	let url = `${BASE_URL}${username}/repos`
	
	fetch(url, { method: "GET" })
		.then(res => {
			if (res.ok == false) {
				throw new Error(`${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			data.forEach((repo) => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = repo.html_url;
				a.textContent = repo.full_name;
				li.appendChild(a);
				reposRef.appendChild(li);
			})
		})
		
		.catch(err => {
				const liErr = document.createElement('li');
				liErr.textContent = err;
				reposRef.appendChild(liErr);
		})
}

