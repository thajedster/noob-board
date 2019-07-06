import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import TopicsContainer from "./components/TopicsContainer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bio from "./components/Bio";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Route path="/" exact component={TopicsContainer} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
