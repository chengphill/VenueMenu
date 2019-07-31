import React, { Component } from 'react';
import axios from 'axios';
import { Header, Image, Table } from 'semantic-ui-react'
class Stalls extends Component{
  
    state = {
        stalls:[]
    };



    componentDidMount(){
        axios.post('http://vm.projectwolverine.net/API/Views/Stalls')
        .then(res => this.setState({stalls: res.data}));
    }




    render(){
        //console.log(this.state.requests);
        return (
            <div>
            <Table basic='very' celled collapsing>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Stall Name</Table.HeaderCell>
                    <Table.HeaderCell>Occupied</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.stalls.map((stall, ind) => (
                    <Table.Row key={ind} stall={stall}>
                    <Table.Cell>
                    <Header as='h4' image>
                        
                        <Header.Content>
                        {stall.stallName}
                        </Header.Content>
                    </Header>
                    </Table.Cell>
                    <Table.Cell>
                        
                        {stall.Client_CID == null? <div>no</div> : <div>yes</div>}
                    </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
    
            </div>
           
        );   
    }
    
}

export default Stalls;