import { Typography,Link, Grid, Button, Dialog,DialogContent,AppBar,Toolbar,IconButton } from '@material-ui/core';
import React from 'react';
import note from '../Images/note.png';
import back from '../Images/bg1.jpg';
import '../App.css';
import CloseIcon from '@material-ui/icons/Close';


import{
    Redirect
} from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            login:"",
            about_open:false
        }
    }
    
    render() {
        if(this.state.login=== "login"){
            return(
                <Redirect to="login" />
            )
        }
        return (
            <div grid={{xs:12}}>
                <div style={{ background: "url(" + back + ")", backgroundSize: "cover", minHeight:"100vh", maxWidth:"100vw", justifyItems:"center"}}>
                <Link style={{textDecoration: "none", fontFamily: "serif", marginLeft:20,color:"black",marginTop:20, cursor:"pointer"  }} variant="h6" size="large" onClick={this.handleHome}><i>Home</i></Link>
                        <Link style={{textDecoration: "none", fontFamily: "serif",marginTop:20,color:"black", cursor:"pointer", marginLeft:20  }} variant="h6" size="large" onClick={()=>{this.setState({login:"login"})}}><i>Login</i></Link>
                        <Link style={{textDecoration: "none", fontFamily: "serif",marginTop:20,color:"black", cursor:"pointer", marginLeft:20  }} variant="h6" size="large" onClick={()=>{this.setState({about_open:true})}}><i>About</i></Link>
                <Grid container>
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h2" style={{ fontFamily: "serif", marginLeft: "10%",marginTop:"25%" }}><b><i>Welcome to Notebook!</i></b></Typography><br />
                        <Typography variant="h4" style={{fontFamily: "serif",marginLeft:120}}><i>In this notebook application you can add, manage, and organize a group of notes.<br />
                        This Notebook provides different ways to take notes and capture your thoughts. </i>
                        </Typography><br />
                        <Button variant="contained" size="large" style={{fontFamily: "serif", marginLeft:120, width:300, height:50,color:"white", backgroundColor:"#0f1924", borderRadius:20, borderBlockColor:"skyblue"}} onClick={()=>{this.setState({login:"login"})}}><i><b>Get Started</b></i></Button>
                    </Grid>
                    <Grid item xs={12} lg={6} style={{marginTop:170}}>
                        <div className="img" style={{ background: "url(" + note + ")", backgroundSize: "cover", height:400, width:500, marginLeft:100}}></div>
                    </Grid>
                </Grid>

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
                </div>
                
            </div>
        )
    }
}