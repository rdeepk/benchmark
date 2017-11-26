import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import Login from './Login';
import Header from './Header';
import Callback from '../components/Callback';
import Sidebar from './Sidebar';
import Content from './Content';
import { requireAuth, getAccessToken } from '../utils/AuthService';
import {getLinks} from '../api/api';
import {getBulletin} from '../api/bulletin';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: "bulletin",
      bulletin: "",
      content: "",
      loading: false
    }
  }

  setActiveLink = (link, data)=> {
    this.setState({
      activeLink: link,
      content: data,
      loading:false
    })
  }
   componentDidMount() {
     this.setState({
       loading: true
     })
  //    console.log(getAccessToken())
  //   const url = 'http://localhost:8000/bulletin/messages';
  //   axios.get(url,  { headers: { Authorization: `Bearer ${getAccessToken()}` }})
  //   .then((response) => {
  //     console.log(response);
  //   this.setState({
  //     resp: response.data
  //   })
  // })
  //   .catch((error) => {
  //   console.log(error);
  // });
    // getLinks()
    //   .then((data) => {
    //     console.log(data);
    // });
    getBulletin()
    .then((data) => {
      this.setState({
        bulletin: data
      })
      this.setActiveLink('bulletin', data);
  });
   }

  render() {
    if(this.state.loading) {
      return  (
      <div>
      <Header />
      </div>
      )
    }
    return (
      <div className="App">
        <Header />
        <div className="row">
          <div className="col-sm-4">
            <Sidebar setActiveLink={this.setActiveLink} />
          </div>
          <div className="col-sm-8">
            <Content activeLink ={this.state.activeLink} bulletin={this.state.bulletin}/>
          </div>
        </div>
        <Route path="/callback" exact render={(props) => (<Callback />
                )} />

      </div>
    );
  }
}

export default App;
