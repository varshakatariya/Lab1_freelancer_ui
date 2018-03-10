import React from "react";
import {render} from "react-dom";

export class Login extends React.Component{
    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/>
                <div className="container well text-center">
                   Username :
                    Password :
                </div>
            </div>
        );
    }
}

export default Login;