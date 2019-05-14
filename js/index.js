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
  const repoList = `<ul>${repos.map(r => '<li>' +
   r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}
