import React from "react";
import {render} from "react-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import * as checkLoggedSession from "../actions/user_creadential_actions";
import {userData} from "../reducers/User_Credential_Reducer";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import * as postData from "../actions/project_bid_actions";
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

class Dashboard_Employer extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            listOfProject: [],
            redirect: false
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        console.log("inside dashboard",nextProps);
        if(nextProps.userData){
            if(nextProps.userData.data.sessionActive == true){
                this.setState ({
                    redirect : false
                })
            }else {
                this.setState({
                    redirect: true
                })
            }
        }
        if(nextProps.projectData){
            console.log("inside dashboard ------------ "+JSON.stringify(nextProps.projectData.data));
            this.setState({
                listOfProject : nextProps.projectData.data.listOfProjects
            });

        }
    }

    componentWillMount(){
        this.props.checkSession();
        this.props.getListOfProjectPostedByEmployer();
    }

    render() {
console.log("Employer Project-----------",this.state.listOfProject);
        const { userData } = this.props;
        if(this.state.redirect)
            return (<Redirect to={{
                pathname: '/login'
            }} />)

        return (
            <div id = "EmployerView">
                    <div className="display-flex justify-content-md-center mt40">
                        <div className="col-md-11 form-border mt30">
                            <nav className="row bar nav-black">
                                <div className="col-md-2 mt10">Project Name</div>
                                <div className="col-md-3 mt10">Average Bid</div>
                                <div className="col-md-2 mt10">Name</div>
                                <div className="col-md-2 mt10">Project Completion Date</div>
                                <div className="col-md-1 mt10">Status Of Project</div>
                            </nav>
                            <div className="mt20"></div>
                            {this.state.listOfProject.map((projectDetail,i) =>
                                <h5 key={i}>
                                    <div className="row row-border mt20 ml7 mr7">
                                        <div className="col-md-2 mt15 mb15">{projectDetail.ProjectName}</div>
                                        <div className="col-md-2 mt15 mb15">{projectDetail.avg_bid}</div>
                                        <div className="col-md-2 mt15 mb15">{projectDetail.username}</div>
                                        <div className="col-md-2 mt15 mb15">{projectDetail.project_completion_date}</div>
                                        <div className="col-md-1 mt15 mb15">{projectDetail.status}</div>
                                    </div>
                                </h5>)}
                        </div>
                    </div>
                </div>
        );
    }
}


function mapStateToProps(state){
    return{
        projectData : state.ProjectReducer,
        userData : state.LoginReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, postData,checkLoggedSession),dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard_Employer);

