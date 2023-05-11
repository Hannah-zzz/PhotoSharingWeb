import React from 'react';
import './CommentCard.css';
import axios from "axios";
import {Button} from "@mui/material";
/**
 * Define CommentCard, a React componment of CS142 project #5
 */
class CommentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment:"",
            photoId: this.props.photo._id
        };
        this.setComment = this.setComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setComment(event){
        this.setState({comment: event.target.value});
    }
    handleSubmit(){
        let newComment = {
            comment: this.state.comment,
        };
        this.props.actsAdd();
        this.setState({comment:""});
        console.log("state-comment" + this.state.comment);
        axios.post('/commentsOfPhoto/' + this.state.photoId, newComment)
            .then(
                this.props.handleConfirm()
            ).catch((err) =>{
            if(err){
                console.log(err);
            }
        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.setComment}/>
                <Button type="button" onClick={this.handleSubmit} style={{margin: "1rem"}}
                        color="secondary" variant="outlined">Comment
                </Button>
            </div>
        );
    }
}

export default CommentCard;