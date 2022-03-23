import React, { useState } from "./react";

function Counter() {
  const [state, setState] = useState(1);
  return (
    <h1
      onClick={() => {
        setState((c) => c + 1);
      }}
    >
      Count: {state}
    </h1>
  );
}
const element = <Counter />;

React.render(element, document.getElementById("root"));
