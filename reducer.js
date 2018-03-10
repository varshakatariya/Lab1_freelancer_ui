/*
const defaultState = {
    username: "",
    password: "",
    signedIn: false
}

export default function actionReducer (state = defaultState, action){
    const newState = {...state};
    switch(action.type){
        case 'loginServerCall':
            newState.lastChar = action.payload;
            newState.displayString = newState.displayString + action.payload;
            newState.buffer = newState.buffer + action.payload;
            newState.answer = parseFloat(newState.buffer);
            if(action.payload==="."){
                newState.answer = newState.buffer;
            }
            return newState;
        case 'signup':
            newState.lastChar = action.payload;
            if(state.lastChar!==action.payload){
                newState.displayString = newState.displayString.slice(0, -2);
                newState.op = action.payload;
            }
            return newState
        default:
            return newState;
    }
}*/
