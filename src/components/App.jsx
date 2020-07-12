import React from 'react';
import DashBoardPlanetsList from './Dashboard.jsx';
import LoginDataList from './Login.jsx'
import Header from './Header.jsx';
import { Router,Switch, Route,Redirect } from "react-router-dom";
import history from '../../src/js/history/history.js'
import NotFoundPage from './NotFoundPage.jsx';
import AppHome from './Home.jsx';
import PlanetPage from './PlanetPage.jsx';


function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={
            function(props){
                if(authed === true){
                    return <Component {...props} />;
                }
                else{
                    return <Redirect to={{pathname: '/', state: {from: props.location}}} />
                }
            }
        }
      />
    )
}

class App extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            isLoginedIn : false,
        }
        this.updateLogin = this.updateLogin.bind(this);
        this.updateLogout = this.updateLogout.bind(this);
    }
    componentWillMount(){
        if(localStorage.getItem('loginData') && localStorage.getItem('loginData') !== undefined){
            this.setState({isLoginedIn:true})                    
    }
    }
    updateLogin(){
        let loginData ={'login':'true'};
        this.setState({isLoginedIn:true})
        localStorage.setItem('loginData', JSON.stringify(loginData));
    }
    updateLogout(){
        this.setState({isLoginedIn:false})
        localStorage.removeItem('loginData')
    }
    render(){
    return (
        <div className="container">
        <Router history={history}> 
        <Header loginStatus={this.state} updateLogout={this.updateLogout} props={this.props}/>
            <Switch> 
                <Route exact path="/login" render={props =><LoginDataList updateLogin={this.updateLogin} {...props}/>}  ></Route>
                <Route exact path="/" render={props =><AppHome stateData={this.state} {...props}/>}  />  
                <PrivateRoute authed={this.state.isLoginedIn} path='/dashboard' component={DashBoardPlanetsList} />
                <PrivateRoute authed={this.state.isLoginedIn} path='/planet/:planet_name' component={PlanetPage} />
                <Route exact path="*" component={NotFoundPage} />
            </Switch>       
        </Router>
        </div>
    )
    }
}

export default App;