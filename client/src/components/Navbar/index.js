import React from "react";
import "./style.css";
import logo from "../Navbar/noob-logo.png";

export function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt={"logo"} />
      <button>Sign Up</button>
      <button>Sign In</button>
      <button>Ask Question</button>
    </div>
  );
}
