import React from "react";
import { Link } from "react-router-dom";

const Suggestions = props => {
  const titles = props.results.map(title => (
    <li key={title.id}>
      <Link to={"/post/" + title.id}>{title.title}</Link>
    </li>
  ));
  return <ul>{titles}</ul>;
};

export default Suggestions;
