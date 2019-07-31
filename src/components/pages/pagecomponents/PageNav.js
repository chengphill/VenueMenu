import React, { Component } from 'react'
import { Menu,  Sticky } from 'semantic-ui-react'
import Request from './Requests';
import Stall from './Stalls';
import Client from './Table1';
import Roster from './Roster';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default class MenuExamplePointing extends Component {
  //state = { activeItem: 'home' }

  // state ={
  //   showStall: false,
  //   showRequest: false
  // }

  constructor (props) {
    super();
    this.state = {
            activeItem: 'home',
            showStall: false,
            showRequest: false,
            showClient: false,
            showRoster: false,
            redirect: true
    };
    this.clickStall = this.clickStall.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect  to='/home' />
    }
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  clickRequest  = (e, { name }) => {
    this.setState({ activeItem: name, showRequest: true, showStall: false,showClient: false, showRoster:false })
  }
  clickStall = (e, {name}) => {
    this.setState({activeItem: name})
    this.setState({showRequest:false})
    this.setState({showStall:true})
    this.setState({showClient:false})
    this.setState({showRoster:false})

  }
  clickClient  = (e, { name }) => {
    this.setState({ activeItem: name, showRequest: false, showStall: false, showClient:true,showRoster:false })
  }

  clickRoster  = (e, { name }) => {
    this.setState({ activeItem: name, showRequest: false, showStall: false, showClient:false,showRoster:true })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Sticky>
        <Menu size = 'massive' stackable widths = '8' borderless>
        
         <Menu.Item 
            position = 'left'
            
            />
          <Menu.Item 
            position = 'right'
            name='viewRequest' 
            active={activeItem === 'viewRequest'} 
            onClick={this.clickRequest} />
            
              
            <Menu.Item
            name='viewStall'
            active={activeItem === 'viewStall'}
            onClick={this.clickStall}
            link = '/login'
            />
              
            
          <Menu.Item
            name='View Client'
            active={activeItem === 'View Client'}
            onClick={this.clickClient}
          />
          <Menu.Item
            name='Roster'
            active={activeItem === 'Roster'}
            onClick={this.clickRoster}
          />
          <Menu.Item
            name='Logout'
            active={activeItem === 'Logout'}
            onClick={this.clickOut}
          ></Menu.Item>
          
        </Menu>
        </Sticky>
        <br/>

        <div style = {aa}>
          {this.state.showRequest&&<Request/>}
          {this.state.showStall&&<Stall/>}
          {this.state.showClient&&<Client/>}
          {this.state.showRoster&&<Roster/>}
        </div>
      </div>
      
    )
  }
  
}
const aa = {
  widths: '80%',
  margin: '2%'
}
