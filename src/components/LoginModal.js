import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Nav from './Nav.js'
import { throwStatement } from '@babel/types';

ReactModal.setAppElement('#root');

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false
        };
        
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    }


handleOpenModal () {
    this.setState({ showModal: true });
  }
  
handleCloseModal () {
    this.setState({ showModal: false });
  }


  render () {
    return (
      <div>
      <Nav action ={this.handleOpenModal}/>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
        <Com/>
        <button onClick={this.handleCloseModal}>Close Modal</button>

        </ReactModal>
      </div>
    );
  }
  
}

class Com extends Component{
    render(){
        return(
            
            <div>
               <div>
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
            <button>Sign in</button>


          <button onClick={this.handleCloseModal}>Close Modal</button>
          </div>
        );
    }
}


const props = {};



export default App;

