import React from "react";
import {render} from "react-dom";
/*import {bindActionCreators} from 'redux'*/
import {connect} from 'react-redux'
import feelancer from '../feelancer-LOGO.svg';

export default class Header extends React.Component{
    render(){
        return(
            <header className="App-header">
                <img src={feelancer} className="App-logo" alt="logo" />
                <h1 className="App-title">
                    <div className=""> <a>Login</a>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <a>Signup</a>
                </h1>
            </header>
        );
    }
}