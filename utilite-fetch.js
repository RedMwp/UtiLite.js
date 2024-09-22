// Fetch API Library
export function fetchApi(url, options = {}) {
  const { method = 'GET', headers = {}, body, params, contentType = 'application/json', timeout, waiting } = options;

  const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
  const fullUrl = url + queryString;

  const controller = new AbortController();
  const signal = controller.signal;

  let fetchBody;
  if (method !== 'GET') {
    switch (contentType) {
      case 'application/json':
        if (body) {
          fetchBody = JSON.stringify(body);
        }
        break;
      case 'text/plain':
        fetchBody = body || '';
        break;
      case 'application/x-www-form-urlencoded':
        if (body) {
          fetchBody = new URLSearchParams(body).toString();
        }
        break;
      case 'multipart/form-data':
        fetchBody = body || new FormData(); // Ensure FormData is used if body is not provided
        break;
      case 'application/xml':
        if (body) {
          fetchBody = new XMLSerializer().serializeToString(body);
        }
        break;
      case 'text/html':
        fetchBody = body || '';
        break;
      default:
        fetchBody = body; // Fallback to raw body
    }
  }

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

  const fetchOptions = {
    method,
    headers: {
      'Content-Type': contentType,
      ...headers,
    },
    body: fetchBody || null,
    signal,
  };

  const fetchPromise = fetch(fullUrl, fetchOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(errMsg => {
          throw new Error(`HTTP error! status: ${response.status} - ${errMsg}`);
        });
      }
      const contentType = response.headers.get('Content-Type');
      return contentType && contentType.includes('application/json')
        ? response.json()
        : contentType && contentType.includes('application/xml')
        ? response.text() // Handle XML as text
        : response.text(); // Default to text for other types
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    })
    .finally(() => {
      // Hide loader if specified by the user
      if (loader) {
        loader.style.display = 'none'; // Hide the loader
      }
    });

  if (timeout) {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => {
        controller.abort();
        reject(new Error('Request timed out'));
      }, timeout)
    );
    return Promise.race([fetchPromise, timeoutPromise]);
  }

  return fetchPromise;
}

// Shortcuts for common HTTP methods
export function get(url, options = {}) {
  return fetchApi(url, { ...options, method: 'GET' });
}

export function post(url, body, options = {}) {
  return fetchApi(url, { ...options, method: 'POST', body });
}

export function put(url, body, options = {}) {
  return fetchApi(url, { ...options, method: 'PUT', body });
}

export function del(url, options = {}) {
  return fetchApi(url, { ...options, method: 'DELETE' });
}