import React, { Component} from 'react';
import './Contact.css';
import { Input } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import ScrollUpButton from "react-scroll-up-button";

class Contact extends Component {
    render() {
        return (
            <div className="contact-container" id = 'sectionContact'>
            <div className='secondContainer'>
                <div className="mail">
                </div>
                <div className="info">
                    <h1>How can we help you?</h1>
                    <p>For support or any questions:<br/>Email us and we'll get back to you<br/> as soon as we can</p>
                </div>
                <div className="clr"></div>
                <List>
    <List.Item icon='users' content='Project Wolverine' />
    <List.Item icon='marker' content='Florida, FL' />
    <List.Item
      icon='mail'
      content={<a href='mailto:magicurtains@gmail.com'>   wm.projectwolverine@gmail.com</a>}
    />
    <List.Item icon='linkify' content={<a href='http://www.wm.projectwolverine.net'>http://www.wm.projectwolverine.net</a>} />
  </List>
  
                <ScrollUpButton />
                </div>
                
            </div>
        );
    }
}

    

export default Contact;