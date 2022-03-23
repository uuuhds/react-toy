import React from "./react";

const ele = (
  <div id="fruits">
    <p>Apple</p>
    <button
      onClick={() => {
        console.log(1);
      }}
    >
      log
    </button>
    <p>Banana</p>
  </div>
);

React.render(ele, document.getElementById("root"));

setTimeout(() => {
  React.render(
    <div id="fruits">
      <p>Apple</p>
      <button
        onClick={() => {
          console.log(2);
        }}
      >
        log
      </button>
    </div>,
    document.getElementById("root")
  );
}, 2000);
