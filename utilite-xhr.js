// utilite-xhr.js

export function xhrApi(url, options = {}) {
  const { method = 'GET', headers = {}, body, params, contentType = 'application/json', timeout, waiting } = options;

  const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
  const fullUrl = url + queryString;

  const xhr = new XMLHttpRequest();
  xhr.open(method, fullUrl);

  // Set headers
  xhr.setRequestHeader('Content-Type', contentType);
  Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));

  // Show loader if specified by the user
  let loader;
  if (waiting) {
    if (waiting.element instanceof Element) {
      loader = waiting.element; // Use the provided DOM element directly
    } else if (waiting.element && waiting.parent) {
      loader = document.querySelector(waiting.parent).querySelector(waiting.element);
    }
    if (loader) {
      loader.style.display = 'block'; // Show the loader
    }
  }

  // Return a Promise
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // Hide loader if specified by the user
        if (loader) {
          loader.style.display = 'none'; // Hide the loader
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          const responseType = xhr.getResponseHeader('Content-Type');
          const response = responseType && responseType.includes('application/json') ?
            JSON.parse(xhr.responseText) :
            xhr.responseText;

          resolve(response);
        } else {
          reject(new Error(`HTTP error! status: ${xhr.status} - ${xhr.statusText}`));
        }
      }
    };

    if (timeout) {
      xhr.timeout = timeout;
      xhr.ontimeout = () => {
        reject(new Error('Request timed out'));
        if (loader) {
          loader.style.display = 'none'; // Hide the loader
        }
      };
    }

    xhr.send(body ? JSON.stringify(body) : null); // Send the request with the body
  });
}

// Shortcuts for common HTTP methods
export function get(url, options = {}) {
  return xhrApi(url, { ...options, method: 'GET' });
}

export function post(url, body, options = {}) {
  return xhrApi(url, { ...options, method: 'POST', body });
}

export function put(url, body, options = {}) {
  return xhrApi(url, { ...options, method: 'PUT', body });
}

export function del(url, options = {}) {
  return xhrApi(url, { ...options, method: 'DELETE' });
}