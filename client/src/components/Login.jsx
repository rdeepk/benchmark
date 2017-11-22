import React, { Component } from 'react'; 

class Login extends Component {
  render() {
    return (
        <div className="login">
        <div className="connected">
          <div className="row">
          <div className="col-sm-5">
            <img src="../img/unnamed.jpg" alt="identity" id="creatorImage" />
          </div>
          <div className="col-sm-7">
            <div className="infoConnected">
            <form className="loginForm" onSubmit={this.usernameSubmitHandler}>
              <div class="form-group">
                              <label for="username">Tell me about yourself...</label>
                              <input type="text" id="username" placeholder="Enter a username..." onChange={this.usernameChangeHandler} className="form-control" required="required"/>
                          </div>
              <input type="submit" id="yourEnter" value="Submit" className="btn btn-primary" />
            </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {/* <div className="error">{error? error: null}</div> */}
          </div>
        </div>
        
        </div>
      </div>
    );
  }
}

export default Login;
