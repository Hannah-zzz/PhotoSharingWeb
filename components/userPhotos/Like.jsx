import React from 'react';
import './CommentCard.css';
import axios from "axios";
import Button from "@material-ui/core/Button";

/**
 * Define CommentCard, a React componment of CS142 project #5
 */
class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoId: this.props.photo._id,
            like: null,
            number: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        axios.get('/hasLike/' + this.props.photo._id)
            .then(res => {
                console.log("/haslike/ mount" + res.data.hasLike);
                this.setState({
                    like: res.data.hasLike,
                    text: res.data.hasLike? "Unlike":"Like"
                });
            });
        axios.get('/likenumber/' + this.props.photo._id)
            .then(res => {
                console.log("likenumber mount" + res.data.num);
                this.setState({
                    number: res.data.num
                });
            });
    }
    handleSubmit() {
        let hasLike = this.state.like;
        if (!hasLike) {
            this.setState({text: "Unlike", number : this.state.number + 1});
            axios.post("/like", {photo_id: this.state.photoId}).then(() => {
                }
            ).catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            axios.post("/photos/like", {photo_id: this.state.photoId}).then( ()=>{
            }
            ).catch((err) =>{
                if(err){
                    console.log(err);
                }});
        } else {
            this.setState({text: "Like", number : this.state.number - 1});
            axios.post("/unlike", {photo_id: this.state.photoId}).then(() => {
                // this.props.handleConfirm();
                }
            ).catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            axios.post("/photos/unlike", {photo_id: this.state.photoId})
                .then(() => {
                   // this.props.handleConfirm();
                    }
                ).catch((err) =>{
                if(err){
                    console.log(err);
                }});
        }
    }

componentDidUpdate(prevState) {
        if(this.state.number !== prevState.number) {
            axios.get('/likenumber/' + this.state.photoId)
                .then(res => {
                    this.setState({
                        number: res.data.num
                    });
                });
        }
}

    render() {
        return (
            <div>
                <Button type="button" onClick={this.handleSubmit}
                        style={{margin: "1rem"}} variant="outlined"
                        color="secondary"> {this.state.text}
                </Button>
        <span>{this.state.number}</span>
            </div>
        );
    }
}

export default Like;