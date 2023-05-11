import React from 'react';
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";

class RecentActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mostRecentActivity : null};
        console.log("constructor called");
    }

    componentDidMount() {
        axios.get("/recentActivities")
            .then(res => {
                this.setState({mostRecentActivity: res.data});
            });
    }

    getActivity() {
        if (this.state.mostRecentActivity === null) {
            return;
        }
        console.log("this.state.mostRecentActivity");
        console.log(this.state.mostRecentActivity);
        let activity = this.state.mostRecentActivity;
        let list = [];
        for (let i = 0; i < this.state.mostRecentActivity.length; i++) {
            if (activity === null || activity === undefined || activity.length === 0) {
                list.push(<div/>);
            } else if (activity[i].photo_id === null || activity[i].photo_id === undefined) {
                list.push (
                    <CardContent className="cardcontent">
                        {activity[i].username.first_name + " " + activity[i].username.last_name} {activity[i].activity} at {activity[i].date_time}
                    </CardContent>
                );
            } else {
                console.log("firstname and lastname for card component" +
                    activity[i].username.first_name + " " + activity[i].username.last_name);
                let card = (
                    <CardContent className="cardcontent">
                        {activity[i].username.first_name + " " + activity[i].username.last_name} {activity[i].activity} at {activity[i].date_time}
                        <img className="photo" src={"images/" + activity[i].file_name} width={50} height={50}/>

                    </CardContent>
                );
                list.push(card);
            }
        }
        // eslint-disable-next-line consistent-return
        return list;
    }

    render() {
        return (
            <div className="recent">
                {this.getActivity()}
            </div>
        );
    }
}

export default RecentActivity;