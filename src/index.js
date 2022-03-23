import React from "./didact/react";
import ReactDOM from "./didact/react-dom";

ReactDOM.render(
  <div
    onClick={() => {
      console.log(1);
    }}
  >
    <div>foo</div>
    <div>bar</div>
  </div>,
  document.getElementById("root")
);

setTimeout(() => {
  ReactDOM.render(
    <div
      onClick={() => {
        console.log(2);
      }}
    >
      <div>boo</div>
    </div>,
    document.getElementById("root")
  );
}, 2000);
