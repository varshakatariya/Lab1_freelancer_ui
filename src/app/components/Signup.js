import React from "react";
import {render} from "react-dom";

export class SignUp extends React.Component{
    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/>
                <div className="container well text-center">
                    Name :
                    Email :
                    Phone Number :
                    About Me :
                    Skills :
                    Profile Image :
                </div>
            </div>
        );
    }
}

export default SignUp;