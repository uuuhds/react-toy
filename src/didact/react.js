import { TEXT_ELEMENT } from "./const";

function createElement(type, config, ...children) {
  return {
    type,
    props: {
      ...config,
      children: children.map((item) => {
        return typeof item === "object" ? item : createTextNode(item);
      }),
    },
  };
}

function createTextNode(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const React = {
  createElement,
};

export default React;
