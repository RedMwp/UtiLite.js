Sure! Here’s a comprehensive documentation for your `utilite-xhr.js` file.

---

# utilite-xhr.js Documentation

## Overview

The `utilite-xhr.js` module provides a simple and versatile API for making HTTP requests using the `XMLHttpRequest` object. It includes support for common HTTP methods (GET, POST, PUT, DELETE), customizable headers, query parameters, timeouts, and loading indicators.

## Installation

You can include the `utilite-xhr.js` file in your project by importing it as a module:

```javascript
import { get, post, put, del } from './utilite-xhr';
```

## Functions

### 1. `xhrApi(url, options)`

The core function for making XMLHttpRequests.

#### Parameters

- **url**: `string`
  - The endpoint URL for the request.

- **options**: `object`
  - An object containing various options for the request:
    - **method**: `string` (default: `'GET'`)
      - The HTTP method to use (GET, POST, PUT, DELETE).
    - **headers**: `object` (default: `{}`)
      - An object containing custom headers to include in the request.
    - **body**: `any`
      - The request payload (for POST and PUT requests).
    - **params**: `object`
      - An object representing query parameters to append to the URL.
    - **contentType**: `string` (default: `'application/json'`)
      - The Content-Type of the request.
    - **timeout**: `number`
      - The timeout duration in milliseconds.
    - **waiting**: `object`
      - An object specifying the loader configuration:
        - **element**: `Element | string`
          - The DOM element to show as a loader, or a selector string.
        - **parent**: `string`
          - The selector for the parent element if using a selector string.

#### Returns

- A Promise that resolves with the response data (parsed as JSON if applicable) or rejects with an error.

#### Example

```javascript
xhrApi('https://api.example.com/data', {
  method: 'GET',
  params: { id: 123 },
  waiting: { element: '#loader' }
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

### 2. `get(url, options)`

A shortcut function for making GET requests.

#### Parameters

- **url**: `string`
  - The endpoint URL for the request.
  
- **options**: `object`
  - Options to customize the request.

#### Returns

- A Promise that resolves with the response data or rejects with an error.

#### Example

```javascript
get('https://api.example.com/items', { params: { page: 1 } })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 3. `post(url, body, options)`

A shortcut function for making POST requests.

#### Parameters

- **url**: `string`
  - The endpoint URL for the request.

- **body**: `any`
  - The data to send in the request body.

- **options**: `object`
  - Options to customize the request.

#### Returns

- A Promise that resolves with the response data or rejects with an error.

#### Example

```javascript
post('https://api.example.com/items', { name: 'Item 1' })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 4. `put(url, body, options)`

A shortcut function for making PUT requests.

#### Parameters

- **url**: `string`
  - The endpoint URL for the request.

- **body**: `any`
  - The data to send in the request body.

- **options**: `object`
  - Options to customize the request.

#### Returns

- A Promise that resolves with the response data or rejects with an error.

#### Example

```javascript
put('https://api.example.com/items/1', { name: 'Updated Item' })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 5. `del(url, options)`

A shortcut function for making DELETE requests.

#### Parameters

- **url**: `string`
  - The endpoint URL for the request.

- **options**: `object`
  - Options to customize the request.

#### Returns

- A Promise that resolves with the response data or rejects with an error.

#### Example

```javascript
del('https://api.example.com/items/1')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## Error Handling

When a request fails, the promise returned by `xhrApi` will reject with an `Error` object. The error message will include the HTTP status and status text for easier debugging. Consider implementing additional error handling in your application to manage different error scenarios.

## Loading Indicators

The `waiting` option allows you to display a loading indicator while the request is in progress. You can specify either a DOM element directly or a selector string along with its parent element. The loader will be shown when the request starts and hidden when it completes or fails.

## Conclusion

The `utilite-xhr.js` module simplifies making AJAX requests in your applications, offering flexibility and ease of use. Customize it further to fit your project needs!

--- 