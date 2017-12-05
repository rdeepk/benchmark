import React, { Component } from 'react';
import BulletinList from '../components/bulletin/BulletinList';
import GradesList from '../components/teachers/GradesList';
import ChildList from '../components/parents/ChildList';
import StudentAttendance from '../components/student/StudentAttendance';
import { requireAuth,isLoggedIn } from '../utils/AuthService';
import { Route, Link } from 'react-router-dom';

/*
*  Parent container to display the content as per the active link in the sidebar.
*/
class Content extends Component {

  render() {
    return (
      <div>
  
        <Route path="/" exact onEnter={requireAuth} render={(props) => (
              <BulletinList   bulletin={this.props.bulletin}
                          setBulletinState={this.props.setBulletinState}
                          role={this.props.role}
                /> )} />
        <Route path="/attendance" exact onEnter={requireAuth} render={(props) => (
                                          <GradesList grades={this.props.grades}
                                                      role={this.props.role}
                                                      /> )} />
        <Route path="/studentAttendance" exact onEnter={requireAuth} render={(props) => (<StudentAttendance /> )} />
        <Route path="/childAttendance" exact onEnter={requireAuth} render={(props) => (<ChildList /> )} />
      </div>
    );
  }
} 

export default Content;