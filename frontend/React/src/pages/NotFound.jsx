import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <h1>404</h1>
      <h3>Page Not Found</h3>

      <Link
        to="/"
        className="btn btn-primary mt-3"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;