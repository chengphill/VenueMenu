import React,{ Component } from 'react';
import { Button, Checkbox, Icon, Table, Modal, Confirm } from 'semantic-ui-react';
import axios from 'axios';


class Roster extends Component{
    state = {
        users:[],
        open: false,
        open2: false
    };

    componentDidMount(){
        axios.post('http://vm.projectwolverine.net/API/Views/VerifyInfo')
        .then(res => this.setState({users: res.data}));
    }

    reset  = () => {
        this.setState({open:false})
        axios.post('http://vm.projectwolverine.net/API/Administration/resetVerification')
        .then(res => 
            axios.post('http://vm.projectwolverine.net/API/Views/VerifyInfo')
            .then(res => this.setState({users: res.data}))
        );
      }

      resetAtt  = () => {
        this.setState({open2:false})
        axios.post('http://vm.projectwolverine.net/API/Administration/resetAttendance')
        .then(res => 
            axios.post('http://vm.projectwolverine.net/API/Views/VerifyInfo')
            .then(res => this.setState({users: res.data}))
        );
      }

    open = () => {
        this.setState({open: true })
    }
    open2 = () => {
        this.setState({open2: true })
    }
    close = () => this.setState({ 
        open: false ,
        open2: false
    })

    attendanceCheck = (e,{value})=> {
        return value === 1? true : false
    }
    
    render(){
        return (
            
            <div>
                <div>
                    <Button onClick={this.open}>Reset Verification</Button>
                    <Confirm content="Do you really want to reset verificaation?" open={this.state.open} onCancel={this.close} onConfirm={this.reset} />
                </div>

                <div>
                    <Button onClick={this.open2}>Reset Attendance</Button>
                    <Confirm content="Do you really want to reset attendance?" open={this.state.open2} onCancel={this.close} onConfirm={this.resetAtt} />
                </div>

                {/* <Button content="Reset" basic color ='red' style={aa} onClick={this.reset}/> */}
                <Table celled fixed singleLine>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Stall Number and Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked-in</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Present</Table.HeaderCell>
                        <Table.HeaderCell>Verified</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {this.state.users.map(user => (
                        
                        <Table.Row key={user.CID}>
                        <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                        <Table.Cell>#{user.stall}: {user.stallName}</Table.Cell>
                        <Table.Cell>{user.present === 1? <div>Yes</div>: <div>No</div>}</Table.Cell>
                        <Table.Cell>{user.verified === 1? <div>Verified</div>: <div>Unverified</div>}</Table.Cell>
                        <Table.Cell collapsing>
                        <Checkbox slider />
                        </Table.Cell>
                        <Table.Cell collapsing>
                        <Checkbox slider checked={this.attendanceCheck} onChange={this.attendaceChange} value={user.present}/>
                        </Table.Cell>
                        </Table.Row>
                    ))}


                    </Table.Body>
                </Table>
            </div>
           
        );   
    }
}

export default Roster

const aa = {
    marginLeft: '45%'
    
}