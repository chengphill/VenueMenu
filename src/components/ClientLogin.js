import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Menu, Sticky, Icon, Checkbox, Dropdown, Input, Card } from 'semantic-ui-react'


class ClientLogin extends Component{
    
    state = {code:''}

    handleClick= () => {
        console.log(this.props.location.state.code)
    }
    

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state

        return (
            <React.Fragment>

                    <Menu vertical>
        <Menu.Item>
          <Input placeholder='Search...' />
        </Menu.Item>

        <Menu.Item>
          Home
          <Menu.Menu>
            <Menu.Item
              name='search'
              active={activeItem === 'search'}
              onClick={this.handleClick}
            >
              Search
            </Menu.Item>
            <Menu.Item name='add' active={activeItem === 'add'} onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          <Icon name='grid layout' />
          Browse
        </Menu.Item>
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        >
          Messages
        </Menu.Item>

        <Dropdown item text='More'>
          <Dropdown.Menu>
            <Dropdown.Item icon='edit' text='Edit Profile' />
            <Dropdown.Item icon='globe' text='Choose Language' />
            <Dropdown.Item icon='settings' text='Account Settings' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

              

      <Card>
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>

            </React.Fragment>
            
        );
    }
    
}

export default ClientLogin;
