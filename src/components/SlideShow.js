import React from 'react'
import { Slide } from 'react-slideshow-image';
function SlideShow() {

    const slideImages = [
        'images/vizslide1.jpg',
        'images/vizslide2.jpg',
        'images/vizslide2.jpg'
      ];
      
      const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
      }
      
    return (
        <Slide {...properties}>
            <div className="viz-slide">
                <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                    <span>Slide 1</span>
                </div>
            </div>
            <div className="viz-slide">
                <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                    <span>Slide 2</span>
                </div>
            </div>
            <div className="viz-slide">
                <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                    <span>Slide 3</span>
                </div>
            </div>

        </Slide>
    )
}

export default SlideShow
