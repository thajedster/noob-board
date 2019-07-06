<<<<<<< HEAD
import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Topics from "./components/Topics";
import Signup from "./components/Signup";
import Form from "./components/Form/Form";
=======
import React, { Component } from "react";
import './App.css';
import { Navbar } from "./components/Navbar";
import Topics from "./components/Topics";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bio from "./components/Bio";
>>>>>>> 372e3db047db078a58d82f4fa2cbe6faa51f9b27

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
      <div className="App">
        <Navbar />
<<<<<<< HEAD
        <Topics post={this.state.topics.post} />
        <Signup />
        <Form />
=======
        <div className="container-fluid">
          <Topics post={this.state.topics.post} />
          <Signup />
          <Login />
          <Bio />
        </div>
>>>>>>> 372e3db047db078a58d82f4fa2cbe6faa51f9b27
      </div>
    );
  }
}

export default App;
