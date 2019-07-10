import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopicsContainer from "./components/TopicsContainer";
import Signup from "./components/Signup";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Route path="/" exact component={TopicsContainer} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Bio} />
          <Route path="/question" component={Form} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
