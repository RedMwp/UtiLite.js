export function create(tagName, options = {}) {
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
export function render(parent, child) {
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
export function select(selectorOrElement, options = {}) {
  let element;

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

  // Apply similar options as in `create`
  if (options.className) {
    options.className.split(' ').forEach(name => {
      element.classList.add(name);
    });
  }

  if (options.id) {
    element.id = options.id;
  }

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

  if (options.styles) {
    Object.assign(element.style, options.styles);
  }

  if (options.text) {
    element.textContent = options.text;
  } else if (options.html) {
    element.innerHTML = options.html;
  }

  if (options.child) {
    element.appendChild(options.child);
  }

  if (options.children) {
    options.children.forEach(child => {
      element.appendChild(child);
    });
  }

  // Unified events syntax
  if (options.events) {
    for (let event in options.events) {
      element.addEventListener(event, options.events[event]);
    }
  }

  return element;
}

// Utility function to handle both elements and selectors, with 'all' option
export function selectElements(elementOrSelector, all = false) {
  if (typeof elementOrSelector === 'string') {
    return all ? document.querySelectorAll(elementOrSelector) : [document.querySelector(elementOrSelector)];
  }
  return [elementOrSelector];
}

// Apply HTML content
export function html(elementOrSelector, htmlContent, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (htmlContent) {
      element.innerHTML = htmlContent;
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply text content
export function text(elementOrSelector, textContent, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (textContent) {
      element.textContent = textContent;
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply classes
export function className(elementOrSelector, classes, all = false) {
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
export function id(elementOrSelector, elementId, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (elementId) {
      element.id = elementId;
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply attributes

export function attr(elementOrSelector, attributes, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (attributes) {
      // Iterate over object keys and set attributes
      for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply styles
export function styles(elementOrSelector, styleObject, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (styleObject) {
      Object.assign(element.style, styleObject);
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply single child element
export function appendChild(elementOrSelector, child, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (child) {
      element.appendChild(child);
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply multiple child elements (renamed to children)
export function children(elementOrSelector, childElements, all = false) {
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
export function on(elementOrSelector, eventType, callback, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    if (eventType && callback) {
      element.addEventListener(eventType, callback);
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

// Apply multiple events
export function events(elementOrSelector, eventObj, all = false) {
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
export function delegate(parentSelector, childSelector, eventType, callback) {
  document.querySelector(parentSelector).addEventListener(eventType, function(event) {
    if (event.target.matches(childSelector)) {
      callback.call(event.target, event);
    }
  });
}

// Class manipulation utilities
export function toggleClass(elementOrSelector, className, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    element.classList.toggle(className);
  });
  return elements.length === 1 ? elements[0] : elements;
}

export function removeClass(elementOrSelector, className, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    element.classList.remove(className);
  });
  return elements.length === 1 ? elements[0] : elements;
}

export function replaceClass(elementOrSelector, oldClass, newClass, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    element.classList.replace(oldClass, newClass);
  });
  return elements.length === 1 ? elements[0] : elements;
}

//addons

export function setCssVar(elementOrSelector, variables, all = false) {
  const elements = selectElements(elementOrSelector, all);
  elements.forEach(element => {
    for (const [variableName, value] of Object.entries(variables)) {
      element.style.setProperty(variableName, value);
    }
  });
  return elements.length === 1 ? elements[0] : elements;
}

export function getCssVar(elementOrSelector, variableNames) {
  const element = selectElements(elementOrSelector)[0];
  const computedStyle = getComputedStyle(element);

  const variables = {};
  variableNames.forEach(variableName => {
    variables[variableName] = computedStyle.getPropertyValue(variableName).trim();
  });

  return variables;
}

export function clone(elementOrSelector, deep = true) {
  const element = selectElements(elementOrSelector)[0];
  return element.cloneNode(deep);
}

export function fragment(elements = []) {
  const fragment = document.createDocumentFragment();
  elements.forEach(el => fragment.appendChild(el));
  return fragment;
}

export function replaceElement(targetSelectorOrElement, newElement) {
  const target = selectElements(targetSelectorOrElement)[0];
  if (target && newElement) {
    target.replaceWith(newElement);
  }
}

export function animate(elementOrSelector, keyframes, options) {
  const element = selectElements(elementOrSelector)[0];

  let keyframeArray;

  // Check if 'from' and 'to' properties are provided
  if (keyframes.from && keyframes.to) {
    keyframeArray = [
      { ...keyframes.from, offset: 0 },
      { ...keyframes.to, offset: 1 }
    ];
  } else {
    // Convert the keyframes object into an array of keyframe objects
    keyframeArray = Object.entries(keyframes).map(([offset, styles]) => {
      return { ...styles, offset: parseFloat(offset) };
    });
  }

  // Set default options and include repeat for repeating
  const {
    duration = 400,
      easing = 'ease',
      repeat = 1,
      alternate = false,
      yoyo = false
  } = options || {};

  // Determine the final repeat count and direction
  let finalRepeat = repeat;
  let direction = 'normal';

  if (yoyo) {
    finalRepeat = Infinity;
    direction = 'alternate'; // Smooth back and forth for yoyo
  } else if (alternate) {
    direction = 'alternate'; // Smooth alternating direction
    finalRepeat = Math.ceil(repeat / 2); // Half the repeat for alternate effect
  }

  const animationOptions = {
    duration,
    easing,
    iterations: finalRepeat,
    direction,
  };

  return element.animate(keyframeArray, animationOptions);
}



// Bounce Animation
export function bounce(elementOrSelector, duration = 600) {
  animate(elementOrSelector, {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(-30px)' }
  }, { duration, easing: 'ease-in-out', repeat: Infinity, yoyo: true });
}

// Debounce Animation (slower bounce)
// Debounce Animation (bouncy effect)
// Debounce Animation (bouncy effect)
export function debounce(elementOrSelector, duration = 600) {
  const element = selectElements(elementOrSelector)[0];

  const keyframes = [
    { transform: 'translateY(0)', offset: 0 },
    { transform: 'translateY(-30px)', offset: 0.2 },
    { transform: 'translateY(10px)', offset: 0.5 },
    { transform: 'translateY(-15px)', offset: 0.8 },
    { transform: 'translateY(0)', offset: 1 }
  ];

  const options = {
    duration,
    easing: 'cubic-bezier(0.5, 1.5, 0.5, 1)', // Bouncy easing
    iterations: Infinity,
  };

  element.animate(keyframes, options);
}

// Slide Animation
export function slide(elementOrSelector, direction = 'left', duration = 600) {
  const translateX = direction === 'left' ? '-100%' : '100%';
  animate(elementOrSelector, {
    from: { transform: `translateX(${translateX})` },
    to: { transform: 'translateX(0)' }
  }, { duration, easing: 'ease' });
}

// Fade Animation
export function fade(elementOrSelector, duration = 600, opacityStart = 0, opacityEnd = 1) {
  animate(elementOrSelector, {
    from: { opacity: opacityStart },
    to: { opacity: opacityEnd }
  }, { duration, easing: 'ease' });
}

// Spin Animation
export function spin(elementOrSelector, duration = 600) {
  animate(elementOrSelector, {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }, { duration, easing: 'linear', repeat: Infinity });
}

// Smooth Scroll to Element
export function smoothScrollTo(elementOrSelector, duration = 600) {
  const target = selectElements(elementOrSelector)[0];
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Hide on Scroll Down and Show on Scroll Up
export function hideOnScrollDownShowOnScrollUp(elementOrSelector) {
  const element = selectElements(elementOrSelector)[0];
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      element.style.opacity = '0';
    } else {
      // Scrolling up
      element.style.opacity = '1';
    }

    lastScrollTop = currentScrollTop;
  });
}


// Gravity Simulation Animation with Permanent Bounce Effect
export function gravity(elementOrSelector, {
  duration = 2000,
  windDirection = 0, // Angle in degrees
  windStrength = 0, // Strength of the wind
  weight = 1, // Weight of the element
  repeat = 1, // Number of repeats (1 for one full fall and bounce)
  area = { width: window.innerWidth, height: window.innerHeight } // Allowed area
} = {}) {
  const element = selectElements(elementOrSelector)[0];
  const startY = 0; // Starting position
  const fallDistance = 200 * weight; // Fall distance based on weight
  const bounceHeight = fallDistance / 2; // Height to which it bounces back

  const keyframes = [
    { transform: `translate(${Math.cos(windDirection * Math.PI / 180) * windStrength}px, ${startY}px)`, offset: 0 },
    { transform: `translate(${Math.cos(windDirection * Math.PI / 180) * windStrength}px, ${fallDistance}px)`, offset: 0.5 },
    { transform: `translate(${Math.cos(windDirection * Math.PI / 180) * windStrength}px, ${fallDistance - bounceHeight}px)`, offset: 0.75 },
    { transform: `translate(${Math.cos(windDirection * Math.PI / 180) * windStrength}px, ${fallDistance}px)`, offset: 0.85 },
    { transform: `translate(${Math.cos(windDirection * Math.PI / 180) * windStrength}px, ${fallDistance - bounceHeight}px)`, offset: 0.95 },
    { transform: `translate(${Math.cos(windDirection * Math.PI / 180) * windStrength}px, ${fallDistance}px)`, offset: 1 } // End position
  ];

  const options = {
    duration,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Easing for a realistic falling effect
    iterations: repeat,
    fill: 'forwards' // Keep the final position
  };

  // Set boundaries based on the defined area
  const areaBounds = {
    minX: 0,
    maxX: area.width - element.offsetWidth,
    minY: 0,
    maxY: area.height - element.offsetHeight
  };

  element.animate(keyframes, options);

  // Final position adjustment
  const finalPosition = fallDistance - bounceHeight;
  element.style.transform = `translate(${Math.cos(windDirection * Math.PI / 180) * windStrength}px, ${finalPosition}px)`;

  // Handle boundary checking
  const checkBounds = () => {
    const rect = element.getBoundingClientRect();
    if (rect.left < areaBounds.minX) {
      element.style.transform = `translate(${areaBounds.minX}px, ${finalPosition}px)`;
    }
    if (rect.right > areaBounds.maxX) {
      element.style.transform = `translate(${areaBounds.maxX - element.offsetWidth}px, ${finalPosition}px)`;
    }
    if (rect.top < areaBounds.minY) {
      element.style.transform = `translate(${rect.left}px, ${areaBounds.minY}px)`;
    }
    if (rect.bottom > areaBounds.maxY) {
      element.style.transform = `translate(${rect.left}px, ${areaBounds.maxY - element.offsetHeight}px)`;
    }
  };

  // Monitor the position to keep it within bounds
  const observer = new MutationObserver(checkBounds);
  observer.observe(element, { attributes: true, childList: false, subtree: false });
}