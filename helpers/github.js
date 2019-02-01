const request = require('request');
const config = require('../config.js');
const server = require('../server/index.js');

let getReposByUsername = (user) => {
  let endpoint = `https://api.github.com/users/${user}/repos`
  console.log(`querying API at: ${endpoint}`);
  let chunks = [];
  let options = {
    url: endpoint,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options)
  .on('error', (err) => {
    console.log(err);
  })
  .on('data', (chunk) => { //data comes in multiple pieces
    chunks.push(chunk);
  })
  .on('end', () => { //once it's all received, then parse
    let data = JSON.parse(Buffer.concat(chunks));
    console.log(JSON.stringify(server));
  server.handleQueryResults(data);
  })
}

module.exports.getReposByUsername = getReposByUsername;