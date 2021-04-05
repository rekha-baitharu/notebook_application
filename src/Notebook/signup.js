import { AppBar, IconButton, Toolbar, DialogActions, DialogContent, Typography, Link, Grid, Button, Container, Card, CardContent, TextField, Snackbar, Icon, Dialog } from '@material-ui/core';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import back from '../Images/lg.jpg';
import google from '../Images/gl.png';
import ct from '../Images/ct.png';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';

import {
    Redirect
} from 'react-router-dom';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            home: "",
            name: "",
            phone: "",
            open: false,
            dialog: false,
            cPassword: "",
            showPassword: false,
            showPasswordC: false,
            about_open:false
        }
    }
    handleRegister = () => {
        fetch("http://localhost:5000/register_user", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
                "name": this.state.name,
                "phone_number": this.state.phone,
                "password": this.state.password,
                "confirmPassword": this.state.cPassword
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                console.log("login");
                if (resJson.status === true) {
                    this.setState({
                        dialog: true,
                        message: resJson.message
                    })
                } else {
                    this.setState({
                        open: true,
                        message: resJson.message
                    })
                }
            })
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    handleClickPassword = () => {
        this.setState({
            showPasswordC: !this.state.showPasswordC
        })
    }
    handleMouseDownPasswordC = (e) => {
        e.preventDefault();
    }


    render() {
        if (this.state.home === "home") {
            return (
                <Redirect to="home" />
            )
        }
        if (this.state.home === "login") {
            return (
                <Redirect to="login" />
            )
        }
        return (
            <div style={{ background: "url(" + back + ")", backgroundSize: "cover", height: "100vh", width: "100vw" }} grid={{ xs: 12 }}>
                <Link style={{ textDecoration: "none", fontFamily: "serif", marginLeft: 20, color: "black", marginTop: 20, cursor: "pointer" }} variant="h6" size="large" onClick={() => { this.setState({ home: "home" }) }}><i>Home</i></Link>
                <Link style={{ textDecoration: "none", fontFamily: "serif", marginTop: 20, color: "black", cursor: "pointer", marginLeft: 20 }} variant="h6" size="large" onClick={() => { this.setState({ home: "login" }) }}><i>Login</i></Link>
                <Link style={{textDecoration: "none", fontFamily: "serif",marginTop:20,color:"black", cursor:"pointer", marginLeft:20  }} variant="h6" size="large" onClick={()=>{this.setState({about_open:true})}}><i>About</i></Link>
                <Container style={{ paddingTop: 90 }}>
                    <Card style={{ height: 600, width: 1100, background: "whitesmoke" }}>
                        <CardContent style={{ marginLeft: 50, width: 1000 }}>
                            <Typography variant="h4" style={{ textAlign: "center", fontFamily: "serif", marginTop: 40 }}><i><b>Create Your Free Account For Access To The Notebook Anytime</b></i></Typography>
                            <Typography variant="h5" style={{ textAlign: "center", fontFamily: "serif" }}><i>Account Information</i></Typography><br />
                            <Grid container item xs={12} spacing={5}>
                                <Grid item lg={6} xs={6}>
                                    <Typography variant="h7" style={{ fontFamily: "serif" }}><i><b>Full Name</b></i></Typography>
                                    <TextField
                                        variant="outlined"
                                        color="primary"
                                        label="Enter Your Full Name"
                                        required={true}
                                        margin="dense"
                                        fullWidth
                                        value={this.state.name}
                                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                                    /><br />
                                    <Typography variant="h7" style={{ fontFamily: "serif" }}><i><b>Email Id</b></i></Typography>
                                    <TextField
                                        variant="outlined"
                                        color="primary"
                                        label="Enter Your Email Id"
                                        required={true}
                                        margin="dense"
                                        fullWidth
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                                    /><br />
                                    <Typography variant="h7" style={{ fontFamily: "serif" }}><i><b>Phone Number</b></i></Typography>
                                    <TextField
                                        variant="outlined"
                                        color="primary"
                                        label="Enter Your Phone Number"
                                        required={true}
                                        margin="dense"
                                        value={this.state.phone}
                                        fullWidth
                                        onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                    /><br />
                                </Grid>
                                <Grid item lg={6} xs={6}>
                                    <Typography variant="h7" style={{ fontFamily: "serif" }}><i><b>Password</b></i></Typography>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        color="primary"
                                        margin="dense"
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password" >Enter Your Pasword</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                                            endAdornment={<InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            labelWidth={150}
                                        />
                                    </FormControl><br />
                                    <Typography variant="h7" style={{ fontFamily: "serif" }}><i><b>Confirm Password</b></i></Typography>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        color="primary"
                                        margin="dense"
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password" >Re-nter Your Pasword</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={this.state.showPasswordC ? 'text' : 'password'}
                                            value={this.state.cPassword}
                                            onChange={(e) => { this.setState({ cPassword: e.target.value }) }}
                                            endAdornment={<InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickPassword}
                                                    onMouseDown={this.handleMouseDownPasswordC}
                                                    edge="end"
                                                >
                                                    {this.state.showPasswordC ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            labelWidth={150}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                style={{ width: 450, background: "teal", marginTop: 40, fontFamily: "serif", marginLeft: 250, borderRadius:20 }}
                                margin="dense"
                                size="large"
                                onClick={this.handleRegister}
                                variant="contained"
                                disabled={(this.state.name === "" || this.state.email === "" || this.state.phone === "" || this.state.password === "" || this.state.cPassword === "") ? true : false}
                            >
                                <i><b>Create Your Account</b></i>
                            </Button><br />
                            <br />

                            <Typography variant="h6" style={{ textAlign: "center", fontFamily: "serif" }}><i><b>__________OR__________</b></i></Typography><br />
                            <Typography variant="h6" style={{ textAlign: "center", fontFamily: "serif" }}><i>Already registered <Link onClick={() => { this.setState({ home: "login" }) }} style={{ textDecoration: "none", cursor: "pointer" }}>Login </Link>?</i></Typography>
                        </CardContent>
                    </Card>
                </Container>
                <Dialog open={this.state.open} fullWidth >
                    <Card style={{ background: "teal" }}>
                        <CardContent>
                            <DialogContent >
                                <Alert severity="info">{this.state.message}</Alert>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { this.setState({ open: false }) }} autoFocus variant="outlined" style={{ color: "black", background: "lightgrey", fontFamily: "serif" }}>
                                    OK
                                </Button>
                            </DialogActions>
                        </CardContent>
                    </Card>

                </Dialog>
                <Dialog open={this.state.dialog} fullWidth>
                    <Card style={{ background: "teal" }}>
                        <CardContent>
                            <DialogContent>
                                <Alert severity="success">{this.state.message}</Alert>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { this.setState({ dialog: false, home: "login" }) }} autoFocus variant="outlined" style={{ color: "black", background: "lightgrey", fontFamily: "serif" }}>
                                    OK
                                </Button>
                            </DialogActions>
                        </CardContent>
                    </Card>

                </Dialog>

                  {/* AFTER CLICKING ON HELP */}
                  <Dialog open={this.state.about_open} fullScreen>
                        <DialogContent>
                            <AppBar style={{ position: 'relative', background: "black", color: "white"}}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={() => { this.setState({ about_open: false }) }} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h3" style={{ fontFamily: "serif", position: "center", color:"whitesmoke", marginLeft:650 }}>
                                        <i>About</i>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center", marginTop:50}}><i>Be more productive with this beautifully simple note-taking app. </i></Typography><br />
                              <Typography variant="h4" style={{fontFamily:"serif", textAlign:"center"}}><i><b>TAKE NOTES</b></i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>Notebook provides different ways to take notes and capture your thoughts.</i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>* Write notes. Start with a text, add images, all in the same text note.</i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>* Capture moments using the dedicated photo note.</i></Typography><br />
                            <Typography variant="h4" style={{fontFamily:"serif", textAlign:"center"}}><i><b>ORGANIZE NOTES</b></i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>Keep yourself and your work organized.</i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>* Organize various notes into notebooks.</i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>* Search within a notebook or across notebooks.</i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>* Securely lock your note with passwords of your choice.</i></Typography><br />
                            <Typography variant="h4" style={{fontFamily:"serif", textAlign:"center"}}><i><b>SYNCHRONIZE ACROSS DEVICES</b></i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>Access your work anywhere and everywhere with Notebook's ability to sync your notes to the cloud.</i></Typography>
                            <Typography variant="h5" style={{fontFamily:"serif", textAlign:"center"}}><i>* Synchronize all your notes and notebooks across devices and to the cloud.</i></Typography><br />


                              
                            </div>

                        </DialogContent>
                    </Dialog>
                {/* <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={10000}
                    onClose={this.handleClose}
                    message={this.state.message}
                    action={
                        <IconButton onClick={this.handleClose}>
                            <Icon style={{ color: "white" }}>
                                close
                            </Icon>
                        </IconButton>
                    }
                /> */}
            </div>
        )
    }
}