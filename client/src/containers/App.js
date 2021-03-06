import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Callback from '../components/Callback';
import Sidebar from './Sidebar';
import Content from './Content';
import { isLoggedIn, login, getRole} from '../utils/AuthService';
import {getBulletin} from '../api/bulletin';
import axios from 'axios';
import Public from '../components/Public';

const socketUrl = 'http://localhost:8000/'

/*
*  Parent component of application. Handles socket connection for chat and contains the parent structural components for app.
*/
class App extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: "bulletin",
      bulletin: "",
      content: "",
      loading: false,
      grades:'',
      isLoggedIn: isLoggedIn(),
      role: getRole()
    }
  }

  setLoginState = () => {
    this.setState({
      isLoggedIn: isLoggedIn()
    })
  }

  /*
  *  Sets the role of the loggedin user.
  */
  setRole = (role) => {
    this.setState({ role })
  }

  /*
  *  Sets the default active link to be displayed when user logs in.
  */
  setActiveLink = (link, data)=> {
    this.setState({
      activeLink: link,
      content: data,
      loading:false
    })
  }

  /*
  *  Sets the state for grades.
  */
  setGradesState = (grades) => {
    this.setState({
      grades: grades
    })
  }

  /*
  *  Starts the loading process and gets bulletin from api to display on active link.
  */
  componentDidMount() {
     this.setState({
       loading: true
     })

    getBulletin()
    .then((data) => {
        this.setState({
          bulletin: data
        })
        this.setActiveLink('bulletin', data);
      });
  }

  /*
  *  Wrapper to redirect the relevant crud operation for bulletins.
  */
   setBulletinState = (action, data) => {
    switch(action) {
      case 'addNew':
        this.addNewBulletin(data);
      break;
      case 'update':
        this.updateBulletin(data.id, data.message);
      break;
      case 'delete':
        this.deleteBulletin(data.id);
      break;
    }
   }

  /*
  *  Sets the bulletin state after adding new.
  */
   addNewBulletin = (data) => {
    let { bulletin } = this.state;
    bulletin.messages.unshift(data);
    this.setState({
      bulletin: bulletin
    })
   }

  /*
  *  Sets the state for bulletin after update operation.
  */
   updateBulletin = (id, data) => {
    let { bulletin } = this.state;
    let newMessages = bulletin.messages.map((message, key) => {
      if(message._id === id) {
        message.message = data;
      }
      return  message;
    })

    let newState = {
      writeAccess: bulletin.writeAccess,
      messages: newMessages
    }

    this.setState({
      bulletin: newState
    })
   }

  /*
  *  Sets the state for bulletin after delete operation.
  */
   deleteBulletin = (id) => {
    let { bulletin } = this.state;
    let newMessages = bulletin.messages.filter((message, key) => {
        return message._id !== id
    })

    let newState = {
      writeAccess: bulletin.writeAccess,
      messages: newMessages
    }

    this.setState({
      bulletin: newState
    })
   }

  render() {

    if(!this.state.isLoggedIn) {
      return (
        <div className="App">
        <Route path="/callback" exact render={(props) => (<Callback setLoginState={this.setLoginState} />
                )} />
          <Public />
        </div>
      )
    }

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
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-xl-2">
            <Sidebar  setGradesState={this.setGradesState}
                      setRole={this.setRole}
                      role={this.state.role} />
          </div>
          <div className="col-md-9 col-xl-10 bdr-left">
            <Content  activeLink ={this.state.activeLink}
                      bulletin={this.state.bulletin}
                      setBulletinState={this.setBulletinState}
                      grades={this.state.grades}
                      role={this.state.role} />
          </div>
        </div>
        <Route path="/callback" exact render={(props) => (<Callback />
                )} />
      </div>
      </div>
    );
  }
}

export default App;
