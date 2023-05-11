import React from 'react';

import './photobubble.css';

import axios from "axios";
import CardContent from "@material-ui/core/CardContent";

class Activitybubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        };

    }
    componentDidMount() {
        axios.get("/mostRecentActivity/" + this.state.id)
            .then(res => {
                console.log(" did mount res");
                console.log(res);
                this.setState({mostRecentActivity : res.data});
            });
    }
    componentDidUpdate(prevProps) {
        console.log("update this prop actnum: " + this.props.activityNum + "prev num" + prevProps.activityNum);
        if (this.props.activityNum !== prevProps.activityNum) {
            axios.get("/mostRecentActivity/" + this.state.id)
                .then(res => {
                    this.setState({mostRecentActivity : res.data});
                });
        }
    }

    getRecentActivity(){
                let activity = this.state.mostRecentActivity;
                if(activity === null || activity === undefined || activity.length === 0){
                    return (<div/>);
                }else if(activity[0].photo_id === null || activity[0].photo_id === undefined){
                    return (
                        <div>
                            {activity[0].activity} at {activity[0].date_time}
                        </div>
                    );
                }else{
                    let card = (
                        <CardContent className="cardcontent">
                            <img className="photo" src={"images/" + activity[0].file_name} width={50} height={50}/>
                            {activity[0].activity} at {activity[0].date_time}
                        </CardContent>
                    );
                    return card;
                }
    }
    render() {
        console.log("props.actnum" + this.props.activityNum);
        return (
            <div className="recent">
                {this.getRecentActivity()}
            </div>
        );
    }
}

export default Activitybubble;