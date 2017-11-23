import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Bulletin from './Bulletin';
import Callback from './Callback';
import { requireAuth, getAccessToken } from '../utils/AuthService';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      resp: ''
    }
  }

  componentWillMount() {
    console.log("will mount:  ", getAccessToken())
    const url = 'http://localhost:8080/bulletin';
    axios.get(url,  { headers: { Authorization: `Bearer ${getAccessToken()}` }})
    .then((response) => {
      console.log(response);
    this.setState({
      resp: response.data
    })
  })
    .catch((error) => {
    console.log(error);
  });
    // axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data)
  }
  render() {
    console.log(this.state.resp)
    return (
      <div className="App">{this.state.resp}
        <Route path="/login" exact render={(props) => (<Login lock={this.lock} />
                )} />
        <Route path="/bulletin" exact onEnter={requireAuth}render={(props) => (<Bulletin />
                )} />
        <Route path="/callback" exact render={(props) => (<Callback />
                )} />

      </div>
    );
  }
}

export default App;
