
import {combineReducers} from 'redux'




export const data = (state =  {
    email: "",
    name: ""
}, action) =>{

    switch (action.type) {
        case "USER_INFO_UP":
            console.log("In User info"+action.payload.email);
            state= {
                ...state,
                email:action.payload.email,
                name:action.payload.name
            };


        default:
            return state;
    }
    return state;
}
export default combineReducers({
    data
});