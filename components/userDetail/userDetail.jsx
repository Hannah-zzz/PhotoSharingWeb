import React from 'react';
import {Link} from 'react-router-dom';

import {Divider, Typography} from '@material-ui/core';
import './userDetail.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {Grid} from "@mui/material";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.userId,
            userModel: null,
            mostrecent: undefined,
            mostcomment: undefined
        };
        this.getMostCommentPhoto = this.getMostCommentPhoto.bind(this);
        this.getRecentPhoto = this.getRecentPhoto.bind(this);
    }

    componentDidMount() {
        let currentuserid = this.props.match.params.userId;
        axios.get("/user/" + currentuserid)
            .then(res => {
                this.setState({
                    id: this.props.match.params.userId,
                    userModel: res.data,
                });
                this.props.update("user", res.data.first_name + " " + res.data.last_name);
            });
        axios.get("/photosOfUser/most-recent/" + currentuserid)
            .then(res => {
                this.setState({
                    mostrecent: res.data,
                });
                console.log(this.state.mostrecent + "mostrecent mount");
            });
        axios.get("/photosOfUser/most-comment/" + currentuserid)
            .then(res => {
                this.setState({
                    mostcomment: res.data
                });
                console.log("mostcomment mount" + this.state.mostcomment);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            let currentuserid = this.props.match.params.userId;
            axios.get("/user/" + currentuserid)
                .then(res => {
                    this.setState({
                        id: this.props.match.params.userId,
                        userModel: res.data,
                    });
                    this.props.update("user", res.data.first_name + " " + res.data.last_name);
                });
            axios.get("/photosOfUser/most-recent/" + this.props.match.params.userId)
                .then(res => {
                    this.setState({
                        mostrecent: res.data,
                    });
                });
            axios.get("/photosOfUser/most-comment/" + this.props.match.params.userId)
                .then(res => {
                    this.setState({
                        mostcomment: res.data
                    });
                });
        }

    }

    getRecentPhoto() {
        let photo = this.state.mostrecent;
        if (!photo) {
            return <div/>;
        }

        return (
            <Card key={photo._id}>
                <CardContent className="cardcontent">
                        <div className="mostRecentPhoto">
                            Most recently uploaded photo
                        </div>
                        <Link to={"/photos/" + this.state.id}>
                            <img className="photo" src={"images/" + photo.file_name} width={50} height={50}/>
                        </Link>
                    <div>
                        uploaded at
                    </div>
                    <div>
                        {photo.date_time}
                    </div>
                        <Divider/>
                </CardContent>
            </Card>
        );

    }

    getMostCommentPhoto() {
        let photo = this.state.mostcomment;
        if (!photo) {
            return <div/>;
        }
        return (
            <Card key={photo._id}>
                <CardContent className="cardcontent">
                    <div className="mostRecentPhoto">
                        Photo has the most comments
                    </div>
                    <Link to={"/photos/" + this.state.id}>
                        <img className="photo" src={"images/" + photo.file_name} width={50} height={50}/>
                    </Link>
                    <div>
                        Number of comments:
                        {photo.comments.length}
                    </div>
                    <Divider/>
                </CardContent>
            </Card>
        );
    }

    render() {
        if (this.state.userModel === null) {
            return "";
        }
        return (
            <div>
                {
                    <Card className="cards" style={{backgroundColor: "cornsilk"}}>
                        <CardContent>
                            <div className="all">
                                <Typography variant="h4" component="h2">
                                    <div className="card">
                                        <b>{this.state.userModel.first_name + " " + this.state.userModel.last_name}</b>
                                    </div>
                                </Typography>
                                <br/>
                                <br/>
                                <div className="info">
                                    <b>Location</b>:{this.state.userModel.location} <br/>
                                    <br/>
                                    <b>Occupation</b>:{this.state.userModel.occupation} <br/>
                                    <br/>
                                    <b>Description</b>:{this.state.userModel.description} <br/>
                                    <br/>
                                </div>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item sm={3}>
                                        {this.getRecentPhoto()}
                                    </Grid>
                                    <Grid item sm={3}>
                                        {this.getMostCommentPhoto()}
                                    </Grid>
                                </Grid>
                                <br/>
                                <br/>
                                <Button style={{backgroundColor: "whitesmoke"}}>
                                    <Link to={"/photos/" + this.state.id}> View Photos </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                }
            </div>
        );
    }
}

export default UserDetail;