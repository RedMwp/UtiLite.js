# Utilite-Fetch Documentation

## Overview

**Utilite-Fetch** is a lightweight JavaScript library designed to simplify the process of making HTTP requests using the Fetch API. It provides an easy-to-use interface with support for various content types, loading indicators, and error handling.

### Features

- Supports common HTTP methods: GET, POST, PUT, DELETE.
- Handles multiple content types: JSON, plain text, form data, XML, and HTML.
- Configurable loading indicators.
- Timeout functionality to abort requests.
- Comprehensive error handling with detailed messages.

## Installation

You can include Utilite-Fetch in your project by downloading the library or importing it into your module:

```javascript
// ES Module
import { fetchApi, get, post, put, del } from './utilite-fetch.js';
```

## API Reference

### fetchApi(url, options)

The core function for making HTTP requests.

#### Parameters

- **url**: `string` - The URL to which the request is sent.
- **options**: `object` - Configuration options for the request.

#### Options

- **method**: `string` (default: `GET`) - The HTTP method to use (GET, POST, PUT, DELETE).
- **headers**: `object` - Additional headers to include in the request.
- **body**: `any` - The data to send with the request (for POST, PUT, etc.).
- **params**: `object` - URL parameters to append to the request URL.
- **contentType**: `string` (default: `application/json`) - The content type of the request body.
- **timeout**: `number` - Time in milliseconds before the request is aborted.
- **waiting**: `object` - Configuration for loading indicators:
  - **element**: `Element | string` - The loader element or a selector string.
  - **parent**: `string` - The parent element selector for the loader (only if `element` is a string).

#### Returns

A Promise that resolves to the response data or rejects with an error.

### Example Usage

```javascript
fetchApi('/api/data', {
  method: 'POST',
  body: { name: 'John' },
  contentType: 'application/json',
  waiting: { element: document.getElementById('loader') },
})
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Shortcuts

Utilite-Fetch provides shorthand functions for common HTTP methods:

#### get(url, options)

Makes a GET request.

**Example:**

```javascript
get('/api/data', { params: { userId: 1 } })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### post(url, body, options)

Makes a POST request.

**Example:**

```javascript
post('/api/data', { name: 'John' })
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));
```

#### put(url, body, options)

Makes a PUT request.

**Example:**

```javascript
put('/api/data/1', { name: 'Jane' })
  .then(response => console.log('Updated:', response))
  .catch(error => console.error('Error:', error));
```

#### del(url, options)

Makes a DELETE request.

**Example:**

```javascript
del('/api/data/1')
  .then(response => console.log('Deleted:', response))
  .catch(error => console.error('Error:', error));
```

## Supported Content Types

- **application/json**: JSON format (default).
- **text/plain**: Plain text.
- **application/x-www-form-urlencoded**: Form data as URL-encoded strings.
- **multipart/form-data**: File uploads and forms.
- **application/xml**: XML data.
- **text/html**: HTML content.

## Error Handling

Utilite-Fetch provides comprehensive error handling. When a request fails, it throws an error with a message that includes:

- HTTP status code.
- Error message returned from the server.

### Example:

```javascript
fetchApi('/api/data')
  .catch(error => {
    console.error('Fetch error:', error.message);
  });
```

## Loader Management

Utilite-Fetch allows you to display loading indicators during requests:

- You can pass an existing DOM element or a selector string in the `waiting` option.
- If an element is specified, it will be displayed while the request is in progress and hidden afterward.

### Example:

```javascript
const loader = document.createElement('div');
loader.className = 'loader';
loader.style.display = 'none'; // Initially hidden
document.body.appendChild(loader);

get('/api/data', {
  waiting: { element: loader }
})
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Conclusion

Utilite-Fetch is a powerful yet simple library for making HTTP requests in JavaScript. With its customizable options, support for various content types, and built-in loading management, it simplifies the complexities of working with the Fetch API. Whether you're building a small application or a large-scale web service, Utilite-Fetch can help streamline your HTTP communication. 

For further enhancements and contributions, feel free to open issues or pull requests in the repository!