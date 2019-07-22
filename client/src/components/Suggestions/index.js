import React from "react";
import { Link } from "react-router-dom";

const Suggestions = props => {
  const titles = props.results.map(title => (
    <li className="list-group-item custom-bg-secondary" key={title.id}>
      <Link to={"/post/" + title.id}>{title.title}</Link>
    </li>
  ));
  return <ul className="list-group list-group-flush">{titles}</ul>;
};

export default Suggestions;
