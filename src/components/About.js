import React, { Component} from 'react';
import './About.css';
class About extends Component {
    render() {
        return (
            <div className = "about-container">
                <div style = {lol} >
                    It's about all the <span style = {{'color':'#00B5AD'}}>comfort</span> that we can guarantee for<span style = {{'color':'#00B5AD'}}> you</span>.   
                </div>
                <div className = "text-container">
                    <div className = "box-two">
                            {/* <img src ={Pic}  className = "slider-imagge" alt="whats this"/> */}
                       
                    </div>
                    <div className="box-one"> 

                    </div>
                    <div className="clr"></div>
                </div>
            </div>
        );
    }
}
const lol = {
    'width': '40.375rem',
    fontSize: '3rem',
    'font-weight': '800',
    'margin-bottom':  '1.875rem',
    'line-height': '1.125',
    'padding-bottom': '1.875rem;',
    'font-family': '"Montserrat","Helvetica Neue",Helvetica,Roboto,Arial,sans-serif',
    'letter-spacing': '-.125rem;',
    'text-align': 'center',
    'position': 'relative',
    'margin-left' : 'auto',
    'margin-right' : 'auto',
    display: 'block',
    'margin-block-end': '0.67em'

}

    

export default About;