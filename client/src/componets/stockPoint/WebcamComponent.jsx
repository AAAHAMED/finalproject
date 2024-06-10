import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = ({ onColorDetected }) => {
  const webcamRef = useRef(null);

  // Function to capture and analyze the current video frame
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      detectColor(imageSrc, onColorDetected);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      capture();
    }, 2000); // Capture an image every 2000 milliseconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{
        width: 1280,
        height: 720,
        facingMode: "user"
      }}
      style={{ display: 'none' }} // Webcam is not visible
    />
  );
};

export default WebcamComponent;

function detectColor(imageSrc, callback) {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));
    callback(`rgb(${r}, ${g}, ${b})`);
  };
  img.src = imageSrc;
}
