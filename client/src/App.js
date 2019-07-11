import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopicsContainer from "./components/TopicsContainer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bio from "./components/Bio";
import Post from "./components/Post";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={TopicsContainer} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Bio} />
            <Route path="/:id" component={Post} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
