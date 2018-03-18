import React from "react";
import * as checkLoggedSession from "../actions/user_creadential_actions";
import {userData} from "../reducers/User_Credential_Reducer";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import * as postData from "../actions/project_bid_actions";
import {Redirect} from 'react-router-dom';

class Dashboard_Freelancer extends React.Component{
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
        this.props.getListProjectUserHasBidOn();
    }

    render() {

        const { userData } = this.props;
        if(this.state.redirect)
            return (<Redirect to={{
                pathname: '/login'
            }} />)
        return (
            <div>
                <div id = "FreelancerView">
                    <div className="display-flex justify-content-md-center mt40">
                        <div className="col-md-11 form-border mt30">
                            <nav className="row bar nav-black">
                                <div className="col-md-2 mt10">Project Name</div>
                                <div className="col-md-3 mt10">Employer</div>
                                <div className="col-md-2 mt10">Average Bid</div>
                                <div className="col-md-2 mt10">Your Bid</div>
                                <div className="col-md-1 mt10">Status Of Project</div>
                            </nav>
                            <div className="mt20"></div>
                            {this.state.listOfProject.map((projectDetail,i) =>
                                <h5 key={i}>
                                    <div className="row row-border mt20 ml7 mr7">
                                        <div className="col-md-2 mt15 mb15">{projectDetail.ProjectName}</div>
                                        <div className="col-md-3 mt15 mb15">{projectDetail.EmpName}</div>
                                        <div className="col-md-2 mt15 mb15">{projectDetail.avg_bid}</div>
                                        <div className="col-md-2 mt15 mb15">{projectDetail.bid_price}</div>
                                        <div className="col-md-1 mt15 mb15">{projectDetail.status}</div>
                                    </div>
                                </h5>)}
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
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard_Freelancer);

