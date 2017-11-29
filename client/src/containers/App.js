import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Callback from '../components/Callback';
import Sidebar from './Sidebar';
import Content from './Content';
import { requireAuth, getAccessToken } from '../utils/AuthService';
import {getBulletin} from '../api/bulletin';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: "bulletin",
      bulletin: "",
      content: "",
      loading: false,
      grades:''
    }
  }

  setActiveLink = (link, data)=> {
    this.setState({
      activeLink: link,
      content: data,
      loading:false
    })
  }

  setGradesState = (grades) => {
    this.setState({
      grades: grades
    })
  }

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

   addNewBulletin = (data) => {
    let { bulletin } = this.state;
    bulletin.messages.push(data);
    this.setState({
      bulletin: bulletin
    })
   }

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
    },()=>{
      console.log(this.state.bulletin)
    })
   }

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
            <Sidebar setGradesState={this.setGradesState} />
          </div>
          <div className="col-md-9 col-xl-10">
            <Content  activeLink ={this.state.activeLink}
                      bulletin={this.state.bulletin}
                      setBulletinState={this.setBulletinState}
                      grades={this.state.grades}
                      />
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
