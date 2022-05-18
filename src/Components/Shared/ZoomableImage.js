import React from 'react';
import { Fade } from '@material-ui/core';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const ZoomableImage = ({ url, initialScale = 0.4, maxHeight = "40vh" }) => {

    return (
        <TransformWrapper
            centerOnInit
            centerZoomedOut
            initialScale={initialScale}
            minScale={0.2}>
            <TransformComponent wrapperStyle={{ backgroundColor: "white", border: "solid 1px lightgray", borderRadius: "4px", width: "100%", maxHeight: maxHeight }}>
                <Fade appear in timeout={1000}>
                    <img src={url} alt="test-strip-image-to-review" />
                </Fade>
            </TransformComponent>
        </TransformWrapper>
    )
}

export default ZoomableImage;
