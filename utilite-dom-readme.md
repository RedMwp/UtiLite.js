
# UtiLite-DOM Library Documentation

## Overview

This library provides a set of utility functions for creating and manipulating DOM elements in a simple and efficient manner. It aims to streamline the process of working with the DOM by encapsulating common operations into easy-to-use functions.

---

## Installation

To use this library, simply include the script in your HTML file:

```html
<script type="module" src="/dom-library.js"></script>
```

---

## API Reference

### 1. `create(tagName, options = {})`

Creates a new DOM element.

**Parameters:**
- `tagName` (string): The type of element to create (e.g., 'div', 'span').
- `options` (object): An object containing optional properties:
  - `className` (string): CSS classes to add to the element.
  - `id` (string): An ID to assign to the element.
  - `attr` (object | array): Attributes to set on the element. Can be an object or an array of objects with `name` and `value` properties.
  - `styles` (object): Inline styles to apply to the element.
  - `text` (string): Text content to set on the element.
  - `html` (string): HTML content to set on the element.
  - `child` (HTMLElement): A single child element to append.
  - `children` (array): An array of child elements to append.
  - `events` (object): Event listeners to add to the element.

**Returns:** `HTMLElement` - The created element.

**Example:**
```javascript
const myDiv = create('div', {
  className: 'container',
  id: 'mainDiv',
  text: 'Hello World!',
  styles: { color: 'blue', backgroundColor: 'lightgray' }
});
```

---

### 2. `render(parent, child)`

Appends a child element (or elements) to a parent element.

**Parameters:**
- `parent` (HTMLElement): The parent element to which the child will be appended.
- `child` (HTMLElement | array): The child element(s) to append.

**Returns:** `HTMLElement` - The parent element.

**Example:**
```javascript
render(document.body, myDiv);
```

---

### 3. `select(selectorOrElement, options = {})`

Selects an existing element or elements based on a selector or directly as an HTMLElement.

**Parameters:**
- `selectorOrElement` (string | HTMLElement): A CSS selector string or an existing element.
- `options` (object): Similar options as in `create` for modifying the selected element.

**Returns:** `HTMLElement` | `null` - The selected element or `null` if not found.

**Example:**
```javascript
const selectedDiv = select('#mainDiv', { className: 'highlight' });
```

---

### 4. `selectElements(elementOrSelector, all = false)`

Selects elements based on a selector or directly as an HTMLElement. Can return all matching elements.

**Parameters:**
- `elementOrSelector` (string | HTMLElement): A CSS selector or an existing element.
- `all` (boolean): If `true`, returns all matching elements; otherwise, returns the first.

**Returns:** `NodeList` | `HTMLElement[]` - An array of elements or a single element.

**Example:**
```javascript
const divs = selectElements('div', true); // All divs
```

---

### 5. `html(elementOrSelector, htmlContent, all = false)`

Sets HTML content for selected elements.

**Parameters:**
- `elementOrSelector` (string | HTMLElement): A CSS selector or an existing element.
- `htmlContent` (string): HTML content to set.
- `all` (boolean): If `true`, applies to all matching elements.

**Returns:** `HTMLElement` | `HTMLElement[]` - The modified element(s).

**Example:**
```javascript
html('.container', '<p>New Paragraph</p>', true);
```

---

### 6. `text(elementOrSelector, textContent, all = false)`

Sets text content for selected elements.

**Parameters:**
- `elementOrSelector` (string | HTMLElement): A CSS selector or an existing element.
- `textContent` (string): Text content to set.
- `all` (boolean): If `true`, applies to all matching elements.

**Returns:** `HTMLElement` | `HTMLElement[]` - The modified element(s).

**Example:**
```javascript
text('.highlight', 'Updated Text', true);
```

---

### 7. `on(elementOrSelector, eventType, callback, all = false)`

Adds an event listener to selected elements.

**Parameters:**
- `elementOrSelector` (string | HTMLElement): A CSS selector or an existing element.
- `eventType` (string): The type of event (e.g., 'click').
- `callback` (function): The function to execute when the event is triggered.
- `all` (boolean): If `true`, applies to all matching elements.

**Returns:** `HTMLElement` | `HTMLElement[]` - The modified element(s).

**Example:**
```javascript
on('.button', 'click', () => alert('Button clicked!'), true);
```

---

### 8. `delegate(parentSelector, childSelector, eventType, callback)`

Sets up event delegation for child elements within a parent.

**Parameters:**
- `parentSelector` (string): A CSS selector for the parent element.
- `childSelector` (string): A CSS selector for the child elements.
- `eventType` (string): The type of event to listen for.
- `callback` (function): The function to execute when the event is triggered on a child.

**Example:**
```javascript
delegate('#parent', '.child', 'click', (e) => {
  console.log('Child clicked:', e.target);
});
```

---

### 9. Class Manipulation Methods

The library includes utility methods for manipulating classes:
- **`className(elementOrSelector, classes, all = false)`**: Adds classes to selected elements.
- **`toggleClass(elementOrSelector, className, all = false)`**: Toggles a class on selected elements.
- **`removeClass(elementOrSelector, className, all = false)`**: Removes a class from selected elements.
- **`replaceClass(elementOrSelector, oldClass, newClass, all = false)`**: Replaces an old class with a new class on selected elements.

**Examples:**
```javascript
className('.item', 'active', true);
toggleClass('.item', 'hidden', true);
removeClass('.item', 'inactive', true);
replaceClass('.item', 'old-class', 'new-class', true);
```

---

## Notes
- The library assumes the use of modern browsers with ES6 support.
- Ensure to check for element existence before applying operations to avoid errors.

## Conclusion

This DOM library simplifies element creation and manipulation, making it easier to work with the DOM. Customize and extend it to fit your specific needs. For any issues or suggestions, feel free to contribute!

--- 