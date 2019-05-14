const rootURL = 'https://api.github.com';

function getRepositories() {
  const name = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  const uri = rootURL + '/users/' + name + '/repos'

  req.addEventListener('load', displayRepositories())
  req.open('GET', uri);
  req.send();

}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = '<ul>' +
    repos.map(repo => {
      const repoList =
        '<ul>' +
        repos.map(repo => {
          const dataUsername = 'data-username="' + repo.owner.login + '"';
          const dataRepoName = 'data-repository="' + repo.name + '"';
          return `
            <li>
              <h2>${repo.name}</h2>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
            </li>`;
        }).join('') +
        '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const req = new HMLHttpRequest();
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
  req.addEventListener('load', displayCommits);
  req.open('GET', uri)
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = '<ul>' +
    commits.map(commit => {
      '<li><strong>' +
      commit.author.login +
      '</strong> - ' +
      commit.commit.message +
      '</li>'
    }).join('') +
    '</ul>';
  document.getElementById('commits').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const req = new HMLHttpRequest();
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  req.addEventListener('load', displayBranches);
  req.open('GET', uri)
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = '<ul>' +
    branches.map(commit => {
      '<li><strong>' +
      branches.author.login +
      '</strong> - ' +
      branches.commit.message +
      '</li>'
    }).join('') +
    '</ul>';
  document.getElementById('branches').innerHTML = branchesList;
}
