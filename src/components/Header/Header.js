import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../../services/auth';
import './Header.css'

const Button = (props) => {

  if(props.parent === "form"){
    return <p className="button-link action-button" onClick={props.submit}>{props.buttonText}</p>
  } else {
    return (
      <Link to="/new-note" className="button-link action-button">
        <p>{props.buttonText}</p>
      </Link>
    )
  }
}

class Header extends Component {

  state = {
    redirect: false
  }

  logoutAndRedirect = () => {
    auth.logOut()
  }

  render(){
    let banner
    if(this.props.success){
      banner = <p className="blue">Note Saved!</p>
    }

    return (
      <div className="header">
        <Link to="/" className="home-link">
          <h3>LIGHTNOTES</h3>
        </Link>
        {banner}
        <div className="center-container">
          <Button buttonText={this.props.buttonText} submit={this.props.submit} parent={this.props.parent}/>
          <div className="button-link" onClick={this.logoutAndRedirect}>Logout</div>
        </div>
        
      </div>
    );
  }
  
}

export default Header;
