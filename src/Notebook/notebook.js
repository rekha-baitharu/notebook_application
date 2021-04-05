import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    Drawer, AppBar, CssBaseline, Toolbar, Tooltip, Checkbox, List, Typography, Grid, TextField, DialogActions, Divider, MenuItem, ListItem, Icon, DialogContent, Dialog, Fab, DialogTitle, Card, CardContent, Button, IconButton, Menu, CardActions, Container
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import Alert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';
import cover from "../Images/back.jpg";
import prof from "../Images/prof.webp";
import { jsPDF } from "jspdf";
// import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "black"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
        background: "grey",
        height: "100vh"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: 230
    },
    fab: {
        position: 'absolute',
        marginLeft: 160,
        marginTop: 680
    },
    appbar: {
        position: 'relative',
        background: "grey",
        color: "white"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textarea: {
        width: 1400,
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        color: "white"
    },
});
// const classes = useStyles();

class Notebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            left: "left",
            text: "",
            title: "",
            date: "",
            note: [],
            menu: false,
            anchorEl: null,
            dialogBox: false,
            change: false,
            em: this.props.location.state.ver_email,
            name: "",
            password: "",
            number: "",
            dialogname: false,
            dialognameopen: false,
            dialognameerror: false,
            dialogepassword: false,
            dialogepasswordopen: false,
            dialogepassworderror: false,
            dialognumber: false,
            dialognumberopen: false,
            dialognumbererror: false,
            object: localStorage.getItem("object") ? JSON.parse(localStorage.getItem("object")) : [],
            notebook: [],
            subject: "",
            dialogpush: false,
            dialogpushopen: false,
            dialogpusherror: false,
            open_delete: false,
            delete_id: "",
            open_new: false,
            signup: false,
            signin: false,
            searchData: "",
            usertoken: [],
            note_dialog: false,
            note_id: "",
            about_open: false,
            sdata: "",
            profile: false,
            prof: [],
            profileImage: "",
            uploadedFile: null,
            value: "",
            indexval: "",
            starred: [],
            starred_dialog: false,
            starred_id: "",
            starred_para: "",
            starred_sub: "",
            indexOfNote: ""
        }
    }

    componentDidMount(e) {
        // console.log( this.props.ver_email);
        console.log(this.props.location.state.ver_email);
        if (this.state.searchData === "") {
            return;

        } else {
            this.handleGetData();
            this.handleGetDataStarred();
            // this.updateProfileHandler();
            localStorage.getItem("object") && this.setState({
                object: JSON.parse(localStorage.getItem("object")),
            })
        }
    }

    userToken = () => {
        localStorage.getItem("user-token") && this.setState({
            usertoken: JSON.parse(localStorage.getItem("user-token")),
        })
    }

    handleChange = (e, editor) => {
        const data = editor.getData();
        this.setState({
            note: data
        })
    }
    handleUpdate = (e, editor) => {
        const data = editor.getData();
        this.setState({
            note_paragraph: data
        })
    }


    //FUNCTION CALL TO CHANGE NAME
    handleProfile = () => {
        fetch("http://localhost:5000/update_profile", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "name": this.state.name,
                "phone_number": this.state.number
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        dialogProfile: true,
                        message: resJson.message,
                        edit_profile: false
                    })
                } else {
                    this.setState({
                        dialogProfileError: true,
                        message: resJson.message

                    })
                }
            }
            )
    }


    //FUNCTION CALL TO CHANGE NAME
    handleChangeName = () => {
        fetch("http://localhost:5000/update_name", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "name": this.state.name
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        dialogname: true,
                        message: resJson.message,
                        dialognameopen: false
                    })
                } else {
                    this.setState({
                        dialognameerror: true,
                        message: resJson.message

                    })
                }
            }
            )
    }

    //FUNCTION CALL TO CHANGE PASSWORD
    handleChangePassword = () => {
        fetch("http://localhost:5000/update_password", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "password": this.state.password
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

    //FUNCTION CALL TO CHANGE NUMBER
    handleChangeNumber = () => {
        fetch("http://localhost:5000/update_number", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "phone_number": this.state.number
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        dialognumber: true,
                        message: resJson.message,
                        dialognumberopen: false
                    })
                } else {
                    this.setState({
                        dialognumbererror: true,
                        message: resJson.message

                    })
                }
            }
            )
    }
    //ALERT FOR EMPTY NOTE
    alert = () => {
        if (this.state.notebook === []) {
            alert("Please Create a Note");
            return;
        }
    }



    //FUNCTION CALL TO GET DATA
    handleGetData = (val) => {
        if (this.state.object !== []) {
            this.setState({
                sdata: "sdata",
                value: "",
                indexval: ""
            })
            fetch("http://localhost:5000/get_notes", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-token': this.state.usertoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.state.em,
                })
            })
                .then(res => res.json())
                .then((resJson) => {
                    // localStorage.setItem("object",JSON.stringify(this.state.object));
                    this.setState({
                        object: resJson.result,
                        searchData: "",
                        val: "",
                        sdata: "sdata",
                        value: "",
                        indexval: ""
                    })
                    this.alert();
                    console.log(resJson.result);
                }
                )

        }
        else {
            alert('Please Create a note');
            return;
        }
        console.log(this.state.object);

    }



    //FUNCTION CALL TO GET DATA FROM STARRED ARRAY
    handleGetDataStarred = (val) => {
        if (this.state.starred !== []) {
            this.setState({
                sdata: "starred"
            })
            fetch("http://localhost:5000/get_starred", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-token': this.state.usertoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.state.em,
                })
            })
                .then(res => res.json())
                .then((resJson) => {
                    // localStorage.setItem("object",JSON.stringify(this.state.object));
                    this.setState({
                        starred: resJson.result,
                        searchData: "",
                        val: "",
                        sdata: "starred"

                    })
                    this.alert();
                    console.log(resJson.result);
                }
                )

        }
        else {
            alert('Please Create a note');
            return;
        }
        console.log(this.state.starred);

    }


    //FUNCTION CALL TO GET DATA FROM STARRED ARRAY
    handlePushStarred = (val) => {
        if (this.state.starred !== []) {
            this.setState({
                sdata: "starred"
            })
            fetch("http://localhost:5000/push_starred", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-token': this.state.usertoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.state.em,
                    "subject": this.state.starred_sub,
                    "paragraph": this.state.starred_para
                })
            })
                .then(res => res.json())
                .then((resJson) => {
                    console.log(resJson.message)
                    if (resJson.status === true) {
                        this.setState({
                            starred_dialog: false,
                        })
                    } else {
                        this.setState({
                            starred_dialog: true,

                        })
                    }
                    this.handleGetData();
                }
                )

        }
        else {
            alert('Please Create a note');
            return;
        }
        console.log(this.state.starred);

    }

    //FUNCTION CALL TO GET PROFILE
    handleGet = () => {
        fetch("http://localhost:5000/getusers", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                { this.state.profileImage === resJson.result[0].profileImage ? this.setState({ profileImage: resJson.result[0].profileImage }) : this.setState({ profileImage: { prof } }) }
                console.log(resJson);
                this.setState({
                    prof: resJson.result,
                    open: false,
                    profile: true,
                    profileImage: resJson.result[0].profileImage

                })
                this.updateProfileHandler();
            }
            )
    }


    //FUNCTION CALL TO PUSH DATA
    handlePush = () => {
        fetch("http://localhost:5000/push", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "subject": this.state.subject,
                "paragraph": this.state.note
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        dialogpushopen: true,
                        dialogpush: false,
                        message: resJson.message,
                        sdata: "sdata"
                    })
                } else {
                    this.setState({
                        dialogpusherror: true,
                        message: resJson.message

                    })
                }
                this.handleGetData();

            }
            )
    }

    //FUNCTION CALL TO PULL DATA
    handleDelete = () => {
        console.log(this.state.delete_id);
        fetch("http://localhost:5000/pull", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "id": this.state.delete_id
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        open_delete: false,
                        sdata: "sdata"
                    })
                } else {
                    this.setState({
                        open_delete: true,
                        message: resJson.message

                    })
                }
                this.handleGetData();
            }
            )
    }


    //FUNCTION CALL TO PULL DATA USING CHECK
    handleDeleteCheck = () => {
        if (this.state.indexOfNote === 0) {
            alert("Cannot be Placed in first position")
        } else if (this.state.value === "") {
            alert("please select one")
        } else {
            fetch("http://localhost:5000/pull", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-token': this.state.usertoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.state.em,
                    "id": this.state.check_id
                })
            })
                .then(res => res.json())
                .then((resJson) => {
                    if (resJson.status === true) {
                        this.setState({
                            open_check: true,
                            sdata: "sdata",
                            value: false
                        })
                    } else {
                        this.setState({
                            open_delete: true,
                            message: resJson.message

                        })
                    }
                    this.handleGetData();
                }
                )
        }
    }

    //FUNCTION CALL TO PULL LAST DATA USING CHECK
    handleDeleteLast = () => {
        if (this.state.indexOfNote === -1) {
            alert("Cannot be Placed in Last Position")
        } else if(this.state.value === ""){
            alert("please select one")
        }else{
            fetch("http://localhost:5000/pull", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-token': this.state.usertoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.state.em,
                    "id": this.state.check_id
                })
            })
                .then(res => res.json())
                .then((resJson) => {
                    if (resJson.status === true) {
                        this.setState({
                            open_last: true,
                            sdata: "sdata"
                        })
                    } else {
                        this.setState({
                            open_delete: true,
                            message: resJson.message

                        })
                    }
                    this.handleGetData();
                }
                )
        }
    }

    //FUNCTION CALL TO PULL LAST DATA USING CHECK
    handleDeletePrevious = () => {
        if (this.state.indexOfNote === 0) {
            alert("Cannot be Placed To Up")
        } else if(this.state.value === ""){
            alert("please select one")
        }else{
            fetch("http://localhost:5000/pull", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-token': this.state.usertoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.state.em,
                    "id": this.state.check_id
                })
            })
                .then(res => res.json())
                .then((resJson) => {
                    if (resJson.status === true) {
                        this.setState({
                            open_previous: true,
                            sdata: "sdata"
                        })
                    } else {
                        this.setState({
                            open_delete: true,
                            message: resJson.message

                        })
                    }
                    this.handleGetData();
                }
                )
        }
    }

    //FUNCTION CALL TO PULL LAST DATA USING CHECK
    handleDeleteNext = () => {
        if (this.state.indexOfNote === -1) {
            alert("Cannot be Placed To Down")
        } else if(this.state.value === ""){
            alert("please select one")
        }else{
            fetch("http://localhost:5000/pull", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-token': this.state.usertoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.state.em,
                    "id": this.state.check_id
                })
            })
                .then(res => res.json())
                .then((resJson) => {
                    if (resJson.status === true) {
                        this.setState({
                            open_next: true,
                            sdata: "sdata"
                        })
                    } else {
                        this.setState({
                            open_delete: true,
                            message: resJson.message

                        })
                    }
                    this.handleGetData();
                }
                )
        }
    }

    //FUNCTION CALL TO PUSH DATA IN THE FIRST POSITION
    handlePushFirst = () => {
        console.log(this.state.indexOfNote)
        fetch("http://localhost:5000/push_position", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "id": this.state.check_id,
                "subject": this.state.check_sub,
                "paragraph": this.state.check_para
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        open_check: false,
                        message: resJson.message
                    })
                } else {
                    this.setState({
                        open_delete: true,
                        message: resJson.message

                    })
                }
                this.handleGetData();
            }
            )
    }


    //FUNCTION CALL TO PUSH DATA IN THE LAST POSITION
    handlePushLast = () => {
        fetch("http://localhost:5000/push_last", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "id": this.state.check_id,
                "subject": this.state.check_sub,
                "paragraph": this.state.check_para
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        open_last: false,
                        message: resJson.message
                    })
                } else {
                    this.setState({
                        open_delete: true,
                        message: resJson.message

                    })
                }
                this.handleGetData();
            }
            )
    }

    //FUNCTION CALL TO PUSH DATA IN THE PREVIOUS POSITION
    handlePushPrevious = () => {
        fetch("http://localhost:5000/push_previous", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "id": this.state.check_id,
                "subject": this.state.check_sub,
                "paragraph": this.state.check_para,
                "position": this.state.indexOfNote - 1
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        open_previous: false,
                        message: resJson.message
                    })
                } else {
                    this.setState({
                        open_delete: true,
                        message: resJson.message

                    })
                }
                this.handleGetData();
            }
            )
    }

    //FUNCTION CALL TO PUSH DATA IN THE NEXT POSITION
    handlePushNext = () => {
        fetch("http://localhost:5000/push_next", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "id": this.state.check_id,
                "subject": this.state.check_sub,
                "paragraph": this.state.check_para,
                "position": this.state.indexOfNote + 1
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        open_next: false,
                        message: resJson.message
                    })
                } else {
                    this.setState({
                        open_delete: true,
                        message: resJson.message

                    })
                }
                this.handleGetData();
            }
            )
    }

    //FUNCTION CALL TO PULL DATA FROM STARRED ARRAY
    handleDeleteStarred = () => {
        fetch("http://localhost:5000/pull_starred", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "id": this.state.starred_id
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        starred_delete: false,
                        sdata: "starred"
                    })
                } else {
                    this.setState({
                        starred_delete: true,
                        message: resJson.message

                    })
                }
                this.handleGetDataStarred();
            }
            )
    }


    //FUNCTION CALL TO DELETE ACCOUNT PERMANENTLY
    handleDeleteAccount = () => {
        fetch("http://localhost:5000/delete_user_permanently", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        signup: true
                    })
                }
            }
            )
    }


    //FUNCTION CALL TO UPDATE NOTES
    handleUpdateNote = (note_id, note_subject, note_paragraph) => {
        fetch("http://localhost:5000/update_note", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.em,
                "id": this.state.note_id,
                "subject": this.state.note_subject,
                "paragraph": this.state.note_paragraph
            })
        })
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    this.setState({
                        dialog_note_messege: true,
                        message: resJson.message,
                        dialog_save: false,
                        sdata: "sdata"
                    })
                } else {
                    this.setState({
                        dialog_error_message: true,
                        message: resJson.message,
                        dialog_save: false
                    })
                }
                this.handleGetData();
            }
            )
    }


    logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    changeProfileImage = (event) => {
        this.setState({
            profileImage: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }

    updateProfileHandler = () => {
        if (this.state.profileImage === "") {
            alert("Please Choose a file");
            return;
        }
        // e.preventDefault();
        const formData = new FormData();
        formData.append("email", this.state.em);
        formData.append("profileImage", this.state.profileImage);
        fetch("http://localhost:5000/profile", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((resJson) => {
                console.log(resJson);
                this.setState({
                    profileImage: resJson.result.name,
                    profile: false
                })
                console.log(this.state.profileImage)
            })

    }




    // jsPDFGenerator=()=>{
    //     const doc = new jsPDF();
    //     doc.setFontSize(22);
    //     doc.text( 10, 10,this.state.text);
    //     doc.setFontSize(16);
    //     doc.text( 10, 10,this.state.textPara,{width:600,marginLeft:10,marginTop:10});
    //     doc.save("myFile.pdf");
    //     this.setState({jspdf:false})
    // }

    render() {
        if (this.state.signup === true) {
            return (
                <div>
                    <Redirect to="signup" />
                </div>
            )
        }
        if (this.state.signin === true) {
            return (
                <div>
                    <Redirect to="/" />
                </div>
            )
        }
        const { classes } = this.props;

        // var pp = this.state.profileImage;
        // if (this.state.profileImage) {
        //     var pp = this.state.profileImage;
        // } else {
        //     pp = prof;
        // }

        return (
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <Grid item xs={12}>
                        <CssBaseline />
                        {/* APP BAR */}
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h3" noWrap style={{ fontFamily: "serif" }}>
                                    <i>Notebook</i>
                                </Typography>
                                <Tooltip title="Go to First position" >
                                    <IconButton style={{ marginLeft: 730, color: "white" }} onClick={this.handleDeleteCheck}>
                                        <Icon>
                                            first_page
                                    </Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Go to Previous position">
                                    <IconButton style={{ color: "white" }} onClick={this.handleDeletePrevious}>
                                        <Icon>
                                            arrow_upward
                                    </Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Go to Next poition">
                                    <IconButton style={{ color: "white" }} onClick={this.handleDeleteNext}>
                                        <Icon>
                                            arrow_downward
                                    </Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Go to Last position">
                                    <IconButton style={{ color: "white" }} onClick={this.handleDeleteLast}>
                                        <Icon>
                                            last_page
                                    </Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Search the Subject">
                                    <input type="text" onChange={(e) => this.setState({ searchData: e.target.value })} style={{ height: 30, width: 300, borderRadius: 10 }} placeholder="Search the subject" />
                                </Tooltip>
                                <MenuIcon fontSize="large" style={{ marginLeft: 30 }} onClick={(e) => { this.setState({ open: true, anchorEl: e.currentTarget }) }} />
                                <Menu
                                    id="lock-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={this.state.open}
                                    onClose={() => { this.setState({ open: false }) }}>
                                    <MenuItem onClick={this.handleGet}><Typography style={{ fontFamily: "serif" }}>My Profile</Typography></MenuItem>
                                    <MenuItem onClick={() => { this.setState({ open: false, change: true }) }}><Typography style={{ fontFamily: "serif" }}>Manage Account</Typography></MenuItem>
                                    <MenuItem onClick={this, this.logout}><Typography style={{ fontFamily: "serif" }}>Log Out</Typography></MenuItem>
                                    <MenuItem onClick={() => { this.setState({ account_open: true, open: false }) }}><Typography style={{ fontFamily: "serif" }}>Delete Account</Typography></MenuItem>
                                    <MenuItem onClick={() => { this.setState({ about_open: true, open: false }) }}><Typography style={{ fontFamily: "serif" }}>About</Typography></MenuItem>
                                </Menu>
                                {/* () => { this.setState({ open: false, signin:true }) } */}
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <Toolbar />
                            <div className={classes.drawerContainer}>
                                <List >
                                    <Tooltip title="See all Notes">
                                        <ListItem style={{ fontFamily: "serif", cursor: "pointer", color: "white" }} onClick={(val) => this.handleGetData(val)}>
                                            <Icon>description</Icon>
                                            <Typography style={{ fontFamily: "serif", marginLeft: 15 }}>All Notes</Typography></ListItem>
                                    </Tooltip>
                                    <Divider />
                                    <Tooltip title="Starred">
                                        <ListItem style={{ fontFamily: "serif", cursor: "pointer", color: "white" }} onClick={(val) => this.handleGetDataStarred(val)}>
                                            <Icon>grade</Icon>
                                            <Typography style={{ fontFamily: "serif", marginLeft: 15 }}>Starred</Typography></ListItem>
                                    </Tooltip>
                                    <Divider />
                                </List>
                            </div>
                            <Fab className={classes.fab} style={{ background: "black", color: "white" }} aria-label="add" onClick={() => { this.setState({ dialog: true }) }}>
                                <Tooltip title="Create a Note">
                                    <AddIcon />
                                </Tooltip>
                            </Fab>
                        </Drawer>

                        {/* MAIN PART */}
                        <main className={classes.content}>
                            <Toolbar />
                            <div>
                                {this.state.sdata === "sdata" ?
                                    <ol>{
                                        this.state.object.filter((val) => {
                                            if (this.state.searchData === "") {
                                                return "No result found"
                                            } else if (val.subject.toLowerCase().includes(this.state.searchData.toLowerCase())) {
                                                return val
                                            }
                                        }).map((s, index) => {
                                            return (
                                                <div>
                                                    <Card key={s.id} style={{ width: 1200, backgroundColor: "#0f1924" }}>
                                                        <CardContent>
                                                            <Typography variant="h6" style={{ fontFamily: "serif", color: "white" }}><i><b>{s.subject}</b></i></Typography>
                                                            <CardActions>
                                                                <Tooltip title="Open Note">
                                                                    <IconButton onClick={() => { this.setState({ sub: s.subject, para: s.paragraph, open_new: true }) }} style={{ marginLeft: 900, color: "white" }}><Icon>open_in_new</Icon></IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Edit Note">
                                                                    <IconButton onClick={() => { this.setState({ note_id: s.unique_id, note_paragraph: s.paragraph, note_subject: s.subject, note_dialog: true }) }} style={{ color: "white" }}><Icon>edit</Icon></IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete Note">
                                                                    <IconButton onClick={() => { this.setState({ delete_id: s.unique_id, open_delete: true }) }} style={{ color: "white" }}><Icon>delete</Icon></IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Starred">
                                                                    <IconButton onClick={() => { this.setState({ starred_id: s.unique_id, starred_para: s.paragraph, starred_sub: s.subject, starred_dialog: true }) }} style={{ color: "white" }}><Icon>star_rate</Icon></IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Click to Change the position">
                                                                    <Checkbox value={this.state.value}
                                                                        style={{ color: "white" }}
                                                                        checked={this.state.indexval === s.unique_id}
                                                                        onClick={(e) => { if (e.target.checked === true) { this.setState({ check_sub: s.subject, check_id: s.unique_id, check_para: s.paragraph, value: false, value: s.unique_id, indexval: s.unique_id, indexOfNote: index }) } }}
                                                                    />
                                                                </Tooltip>
                                                                {/* <Tooltip title="Download">
                                                                    <Button onClick={()=>{this.setState({jspdf:true, text:s.subject, textPara:s.paragraph })}}>Downlad</Button>
                                                                </Tooltip> */}
                                                            </CardActions>
                                                        </CardContent>
                                                    </Card><br />
                                                </div>
                                            )
                                        })}</ol> :
                                    <ol>{
                                        this.state.starred.filter((val) => {
                                            if (this.state.searchData === "") {
                                                return "No result found"
                                            } else if (val.subject.toLowerCase().includes(this.state.searchData.toLowerCase())) {
                                                return val
                                            }
                                        }).map((s, index) => {
                                            return (
                                                <div>
                                                    <Card key={s.id} style={{ width: 1200, backgroundColor: "#0f1924" }}>
                                                        <CardContent>
                                                            <Typography variant="h6" style={{ fontFamily: "serif", color: "white" }}><i><b>{s.subject}</b></i></Typography>
                                                            <CardActions>
                                                                <Tooltip title="Open Note">
                                                                    <IconButton onClick={() => { this.setState({ starred_sub: s.subject, starred_para: s.paragraph, starred_open: true }) }} style={{ marginLeft: 1050, color: "white" }}><Icon>open_in_new</Icon></IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete Note">
                                                                    <IconButton onClick={() => { this.setState({ starred_id: s.unique_id, starred_delete: true }) }} style={{ color: "white" }}><Icon>delete</Icon></IconButton>
                                                                </Tooltip>
                                                            </CardActions>
                                                        </CardContent>
                                                    </Card><br />
                                                </div>
                                            )
                                        })}</ol>
                                }
                            </div>
                            <div>
                                {this.state.sdata === "" ? <Typography variant="h2" style={{ fontFamily: "serif", textAlign: "center", marginTop: 150, marginleft: 50 }}><b><i>If you have visited for the first time then click on the Plus button and create your first note
                            otherwise click on All Notes to see your all Notes</i></b></Typography> : <></>}
                            </div>
                        </main>


                        {/* AFTER CLICKING ON DOWNLOAD BUTTON */}
                        <Dialog open={this.state.jspdf} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>Download ONE OBJECT</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }}>Are you sure you want to download this?</Typography>
                                <DialogActions>
                                    <Button onClick={() => { this.setState({ jspdf: false }) }} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }} size="large">
                                        CANCEL
                            </Button>
                                    <Button onClick={this.jsPDFGenerator} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }} size="large">
                                        YES
                            </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>



                        {/* AFTER CLICKING ON STARRED BUTTON */}
                        <Dialog open={this.state.starred_dialog} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>STARRED ONE OBJECT</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }}>Are you sure you want to add this on starred folder?</Typography>
                                <DialogActions>
                                    <Button onClick={() => { this.setState({ starred_dialog: false }) }} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }} size="large">
                                        CANCEL
                            </Button>
                                    <Button onClick={this.handlePushStarred} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }} size="large">
                                        YES
                            </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>


                        {/* AFTER CLICKING ON MY PROFILE BUTTON */}
                        <Dialog open={this.state.profile} fullScreen>
                            <DialogContent>
                                <AppBar className={classes.appbar}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={() => { this.setState({ profile: false }) }} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography variant="h3" className={classes.title} style={{ fontFamily: "serif", textAlign: "center" }}>
                                            <i>My Profile</i>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div style={{ background: "url(" + cover + ")", backgroundSize: "cover", height: "70vh", width: "97vw" }}>
                                    {this.state.prof.map((s) => {
                                        return (
                                            <div>
                                                <Container style={{ paddingTop: 70, height: 300, width: 1000 }}>
                                                    <Card style={{ height: 550, width: 1000, background: "lightgrey" }}>
                                                        <CardContent>
                                                            <Grid container>
                                                                <Grid item lg={6} xs={6} style={{ marginLeft: 30, marginTop: 30 }}>
                                                                    {this.state.profileImage ? <img src={"http://localhost:5000/" + this.state.profileImage.name} alt="profileImage" width="350" style={{ borderRadius: 20, height: 350, width: 350 }} /> :
                                                                        <img src={prof} width="350" style={{ borderRadius: 20 }} />

                                                                    }
                                                                    {/* <Card style={{ background: "url(" + prof + ")", backgroundSize: "cover", height: 350, width: 350, borderRadius: 20, backgroundColor: "black" }}></Card> */}
                                                                </Grid><br />
                                                                <Grid item lg={6} xs={6} style={{ marginLeft: -50, marginTop: 30 }}>
                                                                    <Typography variant="h4" style={{ fontFamily: "serif" }}><i><b>Full Name</b></i></Typography>
                                                                    <Typography variant="h5" style={{ fontFamily: "serif" }}><i>{s.name}</i></Typography><br />
                                                                    <Typography variant="h4" style={{ fontFamily: "serif" }}><i><b>Email Id</b></i></Typography>
                                                                    <Typography variant="h5" style={{ fontFamily: "serif" }}><i>{s.email}</i></Typography><br />
                                                                    <Typography variant="h4" style={{ fontFamily: "serif" }}><i><b>Phone number</b></i></Typography>
                                                                    <Typography variant="h5" style={{ fontFamily: "serif" }}><i>{s.phone_number}</i></Typography><br />
                                                                    <Typography variant="h4" style={{ fontFamily: "serif" }}><i><b>Id</b></i></Typography>
                                                                    <Typography variant="h5" style={{ fontFamily: "serif" }}><i>{s._id}</i></Typography>

                                                                </Grid>
                                                            </Grid>
                                                            <form
                                                            // action="/profile" method="post" enctype="multipart/form-data"
                                                            >
                                                                {/* <input type="file" name="profileImage" style={{ width: 300, marginLeft: 100, marginTop: 20 }} /> */}
                                                                <Typography variant="h6" style={{ marginTop: 20, fontFamily: "serif", marginLeft: 50 }}><i><b>Update Profile:</b></i>
                                                                    <input type="file" style={{ width: 300, marginTop: 20, marginLeft: 10 }} onChange={this.changeProfileImage.bind(this)} />
                                                                </Typography>
                                                            </form>
                                                            {/* <input type="file" name="profileImage" style={{ width: 300, marginLeft: 100, marginTop: 20 }}/><br /> */}
                                                            <Button variant="contained" size="large" style={{ width: 300, marginLeft: 150, marginTop: 20, borderRadius: 20 }} onClick={this.updateProfileHandler.bind(this)} ><Typography style={{ fontFamily: "serif" }}><i>Upload Profile</i></Typography></Button>
                                                            <Button variant="contained" size="large" style={{ width: 300, marginLeft: 50, marginTop: 20, borderRadius: 20 }} onClick={() => { this.setState({ edit_profile: true, name: s.name, number: s.phone_number }) }}><Typography style={{ fontFamily: "serif" }}><i>Edit Profile</i></Typography></Button>
                                                        </CardContent>
                                                    </Card>

                                                </Container>
                                            </div>
                                        )

                                    })}
                                </div>

                            </DialogContent>
                        </Dialog>


                        {/* AFTER CLICKING ON OPEN ICON BUTTON OF ALL NOTES ARRAY*/}
                        <Dialog open={this.state.open_new} onClose={() => { this.setState({ dialog: false }) }} fullScreen>
                            <DialogContent>
                                <AppBar className={classes.appbar}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={() => { this.setState({ open_new: false }) }} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography variant="h3" className={classes.title} style={{ fontFamily: "serif", textAlign: "center" }}>
                                            <i>{this.state.sub}</i>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div>
                                    <Typography variant="h6" style={{ fontFamily: "serif", textAlign: "center" }}><i>{ReactHtmlParser(this.state.para)}</i></Typography>
                                </div>

                            </DialogContent>
                        </Dialog>


                        {/* AFTER CLICKING ON DELETE ICON BUTTON OF ALL NOTES ARRAY*/}
                        <Dialog open={this.state.open_delete} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>DELETE ONE OBJECT</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }}>Are you sure you want to delete this?</Typography>
                                <DialogActions>
                                    <Button onClick={() => { this.setState({ open_delete: false }) }} size="large" variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        CANCEL
                            </Button>
                                    <Button onClick={this.handleDelete} variant="contained" size="large" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        DELETE
                            </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>

                        {/* AFTER CLICKING ON OPEN ICON BUTTON OF STARRED ARRAY*/}
                        <Dialog open={this.state.starred_open} onClose={() => { this.setState({ dialog: false }) }} fullScreen>
                            <DialogContent>
                                <AppBar className={classes.appbar}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" size="large" onClick={() => { this.setState({ starred_open: false }) }} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography variant="h3" className={classes.title} style={{ fontFamily: "serif", textAlign: "center" }}>
                                            <i>{this.state.starred_sub}</i>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div>
                                    <Typography variant="h6" style={{ fontFamily: "serif", textAlign: "center" }}><i>{ReactHtmlParser(this.state.starred_para)}</i></Typography>
                                </div>

                            </DialogContent>
                        </Dialog>


                        {/* AFTER CLICKING ON DELETE ICON BUTTON OF STARRED ARRAY*/}
                        <Dialog open={this.state.starred_delete} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>DELETE ONE OBJECT</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }}>Are you sure you want to delete this?</Typography>
                                <DialogActions>
                                    <Button onClick={() => { this.setState({ starred_delete: false }) }} size="large" variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        CANCEL
                            </Button>
                                    <Button onClick={this.handleDeleteStarred} variant="contained" size="large" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        DELETE
                            </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>

                        {/* <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        className={classes.speedDial}
                        onClick={() => { this.setState({ dialog: true }) }}
                        // hidden={hidden}
                        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                        // onClose={handleClose}
                        // onOpen={handleOpen}
                        // open={open}
                    ></SpeedDial> */}

                        {/* </main> */}


                        {/* DIALOG BOX TO WRITE A NOTE*/}
                        <Dialog open={this.state.dialog} onClose={() => { this.setState({ dialog: false }) }} fullScreen>
                            <DialogContent>
                                <AppBar className={classes.appbar}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={() => { this.setState({ dialog: false }) }} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography variant="h3" className={classes.title} style={{ fontFamily: "serif" }}>
                                            <i>Create Your Note</i>
                                        </Typography>
                                        <Button autoFocus color="inherit" size="large" onClick={() => { this.setState({ dialogpush: true }) }} >
                                            save
                                        </Button>
                                    </Toolbar>
                                </AppBar>
                                <Typography variant="h4" style={{ fontFamily: "serif" }}><i>Subject</i></Typography>
                                <TextField
                                    variant="filled"
                                    color="primary"
                                    label="Enter Your Subject Name"
                                    required={true}
                                    margin="dense"
                                    value={this.state.subject}
                                    onChange={(e) => { this.setState({ subject: e.target.value }) }}
                                    fullWidth
                                />
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={this.state.addData}
                                    onChange={this.handleChange}

                                />
                            </DialogContent>
                        </Dialog>

                        {/* AFTER CLICKING ON SAVE BUTTON */}
                        <Dialog open={this.state.dialogpush} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle>
                                        <Typography variant="h4" style={{ fontFamily: "serif" }}><i>Notebook</i></Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography style={{ fontFamily: "serif" }}>Do you want to save it?</Typography>
                                        <DialogActions>
                                            <Button onClick={() => { this.setState({ dialogpush: false }) }} size="large" autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                Cancel
                                        </Button>
                                            <Button onClick={this.handlePush} size="large" autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                Save
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>
                        </Dialog>

                        {/* AFTER CLICKING ON OK BUTTON TO SAVE */}
                        <Dialog open={this.state.dialogpusherror} fullWidth >
                            <Card>
                                <CardContent>
                                    <DialogContent >
                                        <Alert severity="info">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button onClick={() => { this.setState({ dialogpusherror: false }) }} size="large" autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>
                        <Dialog open={this.state.dialogpushopen} fullWidth>
                            <Card style={{ background: "darkgrey" }}>
                                <CardContent>
                                    <DialogContent>
                                        <Alert severity="success">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialogpushopen: false, dialog: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>


                        {/* DIALOG BOX TO UPDATE A NOTE*/}
                        <Dialog open={this.state.note_dialog} fullScreen>
                            <DialogContent>
                                <AppBar className={classes.appbar}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={() => { this.setState({ note_dialog: false }) }} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography variant="h3" className={classes.title} style={{ fontFamily: "serif" }}>
                                            <i>Edit Your Note</i>
                                        </Typography>
                                        <Button autoFocus size="large" color="inherit" onClick={() => { this.setState({ dialog_save: true }) }} >
                                            save
                                        </Button>
                                    </Toolbar>
                                </AppBar>
                                <Typography variant="h4" style={{ fontFamily: "serif" }}><i>Subject</i></Typography>
                                <TextField
                                    variant="filled"
                                    color="primary"
                                    label="Enter Your Subject Name"
                                    required={true}
                                    margin="dense"
                                    value={this.state.note_subject}
                                    onChange={(e) => { this.setState({ note_subject: e.target.value }) }}
                                    fullWidth
                                />
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={this.state.addData}
                                    data={this.state.note_paragraph}
                                    onChange={this.handleUpdate}

                                />
                            </DialogContent>
                        </Dialog>




                        {/* AFTER CLICKING ON SAVE BUTTON OF UPDATE NOTES*/}
                        <Dialog open={this.state.dialog_save} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle>
                                        <Typography variant="h4" style={{ fontFamily: "serif" }}><i>Notebook</i></Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography style={{ fontFamily: "serif" }}>Do you want to save the updated note?</Typography>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialog_save: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                Cancel
                                        </Button>
                                            <Button size="large" onClick={this.handleUpdateNote} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                Save
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>
                        </Dialog>

                        {/* AFTER CLICKING ON OK BUTTON TO UPDATE */}
                        <Dialog open={this.state.dialog_error_message} fullWidth >
                            <Card>
                                <CardContent>
                                    <DialogContent >
                                        <Alert severity="info">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialog_error_message: false, dialog_save: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>
                        <Dialog open={this.state.dialog_note_messege} fullWidth>
                            <Card style={{ background: "darkgrey" }}>
                                <CardContent>
                                    <DialogContent>
                                        <Alert severity="success">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialog_note_messege: false, dialog_save: false, note_dialog: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>



                        {/* DIALOG BOX AFTER CLICKING ON MANAGE ACCOUNT */}
                        <Dialog open={this.state.change} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle >
                                        <Typography variant="h4" style={{ fontFamily: "serif" }}>
                                            <i><b>Manage Your Account</b></i>
                                            <IconButton edge="end" color="inherit" onClick={() => { this.setState({ change: false }) }} aria-label="close" style={{ marginLeft: 160 }}>
                                                <CloseIcon />
                                            </IconButton>
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <MenuItem onClick={() => { this.setState({ dialognameopen: true, change: false }) }}><Typography style={{ fontFamily: "serif", fontSize: "18px" }}>Update Your Name</Typography></MenuItem>
                                        <MenuItem onClick={() => { this.setState({ dialogepasswordopen: true, change: false }) }}><Typography style={{ fontFamily: "serif", fontSize: "18px" }}>Update Your Password</Typography></MenuItem>
                                        <MenuItem onClick={() => { this.setState({ dialognumberopen: true, change: false }) }}><Typography style={{ fontFamily: "serif", fontSize: "18px" }}>Update Your Phone Number</Typography></MenuItem>
                                    </DialogContent>
                                </CardContent>
                            </Card>
                        </Dialog>


                        {/* DIALOG BOX AFTER CLICKING ON UPDATE PROFILE */}
                        <Dialog open={this.state.edit_profile} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle >
                                        <Typography variant="h4" style={{ fontFamily: "serif" }}>
                                            <i><b>Update Your Profile</b></i>
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography variant="h6" style={{ fontFamily: "serif" }}><i>Enter your new name</i></Typography>
                                        <TextField
                                            variant="outlined"
                                            // color="primary"
                                            label="Enter Your Name"
                                            required={true}
                                            margin="dense"
                                            value={this.state.name}
                                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                                            fullWidth
                                        />
                                        <Typography variant="h6" style={{ fontFamily: "serif" }}><i>Enter your new phone number</i></Typography>
                                        <TextField
                                            variant="outlined"
                                            // color="primary"
                                            label="Enter Your Phone number"
                                            required={true}
                                            margin="dense"
                                            value={this.state.number}
                                            onChange={(e) => { this.setState({ number: e.target.value }) }}
                                            fullWidth
                                        />
                                        <DialogActions>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={() => { this.setState({ edit_profile: false }) }}
                                                variant="contained"
                                            >Cancel</Button>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={this.handleProfile}
                                                variant="contained"
                                            >Update</Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>

                        {/* DIALOG BOX AFTER CLICKING UPDATE BUTTON OF UPDATE PROFILE */}
                        <Dialog open={this.state.dialogProfileError} fullWidth >
                            <Card>
                                <CardContent>
                                    <DialogContent >
                                        <Alert severity="info">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialogProfileError: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>
                        <Dialog open={this.state.dialogProfile} fullWidth>
                            <Card style={{ background: "darkgrey" }}>
                                <CardContent>
                                    <DialogContent>
                                        <Alert severity="success">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialogProfile: false, profile: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>

                        {/* DIALOG BOX AFTER CLICKING ON CHANGE YOUR NAME */}
                        <Dialog open={this.state.dialognameopen} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle >
                                        <Typography variant="h4" style={{ fontFamily: "serif" }}>
                                            <i><b>Update Your Name</b></i>
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography variant="h6" style={{ fontFamily: "serif" }}><i>Enter your name</i></Typography>
                                        <TextField
                                            variant="outlined"
                                            // color="primary"
                                            label="Enter Your Name"
                                            required={true}
                                            margin="dense"
                                            value={this.state.name}
                                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                                            fullWidth
                                        />
                                        <DialogActions>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={() => { this.setState({ dialognameopen: false }) }}
                                            >Cancel</Button>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={this.handleChangeName}
                                            >Update</Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>

                        {/* DIALOG BOX AFTER CLICKING UPDATE BUTTON OF CHANGE YOUR NAME */}
                        <Dialog open={this.state.dialognameerror} fullWidth >
                            <Card>
                                <CardContent>
                                    <DialogContent >
                                        <Alert severity="info">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialognameerror: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>
                        <Dialog open={this.state.dialogname} fullWidth>
                            <Card style={{ background: "darkgrey" }}>
                                <CardContent>
                                    <DialogContent>
                                        <Alert severity="success">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialogname: false, profile: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>


                        {/* DIALOG BOX AFTER CLICKING ON CHANGE PASSWORD */}
                        <Dialog open={this.state.dialogepasswordopen} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle >
                                        <Typography variant="h4" style={{ fontFamily: "serif" }}>
                                            <i><b>Update Your Email Id</b></i>
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography variant="h6" style={{ fontFamily: "serif" }}><i>Enter your Password</i></Typography>
                                        <TextField
                                            variant="outlined"
                                            // color="primary"
                                            label="Enter Your Name"
                                            required={true}
                                            margin="dense"
                                            value={this.state.password}
                                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                                            fullWidth
                                        />
                                        <DialogActions>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={() => { this.setState({ dialogepasswordopen: false }) }}
                                            >Cancel</Button>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={this.handleChangePassword}
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
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialogepassworderror: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>
                        <Dialog open={this.state.dialogepassword} fullWidth>
                            <Card style={{ background: "darkgrey" }}>
                                <CardContent>
                                    <DialogContent>
                                        <Alert severity="success">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialogepassword: false, profile: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>


                        {/* DIALOG BOX AFTER CLICKING ON CHANGE PHONE NUMBER */}
                        <Dialog open={this.state.dialognumberopen} fullWidth>
                            <Card>
                                <CardContent>
                                    <DialogTitle >
                                        <Typography variant="h4" style={{ fontFamily: "serif" }}>
                                            <i><b>Update Your Email Id</b></i>
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography variant="h6" style={{ fontFamily: "serif" }}><i>Enter your Password</i></Typography>
                                        <TextField
                                            variant="outlined"
                                            // color="primary"
                                            label="Enter Your Name"
                                            required={true}
                                            margin="dense"
                                            value={this.state.number}
                                            onChange={(e) => { this.setState({ number: e.target.value }) }}
                                            fullWidth
                                        />
                                        <DialogActions>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={() => { this.setState({ dialognumberopen: false }) }}
                                            >Cancel</Button>
                                            <Button
                                                size="large"
                                                style={{ color: "black", background: "grey", fontFamily: "serif" }}
                                                margin="dense"
                                                size="large"
                                                onClick={this.handleChangeNumber}
                                                variant="contained"
                                            >Update</Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>

                        {/* DIALOG BOX AFTER CLICKING UPDATE BUTTON OF CHANGE YOUR EMAIL ID */}
                        <Dialog open={this.state.dialognumbererror} fullWidth >
                            <Card>
                                <CardContent>
                                    <DialogContent >
                                        <Alert severity="info">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialognumbererror: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>
                        <Dialog open={this.state.dialognumber} fullWidth>
                            <Card style={{ background: "darkgrey" }}>
                                <CardContent>
                                    <DialogContent>
                                        <Alert severity="success">{this.state.message}</Alert>
                                        <DialogActions>
                                            <Button size="large" onClick={() => { this.setState({ dialognumber: false, profile: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                                OK
                                        </Button>
                                        </DialogActions>
                                    </DialogContent>
                                </CardContent>
                            </Card>

                        </Dialog>

                        {/* AFTER CLICKIN ON DELETE ACCOUNT */}
                        <Dialog open={this.state.account_open} fullWidth>
                            <DialogTitle><Typography variant="h4" style={{ fontFamily: "serif" }}><i>Delete Account Permanently</i></Typography></DialogTitle>
                            <DialogContent>
                                <Typography variant="h6" style={{ fontFamily: "serif", color: "grey" }}><i>Are you sure you want to delete your account permanently?</i></Typography>
                                <DialogActions>
                                    <Button size="large" onClick={() => { this.setState({ account_open: false }) }} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        Cancel
                                </Button>
                                    <Button size="large" onClick={this.handleDeleteAccount} autoFocus variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }} size="large">
                                        Delete Account
                                </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>


                        {/* AFTER CLICKING ON GO TO FIRST ICON*/}
                        <Dialog open={this.state.open_check} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>POSITION UPDATED OF ALL NOTES</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }} >Positions Changed</Typography>
                                <DialogActions>
                                    <Button size="large" onClick={this.handlePushFirst} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        Ok
                                </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>

                        {/* AFTER CLICKING ON GO TO LAST ICON*/}
                        <Dialog open={this.state.open_last} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>POSITION UPDATED OF ALL NOTES</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }}>Positions Changed</Typography>
                                <DialogActions>
                                    <Button size="large" onClick={this.handlePushLast} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        Ok
                                </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>

                        {/* AFTER CLICKING ON GO TO PREVIOUS ICON*/}
                        <Dialog open={this.state.open_previous} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>POSITION UPDATED OF ALL NOTES</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }}>Positions Changed</Typography>
                                <DialogActions>
                                    <Button size="large" onClick={this.handlePushPrevious} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        Ok
                                </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>

                        {/* AFTER CLICKING ON GO TO NEXT ICON*/}
                        <Dialog open={this.state.open_next} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title"><Typography variant='h5' style={{ fontFamily: "Serif" }}>POSITION UPDATED OF ALL NOTES</Typography></DialogTitle>
                            <DialogContent>
                                <Typography style={{ fontFamily: "Serif", color: "grey" }}>Positions Changed</Typography>
                                <DialogActions>
                                    <Button size="large" onClick={this.handlePushNext} variant="contained" style={{ color: "black", background: "grey", fontFamily: "serif" }}>
                                        Ok
                                </Button>
                                </DialogActions>
                            </DialogContent>
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




                        {/* <Dialog open={this.state.dialogBox} onClose={()=>{this.setState({dialogBox:false})}}>
                    <DialogContent>
                    {ReactHtmlParser(this.state.note)}
                    </DialogContent>
                </Dialog> */}
                    </Grid>
                </Grid>
            </div>


        )
    }
}

export default withStyles(styles, { withTheme: true })(Notebook);