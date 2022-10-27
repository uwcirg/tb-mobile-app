import React from "react";
import { Fade } from "@material-ui/core";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import LoadS3Image from "./LoadS3Image";

const ZoomableImage = ({
  url,
  initialScale = 0.4,
  maxHeight = "40vh",
  photo,
}) => {
  /*

    Added the photo prop to allow a photoReport object to be passed in so that we can refetch
    the presinged url if needed

    */

  return (
    <TransformWrapper
      centerOnInit
      centerZoomedOut
      initialScale={initialScale}
      minScale={0.2}
    >
      <TransformComponent
        wrapperStyle={{
          backgroundColor: "white",
          border: "solid 1px lightgray",
          borderRadius: "4px",
          width: "100%",
          maxHeight: maxHeight,
        }}
      >
        <Fade appear in timeout={1000}>
          {photo ? (
            <LoadS3Image photo={photo} />
          ) : (
            <img src={url} alt="test-strip-image-to-review" />
          )}
        </Fade>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ZoomableImage;
