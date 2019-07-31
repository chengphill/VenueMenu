import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import { Image, Input, Menu, Segment, Sticky } from 'semantic-ui-react'

import Header from './components/Header';
// import Slide from './components/Slide';
import Show from './components/Show';
import About from './components/About';
import Service from './components/Service';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Nav from './components/Nav';
import Login from './components/pages/Login';
import Modal from './components/LoginModal';
import ClientLogin from './components/ClientLogin'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className = "App">
          <div className = "">
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Header />
                <Sticky>
                <Modal/>
                </Sticky>
                <Show/>
                <br></br>
                <About id = "section1"/>
                <Service id = "section1"/>
                <br/>
                <Shop/>
                <br/>
                <Contact id = "section1"/>
              </React.Fragment>
            )}/>
          <Route path="/login" component={Login}/>
          <Route path="/clientlogin" component={ClientLogin}/>

          </div>
        </div>
      </Router>
    );
  }
}
export default App;

// 20:50 mins