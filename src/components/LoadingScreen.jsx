import React from "react";
import { PulseLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="loadingWrapper">
      <h1 className="loadingTitle">Loading...</h1>
      <PulseLoader color="#77d2ff" margin={5} size={20} speedMultiplier={1} />
    </div>
  );
}
