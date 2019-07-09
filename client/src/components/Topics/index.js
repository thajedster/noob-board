import React from "react";
import "./style.css";

function Topics(props) {
  //TODO: create new component of title and body (full article) and make topic titles show these in the bottom
  //for <div className="top-topics"> just show item.title and not item.body
  return (
    <div className="row">
      <div className="topics-title">
        <h1>Hot Topics</h1>
      </div>
      <div className="top-topics">
        {props.post.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
