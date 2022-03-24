import React from "./react";

function App(props) {
  return <h1>Hi {props.name}</h1>;
}
let element = <App name="foo" />;

React.render(element, document.getElementById("root"));

setTimeout(() => {
  let element = <App name="bar" />;
  React.render(element, document.getElementById("root"));
}, 2000);
