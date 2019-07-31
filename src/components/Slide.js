import React, { Component} from 'react';
import './Slide.css';

class Slide extends Component {
    render() {
        return (
            <div className="slide-container">
                <span id="slider-image-1"></span>
                <span id="slider-image-2"></span>
                <span id="slider-image-3"></span>
                <div className="image-container">
                    <img src = {require("./d.jpg")} className = "slider-imagge"/>
                    <img src = {require("./b.png")} className = "slider-imagge"/>
                    <img src = {require("./c.png")} className = "slider-imagge"/>
                </div>

                <div className = "button-container">
                    <a href="#slider-image-1" className="slider-button"></a>
                    <a href="#slider-image-2" className="slider-button"></a>
                    <a href="#slider-image-3" className="slider-button"></a>
                </div>
            </div>
        );
    }
}


    

export default Slide;