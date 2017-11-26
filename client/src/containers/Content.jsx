import React, { Component } from 'react';
import Bulletin from '../components/Bulletin';
import Teachers from './Teachers';
import Grades from './Grades';
import { requireAuth,isLoggedIn } from '../utils/AuthService';
import { Route, Link } from 'react-router-dom'

class Content extends Component {

  render() {
    return (
      <div>
        <Route path="/bulletin" exact onEnter={requireAuth} render={(props) => (<Bulletin bulletin={this.props.bulletin}  /> )} />
        <Route path="/teachers" exact onEnter={requireAuth} render={(props) => (<Teachers bulletin={this.props.teachers}  /> )} />
        <Route path="/grades" exact onEnter={requireAuth} render={(props) => (<Grades bulletin={this.props.grades}  /> )} />
      </div>
    );
  }
} 

export default Content;