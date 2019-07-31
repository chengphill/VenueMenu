import React, { Component} from 'react';

class imageSlider extends Component {
    render() {
        return (
            <div className = "slide-container" style={sc}>
                <div className = "image-container" style={si}>

                </div>
            </div>
        );
    }
}

const sc = {
    width: '800px',
    height: '600px',
    backgroundColor: 'red'
}

const si = {
    width: '800px',
    height: '600px',
    backgroundColor: 'red'
}

export default imageSlider;