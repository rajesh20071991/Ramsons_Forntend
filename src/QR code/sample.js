import React, { useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

function QRScanner() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");

  const startScanner = async () => {
    try {
      const codeReader = new BrowserQRCodeReader();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const result = await codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current
      );
      setResult(result.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
      <br />
      <button onClick={startScanner}>Start Scan</button>
      <br />
      {result && <div>QR Code Result: {result}</div>}
    </div>
  );
}

export default QRScanner;
