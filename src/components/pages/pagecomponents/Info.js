import React, { Component } from 'react';
import axios from 'axios';

class Info extends Component{
  
    state = {
        users:[]
    };

    componentDidMount(){
        axios.post('http://vm.projectwolverine.net/API/Views/Clients')
        .then(res => this.setState({users: res.data}));
    }

    render(){
        //console.log(this.state.users);
        return (
            <div>
                {this.state.users.map(user => (
                    <h1 key={user.CID}>{user.CID}</h1>
                ))}
                
            </div>
           
        );   
    }
    
}






export default Info;