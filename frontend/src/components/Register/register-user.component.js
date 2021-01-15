import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value      
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onCreateUser(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost:5000/users/register', user)
            .then(res => {
                alert("Account created successfully!")
                window.location = '/login'
            })
            .catch(res => {
				console.log(res)
                alert("Account already exists.")
                window.location.reload(false)
            }); 
    }

    render() {
        return (
        <div class="userinputform">
            <h2 className="text">Register</h2>
            <form onSubmit={this.onCreateUser}>
                <div className="formgroup">
                    <label className="text"><b>Email</b></label>
                    <input type="text" 
                        required class="logregfield"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        placeholder="Enter Email" 
                    />
                </div>
        
                <div className="formgroup">
                    <label className="text"><b>Username</b></label>
                    <input type="text" 
                        required class="logregfield"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        placeholder="Enter Username" 
                    />
                </div>
        
                <div className="formgroup">
                    <label className="text"><b>Password</b></label>
                    <input type="text" 
                        required class="logregfield"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        placeholder="Enter Password" 
                    />
                </div>

                <div className="formgroup">
                    <input type="submit" className="submitform" value='Sign Up'></input><br></br>
                </div>
            </form>
    
            <div>
    
                <small style={{float: "right"}} className="text">
                    Have an account? <Link to="/login" className="text">Sign In!</Link>
                </small>
            <br></br>
            </div>
            
            
        </div>
        
        )
    }
}
