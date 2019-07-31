import React,{ Component } from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import axios from 'axios';


class Table1 extends Component{
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
                <Table celled compact definition>
                    <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>CID</Table.HeaderCell>
                        <Table.HeaderCell>stallName</Table.HeaderCell>
                        <Table.HeaderCell>email</Table.HeaderCell>
                        <Table.HeaderCell>accountDue</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>


                    {this.state.users.map(user => (
                                           <Table.Row key={user.CID}>
                                           <Table.Cell collapsing>
                                           <Checkbox slider />
                                       </Table.Cell>
                        <Table.Cell> <h1 >{user.CID}</h1></Table.Cell>
                        <Table.Cell><h1 >{user.stallName}</h1></Table.Cell>
                        <Table.Cell><h1 >{user.email}</h1></Table.Cell>
                        <Table.Cell><h1 >{user.accoundDue}</h1></Table.Cell>
                        <Table.Cell>No</Table.Cell>
                        </Table.Row>
                    ))}
                     
                    </Table.Body>

                    <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                        <Button floated='right' icon labelPosition='left' primary size='small'>
                            <Icon name='user' /> Add User
                        </Button>
                        <Button size='small'>Approve</Button>
                        <Button disabled size='small'>
                            Approve All
                        </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
           
        );   
    }
}

export default Table1

// const TableExampleFullWidth = () => (
//   <Table celled compact definition>
//     <Table.Header fullWidth>
//       <Table.Row>
//         <Table.HeaderCell />
//         <Table.HeaderCell>Name</Table.HeaderCell>
//         <Table.HeaderCell>Registration Date</Table.HeaderCell>
//         <Table.HeaderCell>E-mail address</Table.HeaderCell>
//         <Table.HeaderCell>Premium Plan</Table.HeaderCell>
//       </Table.Row>
//     </Table.Header>

//     <Table.Body>
//       <Table.Row>
//         <Table.Cell collapsing>
//           <Checkbox slider />
//         </Table.Cell>
//         <Table.Cell>John Lilki</Table.Cell>
//         <Table.Cell>September 14, 2013</Table.Cell>
//         <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
//         <Table.Cell>No</Table.Cell>
//       </Table.Row>
//     </Table.Body>

//     <Table.Footer fullWidth>
//       <Table.Row>
//         <Table.HeaderCell />
//         <Table.HeaderCell colSpan='4'>
//           <Button floated='right' icon labelPosition='left' primary size='small'>
//             <Icon name='user' /> Add User
//           </Button>
//           <Button size='small'>Approve</Button>
//           <Button disabled size='small'>
//             Approve All
//           </Button>
//         </Table.HeaderCell>
//       </Table.Row>
//     </Table.Footer>
//   </Table>
// )

// export default TableExampleFullWidth
