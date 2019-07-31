import React, { Component } from 'react';
import PageNav from './pagecomponents/PageNav';
import Profile from './pagecomponents/TableProfile';
import Info from './pagecomponents/Info';
import T1 from './pagecomponents/Table1';
// import Request from './pagecomponents/Requests';
// import Stall from './pagecomponents/Stalls';

class Login extends Component{

    constructor (props) {
        super();
        this.state = {
        
        };
        //this.clickHandler = this.clickHandler.bind(this);
    }
  
    render(){
        return (
            <React.Fragment>
                <h1>Welcome</h1>
                <PageNav/>
            
                <div style = {aaa}>
                {/* <Profile/>
                <Info/>
                <T1/>
                <br/>
                <Request/>
                <br/>
                <Stall/> */}
                </div>
            </React.Fragment>
            
        );
    }
    
}

const aaa = {
    margin: '1%'
}


export default Login;