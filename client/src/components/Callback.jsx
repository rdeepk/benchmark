import React, { Component } from 'react';
import { setIdToken, setAccessToken, setRole, setUserId, setUser } from '../utils/AuthService';

/*
*  Component used as a callback by Auth0 after login. Sets the globals after user logs in.
*/
class Callback extends Component {
    componentDidMount() {
        setAccessToken();
        setIdToken();
        setRole();
        setUserId();
        setUser();
        this.props.setLoginState()
        window.location.href = "/";
      }
    
      render() {
        return null;
      }
    }

export default Callback;