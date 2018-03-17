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

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listOfProject: [],
            redirect : false,
            period_in_days:"",
            bid_price:"",
            project_id:""
        }
        this.showProject = this.showProject.bind(this);
    }


    componentWillReceiveProps(nextProps){
        console.log(nextProps);
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
            this.setState({
                listOfProject : nextProps.projectData.data.listOfProjects
            });
        }
    }


    componentWillMount(){
        this.props.checkSession();
        this.props.getProjectDataForHome();
    }

    bid(id){

        var str = "bid-details"+id;
        var x = document.getElementById(str);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    showProject(id){

        this.props.projectId = id;
    }

    bidNow(id){
        var bidData = {};
        console.log("Project ID -----------------",id);
        bidData.project_id = id;
        bidData.period_in_days = this.state.period_in_days;
        bidData.bid_price = this.state.bid_price;
        var str = "bid-details"+id;
        var x = document.getElementById(str);
        x.style.display = "none";
        this.props.bidProjectNow(bidData).then(
            (data) => {
                this.props.getProjectDataForHome();
            },
            (err) => {
                this.setState({redirect:true})
            });
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    render() {

        const { userData } = this.props;
        if(this.state.redirect)
            return (<Redirect to={{
                pathname: '/login'
            }} />)


        return (
            <div>
                <nav class="bar nav-black">
                    <Link to="/home" class="item-button bar-item ml75">Home</Link>
                    <Link to="/dashboard" class="item-button bar-item">Dashboard</Link>
                    <Link to="/profile" class="item-button bar-item">User Profile</Link>
                </nav>
                <div className="display-flex justify-content-md-center mt40">
                    <div className="col-md-11 form-border mt30">
                        <nav className="row bar nav-black">
                            <div className="col-md-2 mt10">Project Name</div>
                            <div className="col-md-2 mt10">Description</div>
                            <div className="col-md-2 mt10">Skills Required</div>
                            <div className="col-md-2 mt10">Employer ID</div>
                            <div className="col-md-1 mt10">Bids Count</div>
                            <div className="col-md-2 mt10">Bid Now</div>
                        </nav>
                        <div className="mt20"></div>
                        {this.state.listOfProject.map((projectDetail,i) =>
                            <h5 key={i}>
                                <div className="row row-border mt20 ml7 mr7">
                                    <Link to={'/project-details/'+projectDetail.project_id} className="col-md-2 mt15 mb15">{projectDetail.title}</Link>
                                    <div className="col-md-2 mt15 mb15">{projectDetail.description}</div>
                                    <div className="col-md-2 mt15 mb15">{projectDetail.skills}</div>
                                    <Link to={'/view-details/'+projectDetail.employer_id} className="col-md-2 mt15 mb15">{projectDetail.employer_name}</Link>
                                    <div className="col-md-1 mt15 mb15">{projectDetail.avg_bid}</div>
                                    <div className="col-md-2 mt15 mb15 ml60">
                                        <button className="btn btn-primary" onClick={() => this.bid(projectDetail.project_id)}>Bid Project</button>
                                        <div id={"bid-details"+projectDetail.project_id} className="mt10" style={{display:'none'}}>
                                            <input
                                                placeholder="Enter Period"
                                                className="form-control col-md-10 mt10"
                                                type="text"
                                                name="period_in_days"
                                                required
                                                label=""
                                                onChange={this.onChange.bind(this)}
                                            />
                                            <input
                                                placeholder="Enter Amount"
                                                className="form-control col-md-10 mt10"
                                                type="text"
                                                name="bid_price"
                                                required
                                                label=""
                                                onChange={this.onChange.bind(this)}
                                            />
                                            <button className="btn btn-primary mt10" onClick={() => this.bidNow(projectDetail.project_id)}>Bid Now</button>
                                        </div>
                                    </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Home);