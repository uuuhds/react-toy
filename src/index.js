import React from "./didact/react";
import ReactDOM from "./didact/react-dom";

function App(props) {
  return <h1>Hi {props.name}</h1>;
}
const element = <App name="foo" />;

ReactDOM.render(element, document.getElementById("root"));
