import React from 'react';
import * as userApi from '../js/redux/api/loginUsersApiActions.js';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            loginError: false,
            redirectToReferrer:false
        }
        this.loginusercheck = this.loginusercheck.bind(this);
    }

    onChangeData(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        });
    } 
    submitFormData(evt){
        evt.preventDefault();
        this.loginusercheck();
    }

    async loginusercheck(){
        let logindata = await userApi.checkLoginUser(this.state.username);
        if(logindata && logindata.results && logindata.results.length == 1 && logindata.results[0].name === this.state.username && logindata.results[0].birth_year === this.state.password){
            this.props.updateLogin();
            this.props.history.push('/dashboard');  
        }else if(logindata.results.length > 1){
            for(let i=0;i<logindata.results.length;i++){
                if(logindata.results[i].name === this.state.name && logindata.results[i].birth_year === this.state.password){
                    this.props.updateLogin();
                    this.props.history.push('/dashboard');
                }else{
                    this.setState({loginError:true});
                }
            }
        }else{
            this.setState({loginError:true});
        }
    }

    cancelLogin(){
        this.props.history.push('/');
    }
    render(){
        return(
            <>
            <div className="row>"></div>
            <h2>Enter {this.state.usertype} login details</h2>
            <form action="/action_page.php" style={{'width':'60%'}}>
                <div className="form-group">
                    UserName: <input type="text" className="form-control" name="username" value={this.state.username} placeholder="Enter UserName as Profile Name" onChange={this.onChangeData.bind(this)} />
                </div>
                <div className="form-group">
                    Password: <input type="password" className="form-control" name="password"  value={this.state.password} placeholder="Enter Password as DOB format like 19BBY" onChange={this.onChangeData.bind(this)} />
                </div>
                <div className="row">
                    <div className="col-md-8" style={{'textAlign':'center'}}>
                        {this.state.loginError ? 
                        <p style={{'color':'red'}}>User Name and Password is invalid, Enter valid details</p>
                        : <p></p>}
                    </div>    
                </div>
                <div className="row">
                    <div className="col-md-4" style={{'textAlign':'center'}}>
                         <button type="submit" className="btn btn-primary" onClick={this.submitFormData.bind(this)} >Login</button>       
                    </div>
                    <div className="col-md-4" style={{'textAlign':'center'}}>
                        <button type="submit" className="btn btn-primary" onClick={this.cancelLogin.bind(this)}>Cancel</button>     
                    </div>
                </div>
            </form>
            </>
        )
    }       
}

export default Login;
