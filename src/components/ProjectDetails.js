import React from "react";
import {render} from "react-dom";
import * as checkLoggedSession from "../actions/user_creadential_actions";
import {userData} from "../reducers/User_Credential_Reducer";
import {projectData} from "../reducers/Project_Reducer";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import * as postData from "../actions/project_bid_actions";
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import feelancer from '../feelancer-LOGO.svg';

class ProjectDetails extends React.Component{

    state={
        redirect:false,
        projectDetails:{
            projectName:"",
            description:"",
            skills:"",
            budget:"",
            bids:""
        },
        bidsList:[]
    }

    componentWillReceiveProps(nextProps){
        console.log("Project Details :=--------------",nextProps);
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
            console.log("Testing"+JSON.stringify(nextProps.projectData));
            this.setState({
                projectDetails : nextProps.projectData.data.projectData,
                bidsList : nextProps.projectData.data.bidslist
            });

            console.log("BidsList:"+JSON.stringify(this.state.bidsList));
        }
    }


    componentWillMount(){
        this.props.checkSession();
        console.log(this.props.match.params.project_id);
        this.props.getProjectDetails(this.props.match.params.project_id);
        this.props.getBids(this.props.match.params.project_id);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render(){
        const {redirect}  = this.state;
        const { userData } = this.props;
        console.log("name:  " +JSON.stringify(this.state.bidsList));
        if(this.state.redirect || userData.data.logout === true)
            return (<Redirect to={{
                pathname: '/login'
            }} />)

        return(
            <div>
                <div className="App-header">
                    <img src={feelancer} className="App-logo" alt="logo" />
                </div>
                <nav class="bar nav-black">
                    <Link to="/home" class="item-button bar-item ml75">Home</Link>
                    <Link to="/dashboard" class="item-button bar-item">Dashboard</Link>
                    <Link to="/profile" class="item-button bar-item">User Profile</Link>
                    <button className="btn-warning btn post-project-btn" onClick={() => this.nextPath('/post-project')}>Post Project</button>
                </nav>
                <div className="display-flex justify-content-md-center mt40">
                    <div className="col-md-8  justify-content-md-center form-border mt30">
                        <h3 className="mb30 mt50">Project Details</h3>
                        <div className="col-md-offset-5 mt50">
                            <label className="font-bold">Project Name : </label>
                            <label>{this.state.projectDetails.projectName}</label>
                        </div>
                        <div className="col-md-offset-5 mt20">
                            <label className="font-bold">Description : </label>
                            <label>{this.state.projectDetails.description}</label>
                        </div>
                        <div className="col-md-offset-5 mt20">
                            <label className="font-bold">Skills Required : </label>
                            <label>{this.state.projectDetails.skills}</label>
                        </div>
                        <div className="col-md-offset-5 mt20">
                            <label className="font-bold">Budget Range : </label>
                            <label>{this.state.projectDetails.budget}</label>
                        </div>
                        <div className="col-md-offset-5 mt20">
                            <label className="font-bold">Average Bid : </label>
                            <label>{this.state.projectDetails.numberOfBids}</label>
                        </div>
                        <hr/>
                        <br/>
                        <h3 className="mb30">List of all bids</h3>
                        <div className="mt30">
                            <nav className="row bar nav-black">
                                <div className="col-md-4 mt10 mb10">Freelancer Name</div>
                                <div className="col-md-4 mt10 mb10">Bid Price</div>
                                <div className="col-md-4 mt10 mb10">Period in Days</div>
                            </nav>
                            <div className="mt20"></div></div>
                        <div>
                            {this.state.bidsList.map((projectDetail,i) =>
                                <h5 key={i}>
                                    <div className="row row-border mt20 ml7 mr7">
                                        <Link to={'/project-details/'+projectDetail.userId} className="col-md-4 mt15 mb15">{projectDetail.name}</Link>
                                        <div className="col-md-4 mt15 mb15">{projectDetail.bid_price}</div>
                                        <div className="col-md-4 mt15 mb15">{projectDetail.period_in_days}</div>
                                    </div>
                                </h5>
                            )}
                        </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(ProjectDetails);

ProjectDetails.propTypes = {
    project_id: PropTypes.string
};
