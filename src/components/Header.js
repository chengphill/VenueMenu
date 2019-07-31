import React, { Component} from 'react';
import {Image, Icon} from 'semantic-ui-react'
import headerImage from './SampleLogoVM.png';

class Header extends Component {
    render() {
        return (
            <div style = {headerStyle}>
                <div style = {topBar}>                    </div>
                    <div style = {{'position': 'relative'}}>
                <Image
                 centered
                 size = 'small'
                 src = {headerImage}></Image>
                <div style = {insideBar}>venuemanagement@gmail.com<Icon name = 'mail' ></Icon>
                </div>
                <div style = {insideBar2}>Project Wolverine <Icon name = 'trademark' ></Icon>
                </div>
                <div style = {insideBar3}>(1)941-555-1234 <Icon name = 'phone' ></Icon>
                </div>

                </div>
            </div>
        );
    }
}
const topBar = {
    backgroundColor: '',
    fontSize: '14px',
    fontFamily: 'helvetica',
    'margin-left': '20%'
}

const insideBar = {
    'position': 'absolute',
    top: '1%',
    right: '20%',
    fontSize: '15px',
    fontFamily: 'helvetica',
    }

const insideBar2 = {
    'position': 'absolute',
    top: '1%',
    right: '10%',
    fontSize: '15px',
    fontFamily: 'helvetica',
    'font-weight': 'bold'
}

const insideBar3 = {
    'position': 'absolute',
    top: '1%',
    left: '13%',
    fontSize: '13px',
    fontFamily: 'helvetica',
    'font-weight': ''
}

const headerStyle = {
    backgroundColor: '',
    paddingTop: '',
    paddingBottom: ''
}

const hOne = {
    color: 'black',
    textAlign: 'center',
    fontSize: '',
    fontFamily: ''
}
    

export default Header;