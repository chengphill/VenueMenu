import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Nav from './Nav.js'
import './LoginModal.css'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'


ReactModal.setAppElement('#root');

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '500px',
      height                : '500px'
    }
  };

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false,
            showLogin:true,
            showRegister:false
        };
        
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.OpenLogin = this.OpenLogin.bind(this);
    this.OpenRegister = this.OpenRegister.bind(this);
    this.TabOneClassRemove = this.TabOneClassRemove.bind(this);
    this.TabTwoClassRemove = this.TabTwoClassRemove.bind(this);

    }


handleOpenModal () {
    this.setState({ showModal: true });
  }
  
handleCloseModal () {
    this.setState({ showModal: false });
  }

OpenLogin(){
    this.setState({showLogin:true, showRegister:false});
}

OpenRegister(){
    this.setState({showLogin:false, showRegister:true});

}

TabOneClassRemove(){
    var element = document.getElementById("one");
    var element2 = document.getElementById("two");
    element.classList.add("headeractive");
    element2.classList.remove("headeractive");
}

TabTwoClassRemove(){
    var element = document.getElementById("one");
    var element2 = document.getElementById("two");
    element.classList.remove("headeractive");
    element2.classList.add("headeractive");
}

  render () {
    return (
        
      <div>

      <Nav action ={this.handleOpenModal}/>
      {this.state.showModal && <Modal2 />}

      
        {/* <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
        >   
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

            <div class = 'tabContainer'>
                    <div  onClick={() =>{this.OpenLogin(); this.TabOneClassRemove(); }}  class = "header1 underline" id = "one">
                Login
                    </div>
                    <div  onClick={() =>{this.OpenRegister(); this.TabTwoClassRemove();}} class = "header2" id = "two">
                Register
                    </div>
            </div>

            {this.state.showLogin && <LoginBox />}
            {this.state.showRegister && <RegisterBox/>}

        <button onClick={this.handleCloseModal}>Cancel</button>

        </ReactModal> */}

        <div class="six col">
        <a href="www.google.com" class="button" id="button-1">Lorem ipsum dolor</a>
      </div>
      </div>
    );
  }
  
}

class Modal2 extends Component{
    render(){
        return(
            <Modal>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
              <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>We've found the following gravatar image associated with your e-mail address.</p>
                <p>Is it okay to use this photo?</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
    }
}


class LoginBox extends Component{

    render() {
        return (
          <div>
               {/* <div>
                <label>
                Username
                </label>
                <input type = "text" placeholder = "Username"></input>
            </div>
            <div>
                <label>
                Password
                </label>
                <input type = "text" placeholder = "Password"></input>
            </div>
            <button>Sign in</button> */}
            <Grid textAlign='center' style={{ height: '' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        {/* <Image src='/logo.png' /> */}
        Please log-in to access your control panel
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>



          </div>      
        );
        
    }
}

class RegisterBox extends Component{

    render() {
        return (
          <div>
          <Grid textAlign='center' style={{ height: '' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        {/* <Image src='/logo.png' /> */}
         Be a new user of Venue Menu!
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />

                    <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email Address' />
                    <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Re-type Password'
            type='password'
          />
                    <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
          </div>      
        );
        
    }
}

const props = {};

export default App;

