import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

function PageTitle({ title }) {
  const navigate = useNavigate();
  return (
    <>
      <h5 className="container mt-2" style={{ color: "#7D0A0A" }}>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        />{" "}
        {``} {title}
      </h5>
    </>
  );
}

export default PageTitle;
