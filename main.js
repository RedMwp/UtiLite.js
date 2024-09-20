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
