import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopicsContainer from "./components/TopicsContainer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bio from "./components/Bio";
import Form from "./components/Form/Form";
import Post from "./components/Post";
import Search from "./components/Search";
import Password from "./components/Password";

class App extends Component {
  state = {
    loggedIn: false,
    userId: null
  };

  componentWillMount() {
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
          <Navbar updateState={this.updateState} loggedIn={loggedIn} userId={userId} />
          <div className="container-fluid">
            <Switch>
              <Route
                exact
                key="show-all"
                path="/"
                render={props => (
                  <TopicsContainer {...props} updateState={this.updateState} loggedIn={loggedIn} userId={userId} />
                )}
              />
              <Route
                exact
                key="show-favourites"
                path="/favourites"
                render={props => (
                  <TopicsContainer {...props} updateState={this.updateState} loggedIn={loggedIn} userId={userId} />
                )}
              />
              <Route
                exact
                path="/signup"
                render={props => <Signup {...props} updateState={this.updateState} loggedIn={loggedIn} />}
              />
              <Route
                exact
                path="/login"
                render={props => <Login {...props} updateState={this.updateState} loggedIn={loggedIn} />}
              />
              <Route
                exact
                path="/profile"
                render={props => <Bio {...props} updateState={this.updateState} loggedIn={loggedIn} userId={userId} />}
              />
              <Route
                exact
                path="/question"
                render={props => <Form {...props} updateState={this.updateState} loggedIn={loggedIn} userId={userId} />}
              />
              <Route
                exact
                path="/search"
                render={props => (
                  <Search {...props} updateState={this.updateState} loggedIn={loggedIn} userId={userId} />
                )}
              />
              <Route
                exact
                path="/post/:id"
                render={props => <Post {...props} updateState={this.updateState} loggedIn={loggedIn} userId={userId} />}
              />
              <Route
                exact
                path="/password"
                render={props => (
                  <Password {...props} updateState={this.updateState} loggedIn={loggedIn} userId={userId} />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
