const rootURL = 'https://api.github.com';

function getRepositories() {
  const name = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  const uri = rootURL + '/users/' + name + '/repos'

  req.addEventListener('load', displayRepositories())
  req.open('GET', uri);
  req.send();

}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><h3>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')</h3>' +
        commit.commit.message +
        '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
  req.addEventListener('load', displayCommits);
  req.open('GET', uri)
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = '<ul>' +
    commits.map(commit =>
      '<li><h3>' +
       commit.commit.author.name +
       ' (' +
       commit.author.login +
       ')</h3>' +
       commit.commit.message +
       '</li>'
    ).join('') +
    '</ul>';
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  req.addEventListener('load', displayBranches);
  req.open('GET', uri)
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = '<ul>' +
    branches.map(branch =>
      '<li>' +
      branch.name +
      '</li>'
    ).join('') +
    '</ul>';
  document.getElementById('details').innerHTML = branchesList;
}
