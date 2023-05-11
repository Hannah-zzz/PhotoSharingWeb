import React from 'react';
import {Link} from 'react-router-dom';
import {
    Typography,
    Divider
} from '@material-ui/core';
import './userPhotos.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import {Grid} from "@mui/material";
import CommentCard from "./CommentCard";
import Favorite from "./Favorite";
import Like from "./Like";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoModel: null,
        };
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    getComments(j) {
        let commentModels = this.state.photoModel[j].comments;
        let comments = [];
        if (commentModels === undefined) {
            return comments;
        }
        for (let i = 0; i < commentModels.length; i++) {
            let linkpath = "/users/" + commentModels[i].user._id;
            comments.push(
                <div key={commentModels[i]._id}>
                    <Typography>
                        <Link to={linkpath} className="userlink">
                            {commentModels[i].user.first_name + " " + commentModels[i].user.last_name}
                        </Link>
                        <span className="time">
                        .  posted at {commentModels[i].date_time} <br/>
                        </span>
                        <div className="singlecomment">
                            {commentModels[i].comment} <br/>
                        </div>
                    </Typography>
                    <Divider/>
                </div>
            );
        }
        return comments;
    }

    getCommentls() {
        if (this.state.photoModel === null) {
            return;
        }
        let cards = [];
        console.log("getcommentls called");
        let photos = this.state.photoModel;
        // photos.sort(function (a, b) {
        //     return b.comments.length - a.comments.length;
        // });
        photos.sort(function (a, b) {
            if(b.likes.length === a.likes.length){
                return b.date_time - a.date_time;
            }
            return b.likes.length - a.likes.length;
        });
        for (let i = 0; i < photos.length; i++) {
            let photo = photos[i];
            let card = (
                <Card key={photo.id}>
                    <CardContent className="cardcontent">
                        <img className="photo" src={"images/" + photo.file_name}/>
                        <div className="commenttitle">
                            Comment
                        </div>
                        <Divider/>
                        <Typography variant="h5" className="coms">
                            {this.getComments(i)}
                        </Typography>
                            <CommentCard photo={photo} handleConfirm={this.handleConfirm}
                                         actsAdd={this.props.actsAdd}/>
                        <Grid container direction="row" alignItems="center">

                            <Grid item sm={3}>
                                <Favorite photo={photo}/>
                            </Grid>
                            <Grid item sm={3}>
                                <Like photo={photo}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            );
            cards.push(card);
        }
        // eslint-disable-next-line consistent-return
        return cards;
    }

    handleConfirm = () => {
        axios.get("/photosOfUser/" + this.props.match.params.userId)
            .then(res => {
                this.setState({
                    photoModel: res.data
                });
            });
    };

    componentDidMount() {
        let currentuserid = this.props.match.params.userId;
        axios.get("/photosOfUser/" + currentuserid)
            .then(res => {
                // res.data.sortByCount("$comments");
                this.setState({
                    photoModel: res.data
                });

            });
        axios.get("/user/" + currentuserid)
            .then(res => {
                    this.props.update("photo", res.data.first_name + " " + res.data.last_name);
                }
            );
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            let currentuserid = this.props.match.params.userId;
            axios.get("/photosOfUser/" + currentuserid)
                .then(res => {
                    this.setState({
                        photoModel: res.data
                    });
                    this.props.update("photo", res.data.first_name + " " + res.data.last_name);
                });
            axios.get("/user/" + currentuserid)
                .then(res => {
                        this.props.update("photo", res.data.first_name + " " + res.data.last_name);
                    }
                );

        }
    }

    render() {
        return (
            <Card className="outline" style={{backgroundColor: "cornsilk"}}>
                <h1 className="Title">Photos!</h1>
                <ul>
                    {
                        this.getCommentls()
                    }
                </ul>
            </Card>
        );
    }
}

export default UserPhotos;