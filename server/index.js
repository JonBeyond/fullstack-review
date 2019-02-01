const express = require('express');
let app = express();


var server = {
  port: 1128,
  initialize: () => {
    //initialize the server and router functions here
    router.serveClient();
    app.listen(server.port, () => {
      console.log(`listening on ${server.port}`);
    })
  }
}

var router = {
  serveClient: () => {
    app.use(express.static(__dirname + '/../client/dist'));
  },
  queryGithub: () => {
    //query github
    app.post('/username', (req, res) => {
      console.log('query hub not complete');
      //tbd
    })
  },
  serveClientRepos: () => {
    app.get('/repos', (req, res) => {
      console.log('repo server not complete');

      //TODO: serve the files from database
    })
  }
}

var processor = {
  placeholder: () => {
    console.log('a null void appears');
    //TODO: use the server to process the response from github
    //before storing in mongo
  }
}

server.initialize();