import React, { Component } from 'react';

import Request from './pagecomponents/Requests';
import Stall from './pagecomponents/Stalls';

class ShowCom extends Component{

    constructor (props) {
        super();
        this.state = {
                showStall: '0',
                showRequest: '0'
        };
        //this.clickHandler = this.clickHandler.bind(this);
    }
  
    render(){
        return (
            <React.Fragment>
            
            
            </React.Fragment>
            
        );
    }
    
}



export default ShowCom;