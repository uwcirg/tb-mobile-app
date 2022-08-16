import React from 'react';
import overlay from './overlay.svg';

export default function ImageOverlay() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        width: '90%',
        height: '95%',
        opacity: 0.6,
        zIndex: '1',
        top: '1em',
        left: '1em',
        borderRadius: '5px',
      }}
    >
      <img
        src={overlay}
        alt="overlay is going to go right here"
        style={{
          backgroundColor: 'transparent',
          position: 'relative',
          opacity: 0.9,
          zIndex: '1',
          margin: '80px 70px',
        }}
      />
    </div>
  );
}
