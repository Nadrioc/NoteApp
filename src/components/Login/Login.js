import React, {Component} from 'react';
import './Login.css'

class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  userNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  passwordChange = (event) => {
    this.setState({password: event.target.value});
  }

  render(){

    return (
      <div className="center-container login-container">
        <div>
          <p className="wrong-login">{this.props.incorrectLogin}</p>
          <h1>Login to LightNote</h1>
          <div>
            <p className="login-labels">Username</p>
            <input className="login-input" type="text" value={this.state.username} onChange={this.userNameChange} />
          </div>
          <div>
            <p className="login-labels">Password</p>
            <input className="login-input" type="password" value={this.state.password} onChange={this.passwordChange} />
          </div>
          <div className="login-button" onClick={(username, password) => this.props.startAuth(this.state.username, this.state.password)}><p>LOGIN</p></div>
        </div>
      </div>
    );
  }
  
}

export default Login;