import React from "react";
import { PulseLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="loadingWrapper">
      <div className="loadingBuffer">
        <h1 className="loadingTitle">Loading...</h1>
        <PulseLoader color="#ffffff" margin={5} size={20} speedMultiplier={1} />
      </div>
    </div>
  );
}
