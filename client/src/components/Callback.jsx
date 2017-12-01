import React, { Component } from 'react';
import { setIdToken, setAccessToken, setRole, setUserId, setUser } from '../utils/AuthService';

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
        console.log("from callback")
        return null;
      }
    }

export default Callback;