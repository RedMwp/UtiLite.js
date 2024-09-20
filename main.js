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

  // Add HTML or text content
  if (options.text) {
    element.textContent = options.text;
  } else if (options.html) {
    element.innerHTML = options.html;
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

// render function with chaining support
function render(parent, child) {
  if (!parent || !child) {
    throw new Error('Parent and child elements are required');
  }

  // If 'child' is an array of children
  if (Array.isArray(child)) {
    child.forEach(c => parent.appendChild(c));
  } else {
    parent.appendChild(child);
  }
  return parent;
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

  // Add HTML or text content
  if (options.text) {
    element.textContent = options.text;
  } else if (options.html) {
    element.innerHTML = options.html;
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
  return elements.length === 1 ? elements[0] : elements;
}

// Apply text content
function text(elementOrSelector, textContent, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (textContent) {
      element.textContent = textContent;
    }
  });
  return elements.length === 1 ? elements[0] : elements;
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
  return elements.length === 1 ? elements[0] : elements;
}

// Apply id
function id(elementOrSelector, elementId, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (elementId) {
      element.id = elementId;
    }
  });
  return elements.length === 1 ? elements[0] : elements;
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
  return elements.length === 1 ? elements[0] : elements;
}

// Apply styles
function styles(elementOrSelector, styleObject, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (styleObject) {
      Object.assign(element.style, styleObject);
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply single child element
function appendChild(elementOrSelector, child, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (child) {
      element.appendChild(child);
    }
  });
  return elements.length === 1 ? elements[0] : elements;
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
  return elements.length === 1 ? elements[0] : elements;
}

// Apply single event
function on(elementOrSelector, eventType, callback, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (eventType && callback) {
      element.addEventListener(eventType, callback);
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply multiple events
function events(elementOrSelector, eventObj, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (eventObj) {
      Object.keys(eventObj).forEach(eventType => {
        element.addEventListener(eventType, eventObj[eventType]);
      });
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Event delegation utility
function delegate(parentSelector, childSelector, eventType, callback) {
  document.querySelector(parentSelector).addEventListener(eventType, function(event) {
    if (event.target.matches(childSelector)) {
      callback.call(event.target, event);
    }
  });
}

// Class manipulation utilities
function toggleClass(elementOrSelector, className, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    element.classList.toggle(className);
  });
  return elements.length === 1 ? elements[0] : elements;
}

function removeClass(elementOrSelector, className, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    element.classList.remove(className);
  });
  return elements.length === 1 ? elements[0] : elements;
}

function replaceClass(elementOrSelector, oldClass, newClass, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    element.classList.replace(oldClass, newClass);
  });
  return elements.length === 1 ? elements[0] : elements;
}