import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar'

class App extends React.Component {
  state = {
    topics: {}
  }

  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
