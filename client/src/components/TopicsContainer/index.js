import React, { Component } from "react";
import Topics from "../Topics";
import axios from "axios";

class TopicsContainer extends Component {
  state = {
    topics: [],
    favourites: []
  };

  componentDidMount() {
    const { userId } = this.props;

    let promise = [];

    // get all posts
    promise.push(axios.get("/api/post"));
    // get this list of user's favourite posts
    promise.push(axios.get(`/api/user/${userId}`));

    // wait for both preceeding axios calls to finish before proceeding
    // both responses will be push into an array
    Promise.all(promise).then(responses => {
      // this.setState({ topics: responses[0].data, favourites: responses[1].data.favourites });
      let topics = responses[0].data;
      let favourites = responses[1].data.favourites;

      this.checkFavorites(topics, favourites);
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
    console.log("Topics: ", topics);
    console.log("Favourites: ", favourites);
    this.setState({ topics: topics, favourites: favourites });
  };

  onClickFavouriteButton = postID => {
    let topics = this.state.topics;
    // find which post has this postId
    let postIndex = topics.findIndex(topic => {
      return topic.id === postID;
    });
    console.log(postIndex);

    // save the postId into this user's favourites
    axios
      .put("/api/user/favourites", { userId: this.props.userId, postId: this.state.topics[postIndex]._id })
      .then(response => {
        let favourites = response.data.favourites;
        console.log("Click Favourites", favourites);
        this.checkFavorites(topics, favourites);
        this.setState({ error: "" });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  };

  render() {
    return <Topics topics={this.state.topics} onClickFavouriteButton={this.onClickFavouriteButton} />;
  }
}

export default TopicsContainer;
