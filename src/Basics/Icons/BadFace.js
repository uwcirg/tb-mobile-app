import React from 'react'
import image from './frown.svg'

export default function GoodFace(props) {

    return (
        <>
        <img className={props.className} src={image} />
        </>
    )
}

