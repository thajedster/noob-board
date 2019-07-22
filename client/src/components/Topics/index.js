import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ClampLines from "react-clamp-lines";
import "./style.css";

function Topics(props) {
  //TODO: create new component of title and body (full article) and make topic titles show these in the bottom
  //change into smart function
  //create onclick function to change style of postbody to display inline
  //for <div className="top-topics"> just show item.title and not item.body

  return (
    <div className="row pt-3">
      <div className="col-12 col-md-8 mx-auto">
        <div id="topics-title" className="mb-3">
          <h1>Hot Topics</h1>
        </div>
        <div id="top-topics">
          {props.topics.map(item => (
            <div className="card mb-3 custom-bg-secondary" key={item.id}>
              <div className="card-body">
                <div className="card-title">
                  {props.loggedIn ? (
                    <span
                      className="mr-2 float-left"
                      onClick={() => {
                        props.onClickFavouriteButton(item.id);
                      }}
                    >
                      <i className={item.isFavourite ? "fas fa-heart text-danger border-0" : "far fa-heart border-0"} />
                    </span>
                  ) : (
                    <span />
                  )}
                  <Link to={"/post/" + item.id}>
                    <h3 className="d-inline-block">{item.title}</h3>
                  </Link>
                  <span className="h6 text-muted d-inline-block float-right">
                    <Moment fromNow>{item.createdAt}</Moment>
                  </span>
                </div>
                <ClampLines
                  text={item.body}
                  id={item.id}
                  lines={2}
                  className="card-text"
                  innerElement="p"
                  buttons={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Topics;
