const express = require('express');
const github = require('../helpers/github');
const database = require('../database/index.js');
let app = express();


var server = {
  port: 1128,
  initialize: () => {
    //initialize the server and router functions here
    router.serveClient();
    router.handleClientSearch();
    router.serveClientRepos();
    app.listen(server.port, () => {
      console.log(`listening on ${server.port}`);
    })
  }
}

var router = {
  serveClient: () => {
    app.use(express.static(__dirname + '/../client/dist'));
  },
  handleClientSearch: () => {
    app.post('/username', (req, res) => {
      req.on('data', (data) => {
        processor.state.query = JSON.parse(data);
        res.statusCode = 201;
        res.end();
        router.queryGithub();
      });
    })
  },
  queryGithub: () => {
    github.getReposByUsername(processor.state.query);
  },
  serveClientRepos: () => {
    app.get('/repos', (req, res) => {
      database.retrieve().then((result) => {
        res.send(result);
        res.end();
      });
    });
  }
}


var processor = {
  state: {
    query: null,
    results: null
  },
  handleQueryResults: (data) => {
    processor.state.results = data.map((repo) => {
      return {
        id: repo.id,
        full_name: repo.full_name,
        url: repo.html_url,
        owner_name: repo.owner.login,
        owner_url: repo.owner.html_url,
        size: repo.size,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        description: repo.description,
        forks: repo.forks
      };
    });
    database.save(processor.state.results);
  }
}

server.initialize();
module.exports.handleQueryResults = processor.handleQueryResults;