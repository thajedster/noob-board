import React, { Component } from "react";
import Topics from "../Topics";
import axios from "axios";

class TopicsContainer extends Component {
  state = {
    topics: [],
    favourites: [],
    recentlySelectedPost: 0 //id of a post that is to be added/removed from favourites
  };

  componentDidMount() {
    //check the route that was called
    const pathname = this.props.history.location.pathname;
    this.setState({ pathname: pathname });

    // show all posts
    if (pathname === "/") {
      this.getAllPosts();
      // show all favourite posts
    } else if (pathname === "/favourites") {
      this.getMyFavouritePosts();
      // show all posts by this user
    } else if (pathname === "/myposts") {
      this.getMyPosts();
    }
  }

  getAllPosts = () => {
    const { loggedIn, userId } = this.props;

    let promise = [];

    // get all posts
    promise.push(axios.get("/api/post"));
    // get this list of user's favourite posts
    if (loggedIn) {
      promise.push(axios.get(`/api/user/${userId}`));
    }

    // wait for both preceeding axios calls to finish before proceeding
    // both responses will be push into an array
    Promise.all(promise)
      .then(responses => {
        let topics = responses[0].data;
        let favourites = [];
        if (loggedIn) {
          favourites = responses[1].data.favourites;
        }

        this.checkFavorites(topics, favourites);
      })
      .catch(error => {
        // Response
        if (error.response) {
          if (error.response.status === 401) return window.location.replace("/login");

          console.log("error.response");
          console.log(error);
          // Request
        } else if (error.request) {
          console.log("error.request");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error during setting up request", error.message);
        }
      });
  };

  getMyFavouritePosts() {
    const { userId } = this.props;

    let favourites = [],
      posts = [];

    // get the list of this user's favourite posts
    axios
      .get(`/api/user/${userId}`)
      .then(response => {
        favourites = response.data.favourites;

        // get details of the favourite posts
        axios
          .get(`/api/post/`, {
            params: {
              _id: favourites
            }
          })
          .then(response => {
            posts = response.data;
            this.checkFavorites(posts, favourites);
          })
          .catch(err => {
            console.log("ERROR retrieving 'post' details");
            console.log(err);
          });
      })
      .catch(error => {
        // Response
        if (error.response) {
          if (error.response.status === 401) return window.location.replace("/login");

          console.log("error.response");
          console.log(error);
          // Request
        } else if (error.request) {
          console.log("error.request");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error during setting up request", error.message);
        }
      });
  }

  checkFavorites = (topics, favourites) => {
    //check each post if it is listed as a favourite
    topics.forEach((topic, index) => {
      let findResult = favourites.findIndex(favourite => {
        return topic.id === favourite;
      });
      const wasFound = findResult > -1 ? true : false;
      topic.isFavourite = wasFound;
    });
    this.setState({ topics: topics, favourites: favourites });
  };

  onClickFavouriteButton = postId => {
    //store the postId
    this.setState({ recentlySelectedPost: postId });

    //toggle the status of the heart icon
    // don't get postId from 'state' since the setState above is async
    this.toggleFavouriteStatus(postId);

    // save the postId into this user's favourites
    axios
      .put("/api/user/favourites", { userId: this.props.userId, postId: postId })
      .then(response => {
        let topics = this.state.topics;
        let favourites = response.data.favourites;
        this.checkFavorites(topics, favourites);
      })
      .catch(error => {
        // undo the toggle
        this.toggleFavouriteStatus(this.state.recentlySelectedPost);
        // Response
        if (error.response) {
          if (error.response.status === 401) return window.location.replace("/login");

          console.log("error.response");
          console.log(error);
          // Request
        } else if (error.request) {
          console.log("error.request");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error during setting up request", error.message);
        }
      });
  };

  toggleFavouriteStatus(postId) {
    let { topics } = this.state;

    // find which post has this postId
    let postIndex = topics.findIndex(topic => {
      return topic.id === postId;
    });

    // toggle the status
    topics[postIndex].isFavourite = !topics[postIndex].isFavourite;
    this.setState({ topics: topics });
  }

  render() {
    return (
      <Topics
        topics={this.state.topics}
        onClickFavouriteButton={this.onClickFavouriteButton}
        loggedIn={this.props.loggedIn}
      />
    );
  }
}

export default TopicsContainer;
