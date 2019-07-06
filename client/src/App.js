import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Topics from "./components/Topics";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bio from "./components/Bio";

const posts = [
  {
    id: 1,
    title: "git cheat sheet",
    body: "assd asdas asdas asda d"
  },
  {
    id: 2,
    title: "css help",
    body: "jvnckjv civjus wiuef  shbv"
  },
  {
    id: 3,
    title: "react props",
    body: "awe iuf aosdio  iudfo iasdfi chifld asoidf"
  }
];

class App extends Component {
  state = {
    topics: { post: posts }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container-fluid">
            <Topics post={this.state.topics.post} />
            {/*<Route path="/" exact component={Topics} />*/}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
