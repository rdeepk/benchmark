import React, { Component } from 'react';
import BulletinList from '../components/BulletinList';
import Teachers from './Teachers';
import Grades from './Grades';
import { requireAuth,isLoggedIn } from '../utils/AuthService';
import { Route, Link } from 'react-router-dom'

class Content extends Component {

  render() {
    return (
      <div>
        <Route path="/bulletin" exact onEnter={requireAuth} render={(props) => (
              <BulletinList   bulletin={this.props.bulletin}
                          setBulletinState={this.props.setBulletinState}
                /> )} />
        <Route path="/teachers" exact onEnter={requireAuth} render={(props) => (<Teachers bulletin={this.props.teachers}  /> )} />
        <Route path="/grades" exact onEnter={requireAuth} render={(props) => (<Grades bulletin={this.props.grades}  /> )} />
      </div>
    );
  }
} 

export default Content;