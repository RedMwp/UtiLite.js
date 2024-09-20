function create(tagName, options = {}) {
  let element = document.createElement(tagName);

  // Add CSS classes to element
  if (options.className) {
    options.className.split(' ').forEach(name => {
      element.classList.add(name);
    });
  }

  // Add id
  if (options.id) {
    element.id = options.id;
  }

  // Add attributes (support for both single object or array of attributes)
  if (options.attr) {
    if (Array.isArray(options.attr)) {
      options.attr.forEach(attr => {
        element.setAttribute(attr.name, attr.value);
      });
    } else {
      for (let name in options.attr) {
        element.setAttribute(name, options.attr[name]);
      }
    }
  }

  // Add inline styles
  if (options.styles) {
    Object.assign(element.style, options.styles);
  }

  // Add HTML content
  if (options.html) {
    element.innerHTML = options.html;
  }

  // Add text content
  if (options.text) {
    element.innerText = options.text;
  }

  // Add a single child
  if (options.child) {
    element.appendChild(options.child);
  }

  // Add multiple children
  if (options.children) {
    options.children.forEach(child => {
      element.appendChild(child);
    });
  }

  // Add events using the new syntax
  if (options.events) {
    for (let event in options.events) {
      element.addEventListener(event, options.events[event]);
    }
  }

  return element;
}

// render function
function render(parent, child) {
  if (!parent || !child) {
    throw new Error('Parent and child elements are required');
  }

  // If 'child' is an array of children
  if (Array.isArray(child)) {
    child.forEach(c => parent.appendChild(c));
  } else {
    // If it's a single child element
    parent.appendChild(child);
  }
}

// Function to select an existing element or accept an element directly
function select(selectorOrElement, options = {}) {
  let element;

  // Check if the argument is a string (selector) or an HTML element
  if (typeof selectorOrElement === 'string') {
    element = document.querySelector(selectorOrElement);
  } else if (selectorOrElement instanceof HTMLElement) {
    element = selectorOrElement;
  } else {
    console.error('Invalid selector or element provided.');
    return null;
  }

  if (!element) {
    console.error(`Element with selector '${selectorOrElement}' not found.`);
    return null;
  }

  // Add CSS classes to the element
  if (options.className) {
    options.className.split(' ').forEach(name => {
      element.classList.add(name);
    });
  }

  // Add id
  if (options.id) {
    element.id = options.id;
  }

  // Add attributes (support for both single object or array of attributes)
  if (options.attr) {
    if (Array.isArray(options.attr)) {
      options.attr.forEach(attr => {
        element.setAttribute(attr.name, attr.value);
      });
    } else {
      for (let name in options.attr) {
        element.setAttribute(name, options.attr[name]);
      }
    }
  }

  // Add inline styles
  if (options.styles) {
    Object.assign(element.style, options.styles);
  }

  // Add HTML content
  if (options.html) {
    element.innerHTML = options.html;
  }

  // Add text content
  if (options.text) {
    element.innerText = options.text;
  }

  // Add a single child
  if (options.child) {
    element.appendChild(options.child);
  }

  // Add multiple children
  if (options.children) {
    options.children.forEach(child => {
      element.appendChild(child);
    });
  }

  // Add simple event using the `on` syntax
  if (options.on) {
    element.addEventListener(options.on[0], options.on[1]);
  }

  // Add multiple events using the same syntax for `events`
  if (options.events) {
    options.events.forEach(event => {
      element.addEventListener(event[0], event[1]);
    });
  }

  return element;
}


// Utility function to handle both elements and selectors, with 'all' option
function selectElements(elementOrSelector, all = false) {
  if (typeof elementOrSelector === 'string') {
    return all ? document.querySelectorAll(elementOrSelector) : [document.querySelector(elementOrSelector)];
  }
  return [elementOrSelector];
}

// Apply HTML content
function html(elementOrSelector, htmlContent, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (htmlContent) {
      element.innerHTML = htmlContent;
    }
  });
}

// Apply text content
function text(elementOrSelector, textContent, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (textContent) {
      element.innerText = textContent;
    }
  });
}

// Apply classes
function className(elementOrSelector, classes, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (classes) {
      classes.split(' ').forEach(name => {
        element.classList.add(name);
      });
    }
  });
}

// Apply id
function id(elementOrSelector, elementId, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (elementId) {
      element.id = elementId;
    }
  });
}

// Apply attributes
function attr(elementOrSelector, attributes, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (attributes) {
      attributes.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
      });
    }
  });
}

// Apply styles
function styles(elementOrSelector, styleObject, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (styleObject) {
      Object.keys(styleObject).forEach(style => {
        element.style[style] = styleObject[style];
      });
    }
  });
}

// Apply single child element
function appendChild(elementOrSelector, child, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (child) {
      element.appendChild(child);
    }
  });
}

// Apply multiple child elements (renamed to children)
function children(elementOrSelector, childElements, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (childElements) {
      childElements.forEach(child => {
        element.appendChild(child);
      });
    }
  });
}

// Apply single event
function on(elementOrSelector, eventType, callback, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (eventType && callback) {
      element.addEventListener(eventType, callback);
    }
  });
}

// Apply multiple events (new function)
function events(elementOrSelector, eventObj, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (eventObj) {
      Object.keys(eventObj).forEach(eventType => {
        element.addEventListener(eventType, eventObj[eventType]);
      });
    }
  });
}
