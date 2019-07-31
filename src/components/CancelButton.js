import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Menu, Sticky, Icon } from 'semantic-ui-react'

const child = (props) => {
    return (
        <Button 
        onClick={props.doWhatever} 
      color='white' 
      fluid size='large' 
      style={{ 'margin-top': '0px'}}
      attached = 'bottom'
      >
        Cancel
      </Button>
    )
}

export default child;