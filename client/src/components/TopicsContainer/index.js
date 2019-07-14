import React, { Component } from "react";
import Topics from "../Topics";
import axios from "axios";

class TopicsContainer extends Component {
  state = {
    topics: [],
    favourites: []
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
    const { userId } = this.props;

    let promise = [];

    // get all posts
    promise.push(axios.get("/api/post"));
    // get this list of user's favourite posts
    promise.push(axios.get(`/api/user/${userId}`));

    // wait for both preceeding axios calls to finish before proceeding
    // both responses will be push into an array
    Promise.all(promise).then(responses => {
      let topics = responses[0].data;
      let favourites = responses[1].data.favourites;
      this.checkFavorites(topics, favourites);
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
      .catch(err => {
        console.log("ERROR retrieiving user's favourite posts");
        console.log(err);
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

  onClickFavouriteButton = postID => {
    let topics = this.state.topics;
    // find which post has this postId
    let postIndex = topics.findIndex(topic => {
      return topic.id === postID;
    });

    // save the postId into this user's favourites
    axios
      .put("/api/user/favourites", { userId: this.props.userId, postId: this.state.topics[postIndex]._id })
      .then(response => {
        let favourites = response.data.favourites;
        this.checkFavorites(topics, favourites);
        this.setState({ error: "" });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    return <Topics topics={this.state.topics} onClickFavouriteButton={this.onClickFavouriteButton} />;
  }
}

export default TopicsContainer;
