import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Menu, Sticky, Icon, Checkbox } from 'semantic-ui-react'
import CancelButton from './CancelButton.js'
import axios from 'axios';
import logo2 from './logo3.png';
import * as Scroll from 'react-scroll';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'




export default class MenuExamplePointing extends Component {
  state = { activeItem: 'home' }

  constructor () {
    super();
    this.state = {
        showModal: false,
        showLogin:true,
        showRegister:false,
        showAdmin:true
    };
    
this.handleOpenModal = this.handleOpenModal.bind(this);
this.handleCloseModal = this.handleCloseModal.bind(this);
this.OpenLogin = this.OpenLogin.bind(this);
this.OpenRegister = this.OpenRegister.bind(this);
this.OpenAdmin = this.OpenAdmin.bind(this);
this.CloseAdmin = this.CloseAdmin.bind(this);
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

OpenAdmin(){
  this.setState({showAdmin:true});
}

CloseAdmin(){
  this.setState({showAdmin:false});
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
    var scroll     = Scroll.animateScroll;
    return (
      <div>

<Link to="/ClientLogin">
          <Button 
          color='teal' 
          fluid size='large'
          type = 'submit' >
            Login
          </Button>
          </Link>
        <Menu 
        size = 'massive' 
        stackable 
        widths = '9' 
        borderless 
        pointing
        style={{ 'font-family': 'Helvetica',
                  'font-size': '20px',
                  'border' : 'none'}}
>
        
         <Menu.Item
            position = ''
            >
            <Icon name = 'home'></Icon>
            <span header
           style={{ 'color': 'black',
                    'font-weight': '525'}}
           > Venue Management</span>

            </Menu.Item>
          <Menu.Item>

          </Menu.Item>


          
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
                <Form size = 'tiny'>
                        <Form.Group inline>
          <Form.Radio
            label='Admin'
            value='true'
            checked={this.state.showAdmin === true}
            onChange={this.OpenAdmin}
          />
          <Form.Radio
            label='Client'
            value='false'
            checked={this.state.showAdmin === false}
            onChange={this.CloseAdmin}
          />
        </Form.Group>
      </Form>
                {/* {this.state.showLogin && <LoginBox />}
            {this.state.showRegister && <RegisterBox/>} */}
            {(this.state.showLogin && this.state.showAdmin) && <LoginBox />}
            {(this.state.showLogin && (!this.state.showAdmin)) && <LoginBox2 />}
            {(this.state.showRegister && this.state.showAdmin) && <RegisterBox />}
            {(this.state.showRegister && (!this.state.showAdmin)) && <RegisterBox2 />}


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
            href='#sectionServices'

          />

          <Menu.Item
            name='Pricing'
            active={activeItem === 'Pricing'}
            onClick={this.handleItemClick}
            a href='#sectionShop'
          />

          <Menu.Item
            name='Contact Us'
            active={activeItem === 'Contact Us'}
            onClick={this.handleItemClick}
            a href='#sectionContact'
          />
        </Menu>

        
        
      </div>
    )
  }
}

class LoginBox extends Component{
  constructor(props){
    super(props)
    this.state = {
      VID: '1',
      email: '',
      password: '',
      response: '',
      client: ''
    }
  }

