import React from "react";
import { Link } from "react-router-dom";

const Userpost = props => {
  const titles = props.post.map(title => <Link to={"/post/" + title.id}>{title.title}</Link>);
  return <ul>{titles}</ul>;
};

export default Userpost;
