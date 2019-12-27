import React from 'react';
import styled from 'styled-components'


const ChannelPreview = (props) => { 

    return (

        <Container>
        <img></img>

        <div>
            <h2>{props.title}</h2>
            <p> {props.subtitle}</p>
        </div>

        <span id="time" >{props.time}</span>

        </Container>

    )

}

const Container = styled.div`

    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 10vh;
    border: none;

    img{
        padding: 0;
        margin: 0em 2em 0em 1em;
        height: 3em;
        width: 3em;
        background-color: #4597ec;
    }

    #time{
        display: block;
        font-size: .5em;
        margin-left: auto;
        margin-right: 2em;
    }

    div{

        h2, p{
            margin: 0;
            padding: 0;
        }
    
        h2{
            font-size: 1em;
            padding-bottom: .25em;
        }
    
        p{
            font-size: .75em;
            color: gray;
        }
    }


`


export default ChannelPreview;