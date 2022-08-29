import React from 'react';
import overlay from './overlay.svg';

export default function ImageOverlay() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        position: 'relative',
        width: '90%',
        height: '95%',
        opacity: 0.6,
        zIndex: '1',
        borderRadius: '5px',
        margin: '1em auto',
      }}
    >
      <p>Please keep your camera steady until the process is over</p>
      <img
        src={overlay}
        alt="overlay is going to go right here"
        style={{
          height: '400px',
          maxWidth: '100%',
          margin: '1em auto',
          backgroundColor: 'transparent',
          position: 'relative',
          opacity: 0.9,
          zIndex: '1',
        }}
      />
    </div>
  );
}
