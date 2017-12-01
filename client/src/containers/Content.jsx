import React, { Component } from 'react';
import BulletinList from '../components/bulletin/BulletinList';
import GradesList from '../components/teachers/GradesList';
import ChildList from '../components/parents/ChildList';
import StudentAttendance from '../components/student/StudentAttendance';
import { requireAuth,isLoggedIn } from '../utils/AuthService';
import { Route, Link } from 'react-router-dom';
import ChatContainer from '../components/chat/ChatContainer';

class Content extends Component {

  render() {
    return (
      <div>
  
        <Route path="/" exact onEnter={requireAuth} render={(props) => (
              <BulletinList   bulletin={this.props.bulletin}
                          setBulletinState={this.props.setBulletinState}
                          role={this.props.role}
                          setLoginState={this.props.setLoginState}
                          setUser={this.props.setUser}
                /> )} />
        <Route path="/attendance" exact onEnter={requireAuth} render={(props) => (
                                          <GradesList grades={this.props.grades}
                                                      role={this.props.role}
                                                      /> )} />
        <Route path="/studentAttendance" exact onEnter={requireAuth} render={(props) => (<StudentAttendance /> )} />
        <Route path="/childAttendance" exact onEnter={requireAuth} render={(props) => (<ChildList /> )} />
        <Route path="/group" exact onEnter={requireAuth} render={(props) => (<ChatContainer socket={this.props.socket} user={this.props.user}/> )} />
      </div>
    );
  }
} 

export default Content;