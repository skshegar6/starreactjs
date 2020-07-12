import React from 'react';
import { Link } from "react-router-dom";

class HeaderJs extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      isLoginedIn : props.loginStatus.isLoginedIn
    }
  }

  logoutChange(){
    let loginData;
    if(localStorage.getItem('loginData') && localStorage.getItem('loginData') !== undefined){
      loginData = JSON.parse(localStorage.getItem('loginData'));
      this.props.updateLogout(); 
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoginedIn: nextProps.loginStatus.isLoginedIn });  
  }
    render(){
        return(
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">Home Page</Link>
            </div> 
              { this.state.isLoginedIn    ?   
                <><ul className="nav navbar-nav" style={{'display':'-webkit-box'}}>
                  <li className="active" style={{'paddingRight':'10px'}}><Link  to="/dashboard">Planet Search Page</Link></li>
                </ul>
                <ul className="nav navbar-right">
                  <button type="submit" className="btn btn-primary" onClick={this.logoutChange.bind(this)}>Logout</button>
                </ul></> :
                <ul className="nav navbar-right">
                  <li style={{'paddingRight':'10px'}}><Link  to="/login">Login User</Link></li>
                </ul>
              }
            </div>
          </nav>   
        )
    }
}

export default HeaderJs;