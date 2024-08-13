import React from 'react';
import Slider from 'react-slick';
import image1 from '../assets/Indian.jpg';
import image2 from '../assets/Ani.png';
import image3 from '../assets/Kalki.jpg';
import image4 from '../assets/Despicable.jpg';
import image5 from '../assets/Teenz.jpg';
import image6 from '../assets/Immaculate.webp';

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [image1, image2, image3, image4,image5,image6];

  const slideshowContainerStyle = {
    width: '60%', 
    margin: '0 auto',
    marginTop: '40px',
    paddingBottom: '40px',
    marginBottom: '10px'
  };

  const slideStyle = {
    textAlign: 'center',
  };

  const slideImageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '80px', 
  };

  return (
    <div style={slideshowContainerStyle}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} style={slideStyle}>
            <img src={src} alt={`Slide ${index + 1}`} style={slideImageStyle} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;