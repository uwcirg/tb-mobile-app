import React from 'react';
import styled from 'styled-components';
import { CircularProgressbarWithChildren as CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressGraph = (props) => {
    return (
        <ProgressContainer>
            <CircularProgressbar  circleRatio={0.5} value={25} styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                transition: 'stroke-dashoffset 0.5s ease 0s',
                pathColor: "#4b98e9",
                rotation: 3 / 4,
                strokeLinecap: "round"
                
            })}>
               <p> 90 of <br /> 180 Days</p>
            </CircularProgressbar>
        </ProgressContainer>
    )
}

const ProgressContainer = styled.div`
width: 25%;
margin-top: 2em;

p{
    text-align: center;
    color: lightblue;
    padding: 0;
    margin: 0;
    position: relative;
    top: -1em;
    font-size: .5em;
}
`

export default ProgressGraph;
