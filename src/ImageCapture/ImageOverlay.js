import React from 'react';
import overlay from './overlay.svg';

export default function ImageOverlay() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        width: '90%',
        height: '90%',
        opacity: 0.4,
        zIndex: '1',
        borderRadius: '5px',
        margin: '1em auto',
        left: '1em',
        top: '1em',
      }}
    >
      <img
        src={overlay}
        alt="overlay is going to go right here"
        style={{
          height: '75vh',
          maxWidth: '100%',
          margin: '1em auto',
          backgroundColor: 'transparent',
          position: 'relative',
          opacity: 0.9,
          zIndex: '2',
        }}
      />
    </div>
  );
}
