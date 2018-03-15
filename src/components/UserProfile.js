import React from "react";
//import {render} from "react-dom";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as getData from '../actions/user_creadential_actions';
//import feelancer from '../feelancer-LOGO.svg';
//import {userData} from "../reducers/reducer-user";
import Dropzone from 'react-dropzone';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { redirect: false, profileImage:[] ,preview: null, docs: []};
        this.onImageDrop = this.onImageDrop.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userData){
            this.setState ({
                name : nextProps.userData.data.name,
                email : nextProps.userData.data.email,
                about : nextProps.userData.data.about,
                phone : nextProps.userData.data.phone,
                skills : nextProps.userData.data.skills,
                profileImage: nextProps.userData.data.profileImage,
                userFiles: nextProps.userData.data.userFiles
            })
        }

        console.log(nextProps);
    }

    componentWillMount(){
        this.props.getUserData().then(
            (data) => {

            },
            (err) => {
                this.setState({redirect:true})
            });
    }

    updateUserDetails(){
        this.props.updateUser(this.state);
    }

    logout(){
        this.props.logout();
    }

    isDataNotValid(){
        return true;
    }

    fileSelectedHandler(event) {
        this.setState({
                docs: event.target.files
        });
    }

    onImageDrop(file) {
        this.setState({
            profileImage: file,
            preview: file[0].preview
        });
        console.log("file path : ",file[0]);
    }



    render(){
        const {redirect}  = this.state;
        const { userData } = this.props;
        if(this.state.redirect || userData.data.logout === true)
            return (<Redirect to={{
                pathname: '/login'
            }} />)

        return(
        <div>
            <div className="display-flex justify-content-md-center mt40">
                <div className="col-md-8 form-border mt30">
                    <div onClick={this.logout.bind(this)}>LOGOUT</div>
                    <div className="row">
                        <label> Profile Image </label>
                        <br/>
                        { this.state.preview &&
                        <img src={ this.state.preview } alt="image preview" />

                        }
                        <img src="data:image/*;base64, VzI5aWFtVmpkQ0JQWW1wbFkzUmQ="/>

                        <br/>
                    </div>
                    <div className="row">
                        <Dropzone style="height: 50px"
                                  multiple={false}
                                  accept="image/*"
                                  onDrop={this.onImageDrop}>
                            <p><u>Click here</u> to upload a profile image</p>
                        </Dropzone>
                    </div>
                    <div className="row">
                    <label>Name</label>
                    <input
                        placeholder="Name"
                        className="form-control  col-md-10"
                        type="text"
                        label=""
                        value={this.state.name}
                        onChange={(event) => {
                            this.setState({
                                name: event.target.value
                            })
                        }}
                    />
                    </div>
                    <div className="row">
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            className="form-control  col-md-10"
                            type="text"
                            label=""
                            value={this.state.email}
                            onChange={(event) => {
                                this.setState({
                                    email: event.target.value
                                })
                            }}
                            disabled
                        />
                    </div>
                    <div className="row">
                        <label>Phone Number</label>
                        <input
                            placeholder="Phone Number"
                            className="form-control  col-md-10"
                            type="text"
                            label=""
                            value={this.state.phone}
                            onChange={(event) => {
                                this.setState({
                                    phone: event.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="row">
                        <label>About Me</label>
                        <input
                            placeholder="About"
                            className="form-control  col-md-10"
                            type="text"
                            label=""
                            value={this.state.about}
                            onChange={(event) => {
                                this.setState({
                                    about: event.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="row">
                        <label>Skills</label>
                        <input
                            placeholder="Skills"
                            className="form-control  col-md-10"
                            type="text"
                            value={this.state.skills}
                            onChange={(event) => {
                                this.setState({
                                    skills: event.target.value
                                })
                            }}
                        />
                    </div>
                    <br/>
                    <div className="row">
                        <label>Resume</label>
                        <input
                            type="file"
                            onChange={this.fileSelectedHandler.bind(this)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.updateUserDetails.bind(this)}>Update Details</button>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    return{
        userData : state.LoginReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(getData,dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);