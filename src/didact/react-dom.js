import { TEXT_ELEMENT } from "./const";

function isTextNode(type) {
  return type === TEXT_ELEMENT;
}

const isNodeChildren = (key) => key !== "children";

function render(element, container) {
  const dom = isTextNode(element.type)
    ? document.createTextNode("")
    : document.createElement(element.type);

  Object.keys(element.props)
    .filter(isNodeChildren)
    .map((key) => {
      dom[key] = element.props[key];
    });

  element.props.children.map((item) => {
    render(item, dom);
  });

  container.appendChild(dom);
}

const ReactDOM = {
  render,
};

export default ReactDOM;
