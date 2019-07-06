import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import Topics from './components/Topics';
import Signup from './components/Signup';
import Bio from './components/Bio';

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
]

class App extends React.Component {
  state = {
    topics: { post: posts }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Topics post={this.state.topics.post} />
        <Signup />
        <Bio />
      </div>
    );
  }
}

export default App;
