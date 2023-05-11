import React from 'react';
import './CommentCard.css';
import axios from "axios";
import Button from "@material-ui/core/Button";

/**
 * Define CommentCard, a React componment of CS142 project #5
 */
class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoId: this.props.photo._id,
            favorite: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        axios.get('/hasFavorite/' + this.state.photoId)
            .then(res => {
                this.setState({
                    favorite: res.data.hasFavorite,
                    text: res.data.hasFavorite? "Unfavorite":"Favorite"
                });
            });
    }
    handleSubmit(event) {
        let hasFav = this.state.favorite;
        event.currentTarget.disabled = true;
        if (!hasFav) {
            this.setState({text: "Unfavorite"});
            axios.post("/photos/favorite", {photo_id: this.state.photoId}).then(
            )
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        } else {
            this.setState({text: "Favorite"});
            axios.post("/photos/unfavorite", {photo_id: this.state.photoId})
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
        this.setState({favorite: !this.state.favorite});
    }

    render() {
        return (
            <Button type="button" onClick={this.handleSubmit}
                    style={{margin: "1rem"}} variant="outlined"
                    color = "secondary">
                {this.state.text}
            </Button>
        );
    }
}

export default Favorite;