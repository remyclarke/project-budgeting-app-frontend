import React from "react";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Budget App
        </a>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/transactions/new")}
        >
          Create New
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
