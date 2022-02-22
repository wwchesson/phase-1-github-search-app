let userCollection = document.querySelector('#user-list');
const form = document.getElementById('github-form');


document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let username = e.target.childNodes[1].value
        //e.target[0].value
        handleSearchFetch(username)
        //form.reset()
        //reset for each new search
        e.target.childNodes[1].value = ""
        userCollection = ""
        const repoList = document.getElementById('repos-list')
        repoList.textContent = ""
        //needed lines 14 & 15 to reset the repo list for each new search
    })
})

function handleSearchFetch(username) {
    const repo = `https://api.github.com/search/users?q=${username}`
    fetch(repo, {
        method: 'GET',
        headers: {
            Accept: "application / vnd.github.v3 + json"
        }
    })
        .then(res => res.json())
        .then(userData => userData.items.map(item => makeCard(item)))
}


function makeCard(element) {
    let userCollection = document.querySelector('#user-list');
    let handle = document.createElement('h1')
    const li = document.createElement('li')
    handle.innerText = element.login;

    let avatar = document.createElement('img')
    avatar.src = element.avatar_url
    avatar.id = element.login
    avatar.addEventListener("click", getRepositories)
    li.append(handle, avatar)
    userCollection.append(li)
}

function getRepositories(event) {
    //interpolate event.target.id because clicking on the image to return the repos
    const repoList = document.getElementById('repos-list')
    repoList.textContent = ""
    //to clear the list of repos each time click on an individual user
    fetch(`https://api.github.com/users/${event.target.id}/repos`, {
        method: 'GET',
        headers: {
            Accept: "application / vnd.github.v3 + json"
        }
    })
    .then(res => res.json())
    .then(res => res.map(r => displayRepository(r)))
}

function displayRepository(repo) {
    const repoList = document.getElementById('repos-list')
    const li = document.createElement('li')
    li.textContent = repo.name
    repoList.append(li)
}









