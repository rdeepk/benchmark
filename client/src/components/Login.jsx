import React, { Component } from 'react'; 
import { Route, Link } from 'react-router-dom';
// import Bulletin from './Bulletin';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class Login extends Component {
    showLock= () => {
        // Show the Auth0Lock widget
        this.props.lock.show();
      }

  render() {
    return (
        <div> 
            {/* <Link to="/bulletin">Login</Link> */}
            {/* <a onClick={this.showLock}>Sign In</a> */}
            {
             ( isLoggedIn() ) ? <Link to="/bulletin">Board</Link> :  ''
            }
             {
             (isLoggedIn()) ? ( <button className="btn" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
      </div>
    );
  }
}

export default Login;