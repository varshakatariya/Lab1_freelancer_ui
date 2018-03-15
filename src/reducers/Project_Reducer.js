
import {combineReducers} from 'redux'

export const data = (state =  {
    listOfProjects:[]
}, action) =>{

    switch (action.type) {
        case "PROJECT_INFO":
            break;
        case "PROJECT_LIST_INFO":
            console.log("In project list info",action.payload.projectsList);
            state= {
                ...state,
                listOfProjects:action.payload.projectsList
            };
            break;
        case "EMP_PROJ_LIST":
            console.log("In emp project list info",action.payload.bList);
            state= {
                ...state,
                listOfProjects:action.payload.bList
            };
            break;
        case "FLCR_PROJ_LIST":
            console.log("In flcr project list info",action.payload.bList);
            state= {
                ...state,
                listOfProjects:action.payload.bList
            };
            break;

        default:
            return state;
    }
    return state;
}
export default combineReducers({
    data
});