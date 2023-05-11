import React from 'react';
import {
    Divider,
    List,
    ListItem,
} from '@material-ui/core';
import './userList.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import Activitybubble from "./Activitybubble";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userListModel: [],
        };
        console.log("this.props.acts" + this.props.acts);
    }

    getList() {
        const userListModel = this.state.userListModel;
        const listContent = [];

        for (let user of userListModel) {
            let text = user.first_name + " " + user.last_name;
            let path = "/users/" + user._id;
            let listItem = (
                <ListItem key = {user._id}>
                <div>
                    <div>
                        <Link to={path} key={user._id}>
                            {text}
                        </Link>
                    </div>
                    <div>
                        <Activitybubble id={user._id} activityNum={this.props.acts}/>
                    </div>
                </div>
                <Divider/>
                </ListItem>
            );
            listContent.push(
                <div className="names">
                    {listItem}
                    <Divider/>
                </div>
            );
        }
        return (<List> {listContent} </List>);
    }
    componentDidMount() {
        let promise = axios.get("/user/list");
        promise.then(res => {
            this.setState({
                userListModel: res.data
            });
        })
            .catch((error) => {
                console.log(error);
                this.setState({});
            });
    }


    render() {
        return (
            <div>
                {this.getList()}
            </div>
        );
    }
}

export default UserList;