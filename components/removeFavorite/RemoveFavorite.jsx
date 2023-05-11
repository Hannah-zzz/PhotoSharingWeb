import React from 'react';
import axios from "axios";

/**
 * Define CommentCard, a React componment of CS142 project #5
 */
class RemoveFavorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoId: this.props.photo._id,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        axios.post("/photos/unfavorite", {photo_id: this.state.photoId}).then(
            this.props.handleConfirm()
        )
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.handleSubmit}> Remove  </button>
            </div>
        );
    }
}

export default RemoveFavorite;