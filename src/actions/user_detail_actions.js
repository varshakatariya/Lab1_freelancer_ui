import axios from "axios/index";
import {userInfo} from "./user_creadential_actions";


export function getUserData(){
    return dispatch => {
        return axios.get('/users/getUserData').then((response)=>{
            dispatch(userInfo(response.data));
        });
    }
}


export function userInfo(values){
    return{
        type:"USER_INFO",
        payload:values
    }
}