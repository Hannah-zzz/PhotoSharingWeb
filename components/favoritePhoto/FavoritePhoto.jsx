import React from 'react';
import './FavoritePhoto.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import Modal from 'react-modal';
import {Typography} from "@mui/material";
import Button from "@material-ui/core/Button";
import {withStyles} from "@mui/styles";
import RemoveFavorite from "../removeFavorite/RemoveFavorite";
const styles = {
    card: {
        maxWidth: '100%',
        margin: 10,
    },
    media: {
        height: 500,
    },
    textField: {
        display: 'block',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
    },
    button: {
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
    },
    linkText: {
        marginLeft: 10,
        minWidth: '100px',
        marginDown: 0,
    },
};
const modalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '50%',
        width: "50%",
        transform             : 'translate(-50%, -50%)'
    }
};
class FavoritePhoto extends React.Component {
    constructor(props) {
        console.log("called favoritephoto");
        super(props);
        this.state = {
            modalIsOpen: false,
            favorite: null,
            favoriteModel: null
        };
        this.closeModal = this.closeModal.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    openModal = (favorite) => () => {
        this.setState({modalIsOpen: true, favorite: favorite});
    };
    handleClose() {
        this.setState({  });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    componentDidMount() {
        axios.get("/favorites")
            .then(res => {
                this.setState({
                    favoriteModel: res.data,
                });
            });
    }
    handleConfirm = () => {
        axios.get("/favorites" )
            .then(res => {
                this.setState({
                    favoriteModel: res.data,
                });
            });
    };
    getFavoritePhotos() {
        if (this.state.favoriteModel === null) {
            return;
        }
        let cards = [];
        cards.push(this.modalWindow());
        for (let i = 0; i < this.state.favoriteModel.length; i++) {
            let photo = this.state.favoriteModel[i];
            let card = (
                <Card key={photo._id}>
                    <CardContent className="cardcontent" width={60} height={60}>
                            <img className="photo" src={"images/" + photo.file_name} width={50} height={50} alt={""} onClick={this.openModal(photo)}/>
                        <RemoveFavorite photo = {photo} handleConfirm = {this.handleConfirm}/>
                    </CardContent>
                </Card>
            );
            cards.push(card);
        }
        // eslint-disable-next-line consistent-return
        return cards;
    }
    modalWindow() {
        const favorite = this.state.favorite;
        if (favorite === null) {
            return (<div/>);
        }
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={modalStyles}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    >
                    {favorite.file_name}
                </Typography>

                <Typography
                    variant="subtitle2"
                    component="h2"
                    style={{margin: "1rem"}}>
                    {"Posted at " + favorite.date_time}
                </Typography>
                <img
                    alt={favorite.file_name}
                    style={{width: "100%", display: "block"}}
                    src={"../../images/" + favorite.file_name}
                />

                <Button onClick={this.closeModal}
                        variant="outlined"
                        style={{margin: "1rem"}}
                        color="secondary">
                    Close
                </Button>
            </Modal>
        );
    }

    render() {
        return (
            <Card className="outline" style={{backgroundColor: "cornsilk"}}>
                <h1 className="Title">Favorite Photos</h1>
                <ul>
                    {
                        this.getFavoritePhotos()
                    }
                </ul>
            </Card>
        );
    }
}

export default withStyles(styles)(FavoritePhoto);