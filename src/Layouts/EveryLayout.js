import React from "react";
import "./every-layout.css";

function Stack({ children }) {
  return <div className="stack">{children}</div>;
}

function Box({ children }) {
  return <div className="box">{children}</div>;
}

function Center({ children }) {
  return <div className="center">{children}</div>;
}

function Cluster({ children }) {
  return <div className="cluster">{children}</div>;
}

function WithSidebar({ children }) {
  return <div className="with-sidebar">{children}</div>;
}

function Cover({ children }) {
  return <div className="cover">{children}</div>;
}

function Frame({ path, description }) {
  return (
    <div class="path">
      <img src={path} alt={description} />
    </div>
  );
}

function Grid({ children }) {
  return <div class="grid">{children}</div>;
}

function Reel({ children }) {
  // explore further for js implementation
  return <div class="reel">{children}</div>;
}

function Imposter({ staticContent, superimposedContent }) {
  return (
    <div style={{ position: "relative" }}>
      <p>{staticContent}</p>
      <div class="imposter">
        <p>{superimposedContent}</p>
      </div>
    </div>
  );
}

function Icon({ children, svgPath }) {
  return (
    <span class="with-icon">
      <svg class="icon">
        <use href={svgPath}></use>
      </svg>
      {children}
    </span>
  );
}

export default {
  Stack,
  Box,
  Center,
  Cluster,
  WithSidebar,
  Cover,
  Frame,
  Grid,
  Reel,
  Imposter,
  Icon,
};
