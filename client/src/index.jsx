import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.retrieveRepos = this.retrieveRepos.bind(this);
  }

  //TODO: this is not called anywhere
  //we should call it:
  //1) after the search?
  //2) on button click?
  //3) on component mount? (TBD, this is bad form)
  retrieveRepos() {
    console.log("retrieving repos...");
    let req = $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'GET'
    });
    req.done((data) => {
      // console.log(data);
      // console.log(typeof data);
      console.log(`data rcvd: ${JSON.stringify(data)}`);
    })
    req.fail((jqXHR, textStatus, err) => {
      console.log(`Retrieval failed: ${err}`);
    })
  }

  search (term) {
    let req = $.ajax({ //this request returns a jqXHR obj to req
      url: 'http://127.0.0.1:1128/username',
      method: 'POST',
      data: JSON.stringify(term)
    });
    req.fail((jqXHR, textStatus, err) => {
      console.log(`Error posting to the server: ${err}`);
    })
    req.done((data, textStatus, jqXHR) => {
      console.log(`Server has received the search term (${textStatus})`);
      //TODO: call the function to show the repos from the database
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
  componentDidMount() {
    this.retrieveRepos();
  }
}

ReactDOM.render(<App />, document.getElementById('app'));