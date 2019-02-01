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
}

ReactDOM.render(<App />, document.getElementById('app'));

    //this function needs to send a request to the server
    /*
        $.ajax({
        method: "POST",
        url: "some.php",
        data: { name: "John", location: "Boston" }
        })
        .done(function( msg ) {
          alert( "Data Saved: " + msg );
        });

        SYNTAX: $.ajax({options}).done(cb)
     */