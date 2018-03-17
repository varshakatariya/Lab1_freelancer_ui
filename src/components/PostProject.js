import React from "react";
import {render} from "react-dom";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import feelancer from '../feelancer-LOGO.svg';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import * as postData from "../actions/project_bid_actions";
import * as checkLoggedSession from "../actions/user_creadential_actions";
import {projectData} from "../reducers/Project_Reducer";
import {userData} from "../reducers/User_Credential_Reducer";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class PostProject extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            projectName: "",
            description: "",
            skills: "",
            budget:"Basic",
            endDate:moment(),
            optionsdata: [
                {key:'Basic',value: 'Basic ($2 - $8 USD)'},
                {key:'Moderate',value: 'Moderate ($8 - $15 USD)'},
                {key:'Standard',value: 'Standard ($15 - $25 USD)'},
                {key:'Skilled',value: 'Skilled ($25 - $50 USD)'},
                {key:'Expert',value: 'Expert ($50 + USD)'}
            ],
            projectFiles:null
        }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    componentWillMount(){
        this.props.checkSession()
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
    }

    handleDateChange(date) {
        //var dateChange = moment(date).format('YYYY-MM-DD HH:MM:SS');
        //console.log(dateChange);
        this.setState({
            endDate: date
        });
    }

    postProject(e){
        this.props.postProject(this.state);
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
           budget : e.target.value
        });
        var value = this.state.optionsdata.filter(function(item) {
            return item.key == e.target.value
        })

    }

    fileSelectedHandler(e) {
        this.state.projectFiles = e.target.files[0];
        this.setState({
            projectFiles: this.state.projectFiles
        })
        console.log("selected file : ",this.state.projectFiles);
    }
    render(){

        const { userData } = this.props;
        if(this.state.redirect)
            return (<Redirect to={{
                pathname: '/login'
            }} />)

        return(
            <div>
                <div className="display-flex justify-content-md-center mt40">
                    <div className="col-md-8 mt30 align-left">
                        <div className="mb30">
                            <h4>Tell us what you need done</h4>
                            <label>Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</label>
                        </div>
                        <div className="mb30">
                            <h4>Choose a name for your project</h4>
                            <input
                                placeholder="e.g Build me a website"
                                className="form-control  col-md-10"
                                type="text"
                                label=""
                                onChange={(event) => {
                                    this.setState({
                                        projectName : event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="mb30">
                            <h4>Tell us more about your project</h4>
                            <label>Great project descriptions include a little bit about yourself, details of what you are trying to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</label>
                            <textarea
                                className="col-md-10"
                                name="body"
                                placeholder="Describe your project here..."
                                onChange={(event) => {
                                    this.setState({
                                        description : event.target.value
                                    });
                                }}
                                value={this.state.description}
                            />
                        </div>
                        <div className="mb30">
                            <h4>What skills are required?</h4>
                            <label>Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in.</label>
                            <input
                                placeholder="What skills are required?"
                                className="form-control  col-md-10"
                                type="text"
                                label=""
                                value={this.state.skills}
                                onChange={(event) => {
                                    this.setState({
                                        skills : event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="mb30" onChange={this.handleChange}>
                            <h4>What is your estimated budget?</h4>
                            <select className="select-style" onChange={this.handleChange}>
                                {this.state.optionsdata.map(function(data, key){  return (
                                    <option key={key} value={data.key}>{data.value}</option> )
                                })}
                            </select>
                        </div>
                        <div className="mb30">
                            <h4>When do you want the project completed?</h4>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleDateChange.bind(this)}
                            />
                        </div>
                        <br/>
                        <div className="mb30">
                            <h4>Project Files</h4>
                            <input
                                type="file"
                                onChange={this.fileSelectedHandler.bind(this)}
                            />
                        </div>
                        <button className="btn btn-warning mb30" onClick={this.postProject.bind(this)}>Post My Project</button>
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
export default connect(mapStateToProps,mapDispatchToProps)(PostProject);