  handleClick=()=>{
    const aid = '1';
    console.log(aid);
    console.log(this.state.response.AID)
    if (aid === this.state.response.AID)
    {
      console.log('hi');
      this.props.history.push({pathname: '/clientlogin',});
    }
  }


  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    axios
    .post('http://vm.projectwolverine.net/API/Accounts/Admin/Login', this.state)
    .then(res => {
      this.setState({response : res.data});
      console.log(res.data.AID);
      console.log(res.data);
      console.log(this.state.response.AID);  
    })
    .catch(error => {
      console.log(error)
    })
  }

    
    render()
     {
      if(this.state.response.err === '0')
      {
        return <Redirect to = {{ pathname:'/clientlogin',
          state: {code: this.state.response.AID}
          }}
        />
      }
      const {password, email} = this.state
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
      <Icon name='user' circular />
        {/* <Image src='/logo.png' /> */}
        Admin Log-in to manage your venue
      </Header>
      <Form onSubmit={this.submitHandler} size='large'>
        <Segment stacked>
            <Form.Input 
            fluid icon='mail' 
            iconPosition='left' 
            placeholder='Email Address'
            onChange={this.changeHandler}
            name = 'email'
            value={email} />
            <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name = 'password'
            value = {password}
            onChange={this.changeHandler}/>

          <Button 
          color='teal' 
          fluid size='large'
          type = 'submit'
          onClick = {this.handleClick} >
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
      VID: '1',
      email: '',
      password: '',
      fname: '',
      lname: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    axios
    .post('http://vm.projectwolverine.net/API/Accounts/Admin/CreateAccount', this.state)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

    render() {
      const {password, email, fname, lname} = this.state
        return (
          <div>
          <Grid textAlign='center' style={{ height: '' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' icon color='teal' textAlign='center'>
      <Icon name='signup' circular />
        {/* <Image src='/logo.png' /> */}
         Be a new venue Admin of Venue Menu!
      </Header>
      <Form onSubmit={this.submitHandler} size='large'>
        <Segment stacked>
        <Form.Group widths='equal'>
                    <Form.Input 
                     icon='user' 
                    fluid 
                    label='First name'
                    placeholder='First name'
                    name = 'fname'
                    value={fname}
                    onChange={this.changeHandler} />
                    <Form.Input 
                    icon='user outline' 
                    fluid 
                    label='Last name' 
                    placeholder='Last name'
                    name ='lname'
                    value={lname}
                    onChange={this.changeHandler} />
        </Form.Group>

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
                    placeholder='Password'
                    type='password'
                    name = 'password'
                    value = {password}
                    onChange={this.changeHandler}
                    />

                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Re-type Password'
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
        Creating an admin account gives you control over all information regarding the stalls.
      </Message>
    </Grid.Column>
  </Grid>
          </div>      
        );
        
    }
}

class RegisterBox2 extends Component{
  constructor(props){
    super(props)
    this.state = {
      VID: '1',
      email: '',
      password: '',
      fname: '',
      lname: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    axios
    .post('http://vm.projectwolverine.net/API/Accounts/Client/CreateAccount', this.state)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

    render() {
      const {password, email, fname, lname} = this.state
        return (
          <div>
          <Grid textAlign='center' style={{ height: '' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' icon color='teal' textAlign='center'>
      <Icon name='signup' circular />
        {/* <Image src='/logo.png' /> */}
         Be a new client of Venue Menu!
      </Header>
      <Form onSubmit={this.submitHandler} size='large'>
        <Segment stacked>
        <Form.Group widths='equal'>
                    <Form.Input 
                     icon='user' 
                    fluid 
                    label='First name'
                    placeholder='First name'
                    name = 'fname'
                    value={fname}
                    onChange={this.changeHandler} />
                    <Form.Input 
                    icon='user outline' 
                    fluid 
                    label='Last name' 
                    placeholder='Last name'
                    name ='lname'
                    value={lname}
                    onChange={this.changeHandler} />
        </Form.Group>

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
                    placeholder='Password'
                    type='password'
                    name = 'password'
                    value = {password}
                    onChange={this.changeHandler}
                    />

                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Re-type Password'
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
        As a client, you may request stalls from a venue and rent them with ease!
      </Message>
    </Grid.Column>
  </Grid>
          </div>      
        );
        
    }
}

class LoginBox2 extends Component{
  constructor(props){
    super(props)
    this.state = {
      VID: '1',
      email: '',
      password: '',
      response: '',
      client: ''
    }
  }

  handleClick=()=>{
    const cid = '1';
    console.log(cid);
    console.log(this.state.response.CID)
    if (cid === this.state.response.CID)
    {
      console.log('hi');
      this.props.history.push({pathname: '/clientlogin',});
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    axios
    .post('http://vm.projectwolverine.net/API/Accounts/Client/Login', this.state)
    .then(res => {
      this.setState({response : res.data});
    })
    .catch(error => {
      console.log(error)
    })
  }

    render() {
      if(this.state.response.err === '0')
      {
        return <Redirect to = {{ pathname:'/clientlogin',
          state: {code: this.state.response.CID}
          }}
        />
      }
      const {password, email} = this.state

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
        Client Log-in to manage your stall
      </Header>
      <Form onSubmit={this.submitHandler} size='large'>
        <Segment stacked>
            <Form.Input 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Email Address'
            onChange={this.changeHandler}
            name = 'email'
            value={email} />
            <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name = 'password'
            value = {password}
            onChange={this.changeHandler}/>

{/* <Link to="/login"> */}
          <Button 
          color='teal' 
          fluid size='large'
          type = 'submit' >
            Login
          </Button>
          {/* </Link> */}
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
