import React from "react";

const Suggestions = props => {
  const titles = props.results.map(title => <li key={title.id}>{title.title}</li>);
  return <ul>{titles}</ul>;
};

export default Suggestions;
