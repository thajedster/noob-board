import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Topics(props) {
  //TODO: create new component of title and body (full article) and make topic titles show these in the bottom
  //change into smart function
  //create onclick function to change style of postbody to display inline
  //for <div className="top-topics"> just show item.title and not item.body
  return (
    <div className="row">
      <div className="topics-title">
        <h1>Hot Topics</h1>
      </div>

      <div className="top-topics">
        {props.post.map(item => (
          <div key={item.id}>
            <div className="posttitle">
              <Link to={"/" + item.id}>
                <h3>{item.title}</h3>
              </Link>
            </div>

            <div className="postbody">
              <p>{item.body}</p>
            </div>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
