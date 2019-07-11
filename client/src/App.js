import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopicsContainer from "./components/TopicsContainer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bio from "./components/Bio";
import Form from "./components/Form/Form";

class App extends Component {
  state = {
    loggedIn: false,
    userId: null
  };

  componentDidMount() {
    if (localStorage.getItem("state")) {
      this.setState(JSON.parse(localStorage.getItem("state")));
    } else {
      localStorage.setItem("state", JSON.stringify(this.state));
    }
  }

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  updateState = newState => {
    this.setState(newState);
  };

  render() {
    const { loggedIn, userId } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar loggedIn={loggedIn} />
          <div className="container-fluid">
            <Switch>
              <Route path="/" exact component={TopicsContainer} />
              <Route path="/signup" exact render={() => <Signup loggedIn={loggedIn} />} />
              <Route path="/login" exact render={() => <Login updateState={this.updateState} loggedIn={loggedIn} />} />
              <Route path="/profile" render={() => <Bio loggedIn={loggedIn} userId={userId} />} />
              <Route path="/question" component={Form} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
