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

  retrieveRepos() {
    let req = $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'GET'
    });
    req.done((data) => {
      this.setState({
        repos: data
      });
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