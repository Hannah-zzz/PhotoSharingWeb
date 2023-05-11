import React from 'react';
import './LoginRegister.css';
import axios from 'axios';
import {Grid, Paper} from "@mui/material";

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_name: "",
            password: "",
            loginState : "",

            firstnameN:"",
            lastnameN:"",
            locationN:"",
            occupationN:"",
            descriptionN:"",
            loginnameN:"",
            passwordN:"",
            passwordN2:"",
            registerState:""
        };
        this.setPassword = this.setPassword.bind(this);
        this.setName = this.setName.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.setoccupationN = this.setoccupationN.bind(this);
        this.setdescriptionN = this.setdescriptionN.bind(this);
        this.setlocationN = this.setlocationN.bind(this);
        this.setlastnameN = this.setlastnameN.bind(this);
        this.setfirstnameN = this.setfirstnameN.bind(this);
        this.setpasswordN = this.setpasswordN.bind(this);
        this.setpasswordN2 = this.setpasswordN2.bind(this);
        this.setloginnameN = this.setloginnameN.bind(this);
        this.clear = this.clear.bind(this);
    }

    setName(event){
        this.setState({login_name : event.target.value, value:event.target.value});
    }
    setPassword(event){
        this.setState({password : event.target.value, passwordvalue:event.target.value});
    }
    setfirstnameN(event){
        this.setState({firstnameN : event.target.value, firstnamevalue:event.target.value});
    }
    setlastnameN(event){
        this.setState({lastnameN : event.target.value, lastnamevalue:event.target.value});
    }
    setlocationN(event){
        this.setState({locationN : event.target.value, locationvalue:event.target.value});
    }
    setoccupationN(event){
        this.setState({occupationN : event.target.value, occupationvalue:event.target.value});
    }
    setdescriptionN(event){
        this.setState({descriptionN : event.target.value, descriptionvalue:event.target.value});
    }
    setloginnameN(event){
        this.setState({loginnameN : event.target.value, loginnamevalue:event.target.value});
    }
    setpasswordN(event){
        this.setState({passwordN : event.target.value, password1value:event.target.value});
    }
    setpasswordN2(event){
        this.setState({passwordN2 : event.target.value, password2value:event.target.value});
    }
    handleLogin(){
        let password = this.state.password;
        let login_name = this.state.login_name;
        if(login_name === ""){
            this.setState({loginState: "Empty login_name"});
        }else if(password === ""){
            this.setState({loginState:"Empty password"});
        }else{
            console.log("name: " + login_name + " password: " + password);
            axios.post('/admin/login',{
                login_name: login_name,
                password: password
            }).then((res) => {
                this.setState({loginState: "Successfully log in"});
                this.setState({password : "", login_name:""});
                this.clear();
                this.props.changeAdmin(res.data._id, res.data.first_name, true);
                this.props.actsAdd();
            }).catch((err) =>{
                if(err){
                this.setState({loginState:"Login_name and password not match"});
                this.clear();
                }
            });

        }
    }
    handleRegister(){
        if(this.state.passwordN !== this.state.passwordN2){
            this.setState({registerState : "Password not match"});
        }else {
            let newU = {
                first_name: this.state.firstnameN,
                last_name: this.state.lastnameN,
                location: this.state.locationN,
                description: this.state.descriptionN,
                occupation: this.state.occupationN,
                login_name: this.state.loginnameN,
                password: this.state.passwordN,
            };
            if (this.state.loginnameN === "") {
                this.setState({registerState: "Empty login_name"});

            } else if (this.state.passwordN === "") {
                this.setState({registerState: "Empty password"});
            } else {
                // let result =
                    axios.post('/user', newU).then(() => {
                    this.setState({registerState: "Successfully register"});
                    this.setState({firstnameN:"",
                        lastnameN:"",
                        locationN:"",
                        occupationN:"",
                        descriptionN:"",
                        loginnameN:"",
                        passwordN:"",
                        passwordN2:"",});
                    this.clearRegister();
                }).catch((err) =>{
                    if(err){
                        this.setState({registerState:"Login_name and password not match"});
                        this.clearRegister();
                        this.props.actsAdd();
                    }
                });
            }
        }
    }

    clearRegister(){
        this.setState({firstnamevalue:"",
            lastnamevalue:"",
            locationvalue:"",
            occupationvalue:"",
            descriptionvalue:"",
            loginnamevalue:"",
            password1value:"",
            password2value:"",});
    }
    clear(){
        this.setState({value : ""});
        this.setState({passwordvalue : ""});
    }
    render() {
        return (

        <Grid container spacing={8} style={{backgroundColor: "beige"}}>
            <Grid item sm={6}>
                <Paper className="cs142-main-grid-item">
                    <div>
                         <div className= "title">
                             Log in
                         </div>

                         <div className= "content">
                         <label>Username: </label>
                         <input type="text" id = "loginname" value = {this.state.value} onChange={this.setName}/>
                         </div>
                         <div>-</div>
                         <div className= "content">
                         <label>Password:  </label>
                         <input type="password" id = "password" value = {this.state.passwordvalue} onChange={this.setPassword} />
                         </div>
                        <div>-</div>
                        <div className="loginstate">
                         {this.state.loginState}
                        </div>
                         <button className="button" type="button" onClick={this.handleLogin}>Login</button>
                    </div>
                </Paper>
            </Grid>
            <Grid item sm={6}>
                <Paper className="cs142-main-grid-item">
                <div>
                    <div className= "title">
                        Register
                    </div>
                    <div className= "content">
                        <label>Firstname: </label>
                        <input type="text" onChange={this.setfirstnameN} value = {this.state.firstnamevalue}/>
                    </div>
                    <div className= "content">
                        <label>Lastname: </label>
                        <input type="text" onChange={this.setlastnameN} value = {this.state.lastnamevalue}/>
                    </div>
                    <div className= "content">
                        <label>Location: </label>
                        <input type="text" onChange={this.setlocationN} value = {this.state.locationvalue}/>
                    </div>
                    <div className= "content">
                        <label>Description: </label>
                        <input type="text" onChange={this.setdescriptionN} value = {this.state.descriptionvalue}/>
                    </div>
                    <div className= "content">
                        <label>Occupation: </label>
                        <input type="text" onChange={this.setoccupationN} value = {this.state.occupationvalue}/>
                    </div>
                    <div className= "content">
                        <label>Login_name: </label>
                        <input type="text" onChange={this.setloginnameN} value = {this.state.loginnamevalue}/>
                    </div>
                    <div className= "content">
                        <label>Password:  </label>
                        <input type="password" onChange={this.setpasswordN} value = {this.state.password1value}/>
                    </div>
                    <div className= "content">
                        <label>Comfirm password:  </label>
                        <input type="password" onChange={this.setpasswordN2} value = {this.state.password2value}/>
                    </div>
                    <div className= "content">
                        {this.state.registerState}
                    </div>
                    <button className="button" type="button" onClick={this.handleRegister}>Register</button>
                </div>
                </Paper>
            </Grid>
        </Grid>
        );
    }
}

export default LoginRegister;
