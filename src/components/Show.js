import React, { Component} from 'react';
import { Slide } from 'react-slideshow-image'; 
import './Show.css';
import Ii from './images/slide_15.jpg';
import Iii from './images/slide_13.jpg';
import Iiii from './images/slide_17.jpg';
// const slideImages = [
//     'images/slide_2.jpg',
//     'images/slide_3.jpg',
//     'images/slide_4.jpg'
//   ];
  
  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
  }

class Show extends Component {
    
    render() {
        return (
            <div className = "bg">
                <div className="slide-container">
                    <Slide {...properties}>
                    
                    <div className="each-slide">
                    <div style={{'backgroundImage': `url(${Ii})`}}>
                        <span className="a"></span>
                    </div>
                    </div>
                    <div className="each-slide">
                    <div style={{'backgroundImage': `url(${Iii})`}}>
                        <span className="a"></span>
                    </div>
                    </div>
                    <div className="each-slide">
                    <div style={{'backgroundImage': `url(${Iiii})`}}>
                        <span className="a"></span>
                    </div>
                    </div>
                </Slide>
            </div>
          </div>
        );
    }
}


    

export default Show;