import React from "react";
import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center w-100">
      <Spinner variant="success" />
    </div>
  );
};

export default CustomSpinner;
