import { TEXT_ELEMENT } from "./const";

function isTextNode(type) {
  return type === TEXT_ELEMENT;
}

const isNodeChildren = (key) => key !== "children";

function createDom(fiber) {
  const dom = isTextNode(fiber.type)
    ? document.createTextNode("")
    : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(isNodeChildren)
    .map((key) => {
      dom[key] = fiber.props[key];
    });

  return dom;
  // element.props.children.map((item) => {
  //   render(item, dom);
  // });

  // container.appendChild(dom);
}

function render(element, container) {
  nextUnitWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

let nextUnitWork = null;

function workLoop(deadLine) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitOfWork(nextUnitWork);
    shouldYield = deadLine.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let preSibling = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      preSibling.sibling = newFiber;
    }
    preSibling = newFiber;
    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

const ReactDOM = {
  render,
};

export default ReactDOM;
