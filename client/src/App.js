import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Topics } from './components/Topics';

class App extends React.Component {
  state = {
    topics: {}
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Topics />
      </div>
    );
  }
}

export default App;
