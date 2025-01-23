import React, { useState } from 'react';
import { Carousel as AntdCarousel, Radio } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Carousel = () => {
  const [dotPosition, setDotPosition] = useState('left');

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  return (
    <>
      <Radio.Group
        onChange={handlePositionChange}
        value={dotPosition}
        style={{
          marginBottom: 8,
        }}
      >
        {/* <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button> */}
      </Radio.Group>
      <AntdCarousel dotPosition={dotPosition} autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </AntdCarousel>
    </>
  );
};

export default Carousel;
