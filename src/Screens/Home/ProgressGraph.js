import React from 'react';
import styled from 'styled-components';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressGraph = (props) => {
    return (
        <ProgressContainer>
            <CircularProgressbarWithChildren value={props.week / 24 * 100} styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                transition: 'stroke-dashoffset 0.5s ease 0s',
                pathColor: "#4b98e9"
            })}>
                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                <p>{props.week} / 24 Weeks</p>
            </CircularProgressbarWithChildren>
        </ProgressContainer>
    )
}

const ProgressContainer = styled.div`
width: 30vh;
margin-top: 2em;
`

export default ProgressGraph;
