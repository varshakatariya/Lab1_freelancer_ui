import React from "react";
import * as checkLoggedSession from "../actions/user_creadential_actions";
import {userData} from "../reducers/User_Credential_Reducer";
import {projectData} from "../reducers/Project_Reducer";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import * as postData from "../actions/project_bid_actions";
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import freelancer from '../freelancer.svg';

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
        message:"",
        errors:"",
        bidsList:[]
    }

    componentWillReceiveProps(nextProps){
        console.log("Project Details :=--------------",nextProps.projectData);
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
            console.log("BidsList: ==================="+JSON.stringify(nextProps.projectData.data.bidsList));
            this.state.bidsList = nextProps.projectData.data.bidsList;
            this.setState({
                projectDetails : nextProps.projectData.data.projectData,
                bidsList : nextProps.projectData.data.bidslist,
                message : nextProps.projectData.data.message
            });
            console.log("projectDetails :"+JSON.stringify(this.state.projectDetails));
            console.log("BidsList: is equals================="+JSON.stringify(this.state.bidsList));
        }

        var i = 0;
        console.log("Bids List",this.state.bidsList);
        while(i<this.state.bidsList.length){
            console.log("bid list each row",this.state.bidsList[i]);
            i++;
        }
    }


    componentWillMount(){
        this.props.checkSession();
        console.log("project id  -------------------"+this.props.match.params.project_id);
        this.props.getProjectDetails(this.props.match.params.project_id);
        this.props.getBids(this.props.match.params.project_id);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    hire(project){
        var hireData = {};
        hireData.project_id = this.props.projectData.data.projectData.project_id;
        hireData.user_id = project.userId;
        this.props.hireFreelancer(hireData).then(
            (data) => {
                //console.log(JSON.stringify(data.message));
                //this.setState({message : data.response.data});
            },
            (err) => {
                this.setState({errors : err.response.data.error});
                console.log(JSON.stringify(err.response));
            });
        console.log(this.props.projectData.data.projectData.isEmployer);
    };

    componentDidMount(){

    }

    logout(){
        this.props.logout();
    }


    render(){
        const {redirect}  = this.state;
        const {errors}  = this.state;
        const {message}  = this.state;
        const { userData } = this.props;
        const {projectData} = this.props;
        console.log("name:  " +JSON.stringify(projectData));
        if(this.state.redirect || userData.data.logout === true)
            return (<Redirect to={{
                pathname: '/login'
            }} />)



        return(
            <div>
                <div className="App-header">
                    <img src={freelancer} className="App-logo" alt="logo" />
                    <button className="btn btn-primary logout-btn" onClick={this.logout.bind(this)}>Logout</button>
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
                        {errors && <div className="help-block">{errors}</div>}
                        {this.state.message && <div className="success-block">{this.state.message}</div>}
                        <div className="mt30">
                            <nav className="row bar nav-black">
                                <div className="col-md-3 mt10 mb10">Freelancer Name</div>
                                <div className="col-md-3 mt10 mb10">Bid Price</div>
                                <div className="col-md-3 mt10 mb10">Period in Days</div>
                                { projectData.data.projectData.isEmployer ?  <div className="col-md-3 mt10 mb10" id="hireLabel">Hire</div>  : '' }
                            </nav>
                            <div className="mt20"></div></div>
                        <div>
                            {this.state.bidsList.map((projectDetail,i) =>
                                <h5 key={i}>
                                    <div className="row row-border mt20 ml7 mr7">
                                        <Link to={'/project-details/'+projectDetail.userId} className="col-md-3 mt15 mb15">{projectDetail.name}</Link>
                                        <div className="col-md-3 mt15 mb15">{projectDetail.bid_price}</div>
                                        <div className="col-md-3 mt15 mb15">{projectDetail.period_in_days}</div>
                                        { projectData.data.projectData.isEmployer ?  <div className="col-md-3 mt15 mb15"><button className="btn btn-primary hireBtn" onClick={() => this.hire(projectDetail)}>Hire</button></div> : '' }
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
