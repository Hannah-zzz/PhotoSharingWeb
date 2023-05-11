import React from 'react';
import {
    AppBar, Grid, Toolbar
} from '@mui/material';
import './TopBar.css';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

//import axios.get from "../../lib/axios.getData";
/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            user: this.props.user,
            isLogin: this.props.isLogin,
            adminname: this.props.adminname,
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        let prom = axios.get("test/info");
        prom.then(res => {
            this.setState({ver: res.data.__v});
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mode !== this.props.mode || prevProps.user !== this.props.user
            || prevProps.isLogin !== this.props.isLogin || prevProps.adminname !== this.props.adminname
            || prevProps.adminId !== this.props.adminId) {
            this.setState({
                mode: this.props.mode,
                user: this.props.user,
                isLogin: this.props.isLogin,
                adminname: this.props.adminname,
                //adminId:this.props.adminId
            });
        }
    }

    submit() {
        axios.post("/photos/new", this.uploadInput)
            .then(r => {
                console.log(r);
            });
        this.props.actsAdd();
    }

    logout() {
        this.props.changeAdmin("", "", false);
        this.setState({
            isLogin: false,
            adminname: ""
        });
        axios.post("/admin/logout")
            .then(r => {
                console.log("logout called");
                console.log(r);
            });
        this.props.actsAdd();
    }

    handleUploadButtonClicked = (e) => {
        e.preventDefault();
        if (this.uploadInput.files.length > 0) {
            // Create a DOM form and add the file to it under the name uploadedphoto
            const domForm = new FormData();
            domForm.append('uploadedphoto', this.uploadInput.files[0]);
            axios.post('/photos/new', domForm)
                .then((res) => {
                    this.props.actsAdd();
                    console.log(res);
                })
                .catch(err => console.log(`POST ERR: ${err}`));
        }
    };

    render() {
        let path = '/favorite';
        let pathActivity = '/activities';
        return (
            <AppBar className="cs142-topbar-appBar" position="absolute">
                <Toolbar style={{backgroundColor: "skyblue"}}>
                    <Grid container>
                        <Grid item sm={1}>
                    <span id="Name">
                       Anqi Zhu  @
                    </span>
                            <span id="version">
                version : {this.state.ver}
                            </span>
                        </Grid>
                        <Grid item sm={1}>
                            {
                                this.state.isLogin ?
                                    <span>Hi {this.state.adminname}</span> :
                                    <span>Please log in</span>
                            }
                        </Grid>
                        <Grid item sm={2}>
                            {
                                this.state.isLogin ? (
                                    <Link to= {path}>
                                        <Button className="upload" style={{margin: "1rem"}} variant="outlined"
                                                width = {40}
                                                color="secondary">My favorite
                                        </Button>
                                    </Link>
                                  ) :
                                    <span/>
                            }
                        </Grid>
                        <Grid item sm={2}>
                            {
                                this.state.isLogin ? (
                                    <input type="file" accept="image/*" ref={(domFileRef) => {
                                        this.uploadInput = domFileRef;
                                    }}/>
                                  ) :
                                    <span/>
                            }
                        </Grid>
                        <Grid item sm={2}>
                            {
                                this.state.isLogin ? (
                                    <Button className="upload" style={{margin: "1rem"}} variant="outlined"
                                            width = {40}
                                            color="secondary" onClick={this.handleUploadButtonClicked}>Upload
                                    </Button>
                                  ) :
                                    <span/>
                            }
                        </Grid>
                        <Grid item sm={2}>
                            {
                                this.state.isLogin ? (
                                    <Button className="logout" variant="outlined"
                                            style={{margin: "1rem"}}
                                            color="secondary" onClick={this.logout}>Logout
                                    </Button>
                                  ) :
                                    <span/>
                            }
                        </Grid>
                        <Grid item sm={2}>
                                {
                                    this.state.isLogin ? (
                                        <Link to = {pathActivity}>
                                            <Button className="logout" variant="outlined"
                                                    style={{margin: "1rem"}}
                                                    color="secondary" onClick={this.fiveActivities}>Activities
                                            </Button>
                                        </Link>
                                        ) :
                                        <span/>
                                }
                        </Grid>
                        <Grid item sm={2}>
                    <span className="description">
                        {
                            this.state.isLogin ?
                                (
                                    <span>
                                    {this.state.mode === "photo" ? "Photos of " : ""}
                                        {this.state.user}
                                    </span>
                                ) :
                                <span/>
                        }
                    </span>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
