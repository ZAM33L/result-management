import React from "react";
import "../pages/styles/spinner.css";

function Spinner() {
  return (
    <>
      <div className="spinner-parent">
        <div className="spinner">
          <dotlottie-player
            src="https://lottie.host/6e603aa0-9c08-41e1-a5b6-9342bc24cd5b/4Ii1Wk9EbN.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </>
  );
}

export default Spinner;
