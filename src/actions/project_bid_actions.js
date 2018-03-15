import axios from "axios/index";


export function postProject(projectData){
    return dispatch => {
        return axios.post('/project/postProject',projectData).then((response)=>{
            dispatch(projectInfo(response.data));
        });
    }
}

export function getProjectDataForHome(){
    return dispatch => {
        return axios.get('/project/userAsFreelancerProjects').then((response)=>{
            console.log("home data"+ JSON.stringify(response.data));
            dispatch(projectListInfo(response.data));
        });
    }
}

export function bidProjectNow(){
    return dispatch => {
        return axios.get('/project/bidProjectNow').then((response)=>{
            console.log("Bid Now data"+ JSON.stringify(response.data));
            dispatch(projectListInfo(response.data));
        });
    }
}

export function getListProjectUserHasBidOn(){
    return dispatch => {
        return axios.get('/bid/listOfAllProjectUserHasBidOn').then((response)=>{
            console.log("Bid data"+ JSON.stringify(response.data));
            dispatch(flcrProjectListInfo(response.data));
        });
    }
}

export function getListOfProjectPostedByEmployer(){
    return dispatch => {
        return axios.get('/project/listOfAllProjectsPostedByEmployer').then((response)=>{
            console.log("Project data"+ JSON.stringify(response.data));
            dispatch(empProjectListInfo(response.data));
        });
    }
}

export function projectInfo(values){
    return{
        type:"PROJECT_INFO",
        payload:values
    }
}

export function projectListInfo(values){

    console.log("Inside projectListInfo",values);
    return{
        type:"PROJECT_LIST_INFO",
        payload:values
    }
}

export function empProjectListInfo(values){

    console.log("Inside emp project list",values);
    return{
        type:"EMP_PROJ_LIST",
        payload:values
    }
}

export function flcrProjectListInfo(values){

    console.log("Inside freelancer project list",values);
    return{
        type:"FLCR_PROJ_LIST",
        payload:values
    }
}