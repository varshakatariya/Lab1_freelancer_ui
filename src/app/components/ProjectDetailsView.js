import React from "react";
import {render} from "react-dom";
import axios from "axios";
import PropTypes from 'prop-types';

export class ProjectDetailsView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            projectName: "",
            description: "",
            files: "",
            skills: "",
            budgetRange: 0.0,
            averageBid: 0,
            numberOfBids: 0
        }
    }
    componentWillMount(){
        axios.get('http://localhost:3000/project',{
            params: {email: this.props.email}
        })
            .then(response => {
                console.log("",response);
                console.log("Title : ",response.data.projectName);
                console.log("Description : ",response.data.description);
                console.log("files : ",response.data.files);
                console.log("skills : ",response.data.skills);
                console.log("budgetRange : ",response.data.budgetRange);
                console.log("averageBid : ",response.data.averageBid);
                console.log("nBids : ",response.data.numberOfBids);

                this.setState({
                    projectName: response.data.projectName,
                    description: response.data.description,
                    files: response.data.files,
                    skills: response.data.skills,
                    budgetRange: response.data.budgetRange,
                    averageBid: response.data.averageBid,
                    numberOfBids: response.data.numberOfBids
                });


            })
            .catch(err => {
                console.log(err, 'No Response from Node JS');
            });
    }

    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/>
                <div className="container well text-center">
                    <div className="row ">
                        Project Name : {this.state.projectName}
                    </div>
                    <div className="row">
                        Description : {this.state.description}
                    </div>
                    <div className="row">
                        Files : {this.state.files}
                    </div>
                    <div className="row">
                        Skills : {this.state.skills}
                    </div>
                    <div className="row">
                        Budget Range : {this.state.budgetRange}
                    </div>
                    <div className="row">
                        Average Bid : {this.state.averageBid}
                    </div>
                    <div className="row">
                        Number Of Bids : {this.state.numberOfBids}
                    </div>
                    {this.props.email}
                </div>
            </div>
        );
    }
}

export default ProjectDetailsView;

ProjectDetailsView.propTypes = {
    email: PropTypes.string
};