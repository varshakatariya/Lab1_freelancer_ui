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
import Dashboard_Employer from './Dashboard_Employer';
import Dashboard_Freelancer from './Dashboard_Freelancer';


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            listOfProject: [],
            redirect: false
        }

        this.onHandleChangeFreelancer = this.onHandleChangeFreelancer.bind(this);
        this.onHandleChangeEmployer = this.onHandleChangeEmployer.bind(this);
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
        this.props.getListProjectUserHasBidOn();

        var x = document.getElementById("employerView");
        if(x != null) {
            x.style.display = "block";
        }
    }

    onHandleChangeFreelancer(){
        var x = document.getElementById("freelancerView");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    onHandleChangeEmployer(){
        var x = document.getElementById("employerView");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
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

                <br/>
                <label>
                    <input type="Radio" name="view" defaultChecked={true} onClick={this.onHandleChangeFreelancer.bind()}></input> Freelancer
                </label>

                <label>
                    <input type="Radio" name="view" onClick={this.onHandleChangeFreelancer.bind()}></input> Employer
                </label>

                <div id="freelancerView">
                    <Dashboard_Employer/>
                </div>
                <div id="employerView">
                    <Dashboard_Freelancer/>
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
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

