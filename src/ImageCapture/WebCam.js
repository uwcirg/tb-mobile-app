import { ImageCapture } from "image-capture";

export default class WebCam {
  constructor(webcamElement, canvasElement, handleOutcome) {
    this.webcamElement = webcamElement;
    this.canvasElement = canvasElement;
    this.mediaStreamTrack = {};
    this.handleOutcome = handleOutcome;
  }

  getMediaStreamTrack() {
    return this.mediaStreamTrack;
  }

  turnOffCamera() {
    if (this.mediaStreamTrack != null) {
      this.mediaStreamTrack.getTracks().map(function (val) {
        val.stop();
      });
    }
  }

  async setup() {
    const setupOptions = { audio: false, video: { facingMode: "environment" } };

    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices.getUserMedia === undefined) {
        reject();
      }
      resolve(
        navigator.mediaDevices
          .getUserMedia(setupOptions)
          .then((mediaStream) => {
            const mediaStreamTrack = mediaStream.getVideoTracks()[0];
            this.mediaStreamTrack = mediaStreamTrack;

            if ("srcObject" in this.webcamElement) {
              this.webcamElement.srcObject = mediaStream;
            } else {
              // For older browsers without the srcObject.
              this.webcamElement.src = window.URL.createObjectURL(mediaStream);
            }
            this.webcamElement.addEventListener(
              "loadeddata",
              async () => {
                this.adjustVideoSize(
                  this.webcamElement.videoWidth,
                  this.webcamElement.videoHeight
                );
              },
              false
            );
          })
      );
    });
  }

  endVideo() {
    let stream = this.webcamElement.srcObject;

    if (!stream) return; // Prevents error that was crashing app when exiting after denial

    let tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    this.webcamElement.srcObject = null;
  }

  takeBlobPhoto() {
    const { imageWidth, imageHeight } = this._drawImage();
    return new Promise((resolve, reject) => {
      this.canvasElement.toBlob((blob) => {
        resolve({ blob, imageHeight, imageWidth });
      });
    });
  }

  _drawImage() {
    const imageWidth = this.webcamElement.videoWidth;
    const imageHeight = this.webcamElement.videoHeight;

    const context = this.canvasElement.getContext("2d");
    this.canvasElement.width = imageWidth;
    this.canvasElement.height = imageHeight;

    context.drawImage(this.webcamElement, 0, 0, imageWidth, imageHeight);
    return { imageHeight, imageWidth };
  }

  takeBase64Photo({ type, quality } = { type: "png", quality: 1 }) {
    const { imageHeight, imageWidth } = this._drawImage();
    const base64 = this.canvasElement.toDataURL("image/" + type, quality);
    return { base64, imageHeight, imageWidth };
  }

  takePhoto() {
    const image = new ImageCapture(this.mediaStreamTrack);
    return image;
  }

  adjustVideoSize(width, height) {
    const aspectRatio = width / height;

    if (width >= height) {
      this.webcamElement.width = aspectRatio * this.webcamElement.height;
    } else {
      this.webcamElement.height = this.webcamElement.width / aspectRatio;
    }
  }
}
