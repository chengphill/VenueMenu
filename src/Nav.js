import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Menu, Sticky, Icon } from 'semantic-ui-react'
import logo from './aaaaa.png'
import CancelButton from './CancelButton.js'

export default class MenuExamplePointing extends Component {
  state = { activeItem: 'home' }

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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Sticky>
        <Menu size = 'massive' stackable widths = '8' borderless pointing secondary>
        
         <Menu.Item 
            position = 'left'
            style={{'backgroundImage': `url(${logo})`, 'background-repeat': `no-repeat;`}}
            
            />
          <Menu.Item 
            position = 'right'
            name='home' 
            active={activeItem === 'home'} 
            onClick={this.handleItemClick} />
          
          <Modal size = 'tiny' 
            trigger={<Menu.Item
            onClick= {this.handleOpenModal}
            inverted
            name='Login'
            active={activeItem === 'Login'}

                      />}
                      onClose={this.handleCloseModal}
                      open={this.state.showModal}
                      >
            <Modal.Header>
             {/* <Icon name='settings' /> Venue Management */}
            <Button.Group size='large' fluid>
    <Button onClick={() =>{this.OpenLogin(); this.TabOneClassRemove(); }}  class = "header1" id = "one">Login</Button>
    <Button.Or />
    <Button onClick={() =>{this.OpenRegister(); this.TabTwoClassRemove();}} class = "header2" id = "two">Register</Button>
  </Button.Group></Modal.Header>
            <Modal.Content image>
              {/* <Image wrapped size='medium' src='/images/avatar/large/rachel.png' /> */}
              <Modal.Description>
                <div class = 'tabContainer'>
                    {/* <div  onClick={() =>{this.OpenLogin(); this.TabOneClassRemove(); }}  class = "header1" id = "one">
                Login
                    </div>
                    <div  onClick={() =>{this.OpenRegister(); this.TabTwoClassRemove();}} class = "header2" id = "two">
                Register
                    </div> */}
                   
            </div>
                {this.state.showLogin && <LoginBox />}
            {this.state.showRegister && <RegisterBox/>}

            {/* <Button 
            onClick={this.handleCloseModal} 
          color='white' 
          fluid size='large' 
          style={{ 'margin-top': '15px'}}
          >
            Cancel
          </Button> */}
          <CancelButton doWhatever = {this.handleCloseModal}/>
          

              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Menu.Item
            name='Features'
            active={activeItem === 'Features'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='About Us'
            active={activeItem === 'About us'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Shop'
            active={activeItem === 'Shop'}
            onClick={this.handleItemClick}
          />
        </Menu>
        </Sticky>

        
        
      </div>
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
      <Header as='h2' icon color='teal' textAlign='center'>
      <Icon name='users' circular />
        {/* <Image src='/logo.png' /> */}
        Log-in to manage your venue
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

          <Button color='teal' fluid size='large' >
            Login
          </Button>

        </Segment>
      </Form>
      <Message style={{ 'margin-bottom': '35px', 'margin-top': '20px' }}>
        First time here? Register for a free one-month trial period!
      </Message>
    </Grid.Column>
  </Grid>



          </div>      
        );
        
    }
}

class RegisterBox extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    console.log("hi");
  }

    render() {
      const {password, email} = this.state
        return (
          <div>
          <Grid textAlign='center' style={{ height: '' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' icon color='teal' textAlign='center'>
      <Icon name='signup' circular />
        {/* <Image src='/logo.png' /> */}
         Be a new member of Venue Menu!
      </Header>
      <Form onSubmit={this.submitHandler} size='large'>
        <Segment stacked>
                    <Form.Input 
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='Username'/>

                    <Form.Input 
                    fluid icon='mail' 
                    iconPosition='left' 
                    placeholder='Email Address' 
                    name = 'email'
                    value={email}
                    onChange={this.changeHandler}
                    />

                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Re-type Password'
                    type='password'
                    name = 'password'
                    value = {password}
                    onChange={this.changeHandler}
                    />

                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'/>

          <Button 
          color='teal' 
          fluid size='large'
          type = 'submit'>
            Register
          </Button>
        </Segment>
      </Form>
      <Message style={{ 'margin-bottom': '35px', 'margin-top': '20px' }}>
        You're almost done! Just hit register after you filled out the information above!
      </Message>
    </Grid.Column>
  </Grid>
          </div>      
        );
        
    }
}
