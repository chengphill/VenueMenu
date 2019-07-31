import React, { Component} from 'react';
import './Service.css';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Menu, Sticky, Icon, Checkbox, Divider } from 'semantic-ui-react'


class Service extends Component {
    render() {
        return (
            
            <div className = "container" id = 'sectionServices' >
             <Divider horizontal>
      <Header as='h4'>
        Features
      </Header>
    </Divider>
            <div className = 'space'></div>
                <div className = "block">
                <h1>Inquery/Request </h1>
                    <div className="content">
                        <p>With our program, An Admin who owns the flea market may manage information and store them
                        in our database with an intuitive user interface. Seeing how much tenants owe and approving requests for stalls
                        if a client wishes to rent one.
                        </p>
                    </div>
                </div>
                <div className="block">
                <h1>Client Login System</h1>
                    <div className="content">
 
                        <p>Clients may manage their own personalized stall or request Stalls from different venues.
                        This allows them to change stall descriptions such as tags and check their payment dues.
                        Clients may even sign in for daily attendance and avoid the morning rushes. </p>
                    </div>

                </div>
                <div className ="block">
                <h1>Stall/Client Verification Helper</h1>
                    <div className="content">

                        <p>Check ups and Routines made easier for the administration rounds with the mobile app!
                        With one swipe you may confirm stall tenants and ensure the data is saved.
                        This fraud prevention system allows you to guard your property!</p>
                    </div>

                </div>
                
                <Divider horizontal>
      <Header as='h4'>
        <Icon name='tag' />
        Pricing
      </Header>
    </Divider>
    <div className = 'space'></div>


                <div className="clr"></div>

            </div>
        );
    }
}

    

export default Service;