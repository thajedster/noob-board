import React from "react";
import { Link } from "react-router-dom";

const Suggestions = props => {
  const titles = props.results.map(title => (
    <Link to={"/post/" + title.id}>
      <li key={title.id}>{title.title}</li>
    </Link>
  ));
  return <ul>{titles}</ul>;
};

export default Suggestions;
