import React from "react";
import * as checkLoggedSession from "../actions/user_creadential_actions";
import {userData} from "../reducers/User_Credential_Reducer";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import * as postData from "../actions/project_bid_actions";
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import freelancer from '../freelancer.svg';

class ViewDetails extends React.Component{

    state={
        redirect:false,
        userDetails:{
            name : "",
            email : "",
            about : "",
            phone : "",
            skills : ""
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.userData){
            if(nextProps.userData.data.sessionActive == true){
                this.setState ({
                    redirect : false,
                    name : nextProps.userData.data.name,
                    email : nextProps.userData.data.email,
                    about : nextProps.userData.data.about,
                    phone : nextProps.userData.data.phone,
                    skills : nextProps.userData.data.skills
                })
            }else {
                this.setState({
                    redirect: true
                })
            }
        }
    }


    componentWillMount(){
        this.props.checkSession();
        this.props.getOtherUserData(this.props.match.params.user_id);
    }

    logout(){
        this.props.logout();
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
                    <div className="col-md-8  justify-content-md-center border-blue form-border mt30">
                        <h3 className="mb30 mt50">User Details</h3>
                        <hr/>
                        <div className="col-md-offset-5 mt50">
                            <label className="font-bold">Name : </label>
                            <label>{this.state.name}</label>
                        </div>
                        <div className="col-md-offset-5 mt20">
                            <label className="font-bold">Email : </label>
                            <label>{this.state.email}</label>
                        </div>
                        <div className="col-md-offset-5 mt20">
                            <label className="font-bold">Skills Required : </label>
                            <label>{this.state.skills}</label>
                        </div>
                        <div className="col-md-offset-5 mt20">
                            <label className="font-bold">About : </label>
                            <label>{this.state.about}</label>
                        </div>
                        <div className="col-md-offset-5 mt20 mb30">
                            <label className="font-bold">Phone : </label>
                            <label>{this.state.phone}</label>
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
export default connect(mapStateToProps,mapDispatchToProps)(ViewDetails);

ViewDetails.propTypes = {
    user_id: PropTypes.string
};
