const express = require('express');
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
        console.log(`Search Term Rcvd: ${JSON.parse(data)}`);
        processor.state = JSON.parse(data);
        res.statusCode = 201;
        res.end();
      })

      //tbd
    })
  },
  queryGithub: () => {
    console.log('empty');
  },
  serveClientRepos: () => {
    app.get('/repos', (req, res) => {
      console.log('repo server not complete');
      //TODO: serve the files from database
    })
  }
}

var processor = {
  state: {
    query: null,
    results: null
  },
  placeholder: () => {
    console.log('a null void appears');
    //TODO: use the server to process the response from github
    //before storing in mongo
  }
}

server.initialize();