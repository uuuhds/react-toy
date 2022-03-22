import React from "./didact/react";
import ReactDOM from "./didact/react-dom";

const element = React.createElement(
  "div",
  { id: "foo" },
  React.createElement("a", null, "bar"),
  React.createElement("b")
);

ReactDOM.render(element, document.getElementById("root"));
