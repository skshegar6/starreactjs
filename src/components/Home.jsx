import React from 'react';
import { Link } from "react-router-dom";
import HomePageImage from '../tools/snow_place.jpg';
class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className= "container">
                <img src={HomePageImage}  style={{'width':'100%'}}/>
                <h2>Welcome to  Star Planet Search App</h2>
                {this.props.stateData.isLoginedIn ?
                <Link  to="/dashboard">Go to Dashboard</Link> : <Link  to="/login">Click to Login</Link>
                }
            </div>
        )
    }
}

export default Home;