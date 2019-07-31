import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Image } from 'semantic-ui-react';
class Request extends Component{
  
    // state = {
    //     requests:[]
    // };

    constructor (props) {
        super();
        this.state = {
            // RID: '',
            // text:'',
            // status:'',
            // date:'',
            // CID:'',
            // VID:'1'
            requests:[],
            current:null
        };
        //this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount(){
        axios.post('http://vm.projectwolverine.net/API/Views/Requests')
        .then(res => this.setState({requests: res.data}));
    }


    approveHandler = (e, {value}) => {
        e.preventDefault();
        this.state.requests.map(request =>{
            if(request.RID == value){
                this.state.current = request;
                console.log(this.state.current);
                axios
                .post('http://vm.projectwolverine.net/API/Requests/approve', this.state.current)
                .then(response => {
                  console.log(response)
                  axios.post('http://vm.projectwolverine.net/API/Views/Requests')
                  .then(res => this.setState({requests: res.data}));
                })
                .catch(error => {
                  console.log(error)
                })
            } 
        });
        
      }

      denyHandler = (e, {value}) => {
        e.preventDefault();
        this.state.requests.map(request =>{
            if(request.RID == value){
                this.state.current = request;
                console.log(this.state.current);
                axios
                .post('http://vm.projectwolverine.net/API/Requests/deny', this.state.current)
                .then(response => {
                  console.log(response)
                  axios.post('http://vm.projectwolverine.net/API/Views/Requests')
                  .then(res => this.setState({requests: res.data}));
                })
                .catch(error => {
                  console.log(error)
                })
            } 
        });
      }

    render(){
        //console.log(this.state.requests);
        return (
            <div>

                <h1>Pending</h1>
                <Card.Group >
                {this.state.requests.map((request, ind) => (
                    
                    request.status == 0? 
                    // <h1 key={request.RID}>{request.text}</h1>
                        
                        <Card key={request.RID} request={request} current={request}>
                            <Card.Content>
                                {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                                <Card.Header>RID: {request.RID}</Card.Header>
                                <Card.Meta>Date : {request.date}</Card.Meta>
                                <Card.Description>
                                    {request.text}
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green' value = {request.RID} onClick={this.approveHandler}>
                                    Approve
                                    </Button>
                                    <Button basic color='red' value ={request.RID} onClick={this.denyHandler}>
                                    Decline
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    
                    :
                    <React.Fragment></React.Fragment>
                ))}
                </Card.Group>

                <h1>Approved</h1>
                <Card.Group >
                {this.state.requests.map((request, ind) => (
                    
                    request.status == 1? 
                    // <h1 key={request.RID}>{request.text}</h1>
                        
                        <Card key={request.RID} request={request} current={request}>
                            <Card.Content>
                                {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                                <Card.Header>RID: {request.RID}</Card.Header>
                                <Card.Meta>Date : {request.date}</Card.Meta>
                                <Card.Description>
                                    {request.text}
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green' value = {request.RID} onClick={this.approveHandler}>
                                    Approve
                                    </Button>
                                    <Button basic color='red' value ={request.RID} onClick={this.denyHandler}>
                                    Decline
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    
                    :
                    <React.Fragment></React.Fragment>
                ))}
                </Card.Group>
            </div>
           
        );   
    }
    
}

export default Request;
