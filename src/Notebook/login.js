import { AppBar, IconButton, Toolbar, Typography, Link, DialogTitle, Grid, Button, Container, Card, CardContent, TextField, Snackbar, Icon, DialogActions, DialogContent, Dialog } from '@material-ui/core';
import React from 'react';
import back from '../Images/lg.jpg';
import google from '../Images/gl.png';
import ct from '../Images/ct.png';
import Alert from '@material-ui/lab/Alert';
import Notebook from "./notebook";
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

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            home: "",
            showPassword: false,
            signup: "",
            loginSuccess: false,
            open: false,
            password_forgot: "",
            password_forgot_show: "",
            dialogepasswordopen: false,
            forgot_email: "",
            dialogepassword: false,
            dialogepasswordopen: false,
            dialogepassworderror: false,
            about_open: false,



        }
    }
    handleLogin = () => {
        fetch("http://localhost:5000/login_user", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                console.log("login");
                if (resJson.status === true) {
                    localStorage.setItem("user-token", JSON.stringify(resJson.token));
                    this.setState({
                        message: resJson.message,
                        loginSuccess: true,
                        email: resJson.result
                    })
                } else {
                    this.setState({
                        message: resJson.message,
                        loginSuccess: false,
                        open: true
                    })
                }
                console.log(this.state.email);
            })
    }
    //FOR LOGIN
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleMouseDownPassword = (e) => {
        e.preventDefault();
    }
    //FOR FORGOT PASSWORD
    handleShowPassword = () => {
        this.setState({
            password_forgot_show: !this.state.password_forgot_show
        })
    }

    handleMousePassword = (e) => {
        e.preventDefault();
    }

    //FUNCTION CALL TO CHANGE PASSWORD
    handleChangePassword = () => {
        fetch("http://localhost:5000/forgot_password", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.forgot_email,
                "password": this.state.password_forgot
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        dialogepassword: true,
                        message: resJson.message,
                        dialogepasswordopen: false
                    })
                } else {
                    this.setState({
                        dialogepassworderror: true,
                        message: resJson.message

                    })
                }
            }
            )
    }


    render() {
        if (this.state.home === "home") {
            return (
                <Redirect to="home" />
            )
        }
        if (this.state.signup === "signup") {
            return (
                <Redirect to="signup" />
            )
        }
        if (this.state.loginSuccess === true) {
            return (
                <div>
                    {/* <Notebook ver_email={this.state.email} /> */}
                    <Redirect
                        to={{
                            pathname: "/notebook",
                            state: { ver_email: this.state.email }
                        }} />
                </div>
            )
        }
        return (
            <div style={{ background: "url(" + back + ")", backgroundSize: "cover", height: "100vh", width: "100vw" }} grid={{ xs: 12 }}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <Grid item xs={12}>
                        <Link style={{ textDecoration: "none", fontFamily: "serif", marginLeft: 20, color: "black", marginTop: 20, cursor: "pointer" }} variant="h6" size="large" onClick={() => { this.setState({ home: "home" }) }}><i>Home</i></Link>
                        <Link style={{ textDecoration: "none", fontFamily: "serif", marginTop: 20, color: "black", cursor: "pointer", marginLeft: 20 }} variant="h6" size="large" onClick={() => { this.setState({ signup: "signup" }) }}><i>Signup</i></Link>
                        <Link style={{ textDecoration: "none", fontFamily: "serif", marginTop: 20, color: "black", cursor: "pointer", marginLeft: 20 }} variant="h6" size="large" onClick={() => { this.setState({ about_open: true }) }}><i>About</i></Link>
                        <Container style={{ paddingTop: 90 }}>
                            <Card style={{ height: 600, width: 600, background: "lightgrey" }}>
                                <CardContent style={{ marginLeft: 50, width: 470 }}>
                                    <Typography variant="h3" style={{ textAlign: "center", fontFamily: "serif", marginTop: 20 }}><i><b>Welcome To Notebook!</b></i></Typography>
                                    <Typography variant="h5" style={{ textAlign: "center", fontFamily: "serif" }}><i>Sign In your account</i></Typography><br />
                                    <Typography variant="h6" style={{ fontFamily: "serif", marginTop: 30 }}><i><b>Email Id</b></i></Typography>
                                    <TextField
                                        variant="outlined"
                                        color="primary"
                                        label="Enter Your Email Id"
                                        required={true}
                                        margin="dense"
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                                        fullWidth
                                    /><br />
                                    <Typography variant="h6" style={{ fontFamily: "serif" }}><i><b>Password</b></i></Typography>
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
                                    </FormControl>
                                    <Link style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => { this.setState({ dialogepasswordopen: true }) }}><Typography variant="h6" style={{ textAlign: "right", fontFamily: "serif" }}><i>Forgot Password</i></Typography></Link>
                                    <br />
                                    <Button
                                        style={{ width: 300, background: "teal", marginLeft: 80, marginTop: 30, fontFamily: "serif", borderRadius: 20 }}
                                        margin="dense"
                                        size="large"
                                        onClick={this.handleLogin}
                                        variant="contained"
                                        disabled={(this.state.email === "" || this.state.password === "") ? true : false}
                                    >
                                        <i><b>Get Started</b></i>
                                    </Button><br /><br />
                                    {/* <Typography variant="h6" style={{ textAlign: "center", fontFamily: "serif" }}><i><b>__________OR__________</b></i></Typography><br />
                            <Typography variant="h6" style={{ textAlign: "center", fontFamily: "serif" }}><b><i>Sign In With</i></b>
                                <IconButton>
                                    <Icon style={{ color: "blue" }}>
                                        facebook
                                </Icon>
                                </IconButton>
                                <IconButton>
                                    <Icon style={{ background: "url(" + google + ")", backgroundSize: "cover", color: "grey" }}></Icon>
                                </IconButton>
                            </Typography> */}
                                    <Typography variant="h6" style={{ textAlign: "center", fontFamily: "serif", marginTop: 30 }}><i>Don't have an account? <Link onClick={() => { this.setState({ signup: "signup" }) }} style={{ textDecoration: "none", cursor: "pointer" }}>Register here</Link></i></Typography>
                                </CardContent>
                            </Card>
                        </Container>


                        {/* FORGOT PASSWORD */}
                        <Dialog open={this.state.dialogepasswordopen} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle >
                                        <Typography variant="h5" style={{ fontFamily: "serif" }}>
                                            <i><b>Forgot Password</b></i>
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography variant="h6" style={{ fontFamily: "serif" }}><i><b>Email Id</b></i></Typography>
                                        <TextField
                                            variant="outlined"
                                            color="primary"
                                            label="Enter Your Email Id"
                                            required={true}
                                            margin="dense"
                                            value={this.state.forgot_email}
                                            onChange={(e) => { this.setState({ forgot_email: e.target.value }) }}
                                            fullWidth
                                        /><br />
                                        <Typography variant="h6" style={{ fontFamily: "serif" }}><i>Enter your New Password</i></Typography>
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
                                                type={this.state.password_forgot_show ? 'text' : 'password'}
                                                value={this.state.password_forgot}
                                                onChange={(e) => { this.setState({ password_forgot: e.target.value }) }}
                                                endAdornment={<InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleShowPassword}
                                                        onMouseDown={this.handleMousePassword}
                                                        edge="end"
                                                    >
                                                        {this.state.password_forgot_show ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                labelWidth={150}
                                            />
                                        </FormControl><br />
                                        <DialogActions>
                                            <Button
                                                variant="outlined"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={() => { this.setState({ dialogepasswordopen: false }) }}
                                                variant="outlined"
                                            >Cancel</Button>
                                            <Button
                                                variant="outlined"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={this.handleChangePassword}
                                                variant="outlined"
                                            >Update</Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>

                        {/* DIALOG BOX AFTER CLICKING UPDATE BUTTON OF CHANGE YOUR PASSWORD */}
                        <Dialog open={this.state.dialogepassworderror} fullWidth >
                            <Card>
                                <CardContent>
                                    <DialogContent >
                                        <Alert severity="info">{this.state.message}</Alert>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => { this.setState({ dialogepassworderror: false }) }} autoFocus variant="outlined" style={{ color: "black", background: "lightgrey", fontFamily: "serif" }}>
                                            OK
                                </Button>
                                    </DialogActions>
                                </CardContent>
                            </Card>

                        </Dialog>
                        <Dialog open={this.state.dialogepassword} fullWidth>
                            <Card style={{ background: "darkgrey" }}>
                                <CardContent>
                                    <DialogContent>
                                        <Alert severity="success">{this.state.message}</Alert>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => { this.setState({ dialogepassword: false }) }} autoFocus variant="outlined" style={{ color: "black", background: "lightgrey", fontFamily: "serif" }}>
                                            OK
                                </Button>
                                    </DialogActions>
                                </CardContent>
                            </Card>

                        </Dialog>


                        {/* AFTER CLICKING ON THE LOGIN BUTTON IF WE GET ANY ERROR THE THIS DIALOG BOX WILL OPEN */}
                        <div style={{ background: "url(" + ct + ")", backgroundSize: "cover", height: 320, width: 350, marginTop: -300, marginLeft: 730 }}></div>
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

                        {/* AFTER CLICKING ON HELP */}
                        <Dialog open={this.state.about_open} fullScreen>
                            <DialogContent>
                                <AppBar style={{ position: 'relative', background: "black", color: "white" }}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={() => { this.setState({ about_open: false }) }} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography variant="h3" style={{ fontFamily: "serif", position: "center", color: "whitesmoke", marginLeft: 650 }}>
                                            <i>About</i>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center", marginTop: 50 }}><i>Be more productive with this beautifully simple note-taking app. </i></Typography><br />
                                    <Typography variant="h4" style={{ fontFamily: "serif", textAlign: "center" }}><i><b>TAKE NOTES</b></i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>Notebook provides different ways to take notes and capture your thoughts.</i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>* Write notes. Start with a text, add images, all in the same text note.</i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>* Capture moments using the dedicated photo note.</i></Typography><br />
                                    <Typography variant="h4" style={{ fontFamily: "serif", textAlign: "center" }}><i><b>ORGANIZE NOTES</b></i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>Keep yourself and your work organized.</i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>* Organize various notes into notebooks.</i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>* Search within a notebook or across notebooks.</i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>* Securely lock your note with passwords of your choice.</i></Typography><br />
                                    <Typography variant="h4" style={{ fontFamily: "serif", textAlign: "center" }}><i><b>SYNCHRONIZE ACROSS DEVICES</b></i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>Access your work anywhere and everywhere with Notebook's ability to sync your notes to the cloud.</i></Typography>
                                    <Typography variant="h5" style={{ fontFamily: "serif", textAlign: "center" }}><i>* Synchronize all your notes and notebooks across devices and to the cloud.</i></Typography><br />



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
                    </Grid>
                </Grid>
            </div>
        )
    }
}