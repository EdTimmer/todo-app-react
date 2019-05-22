/**
* Fetches to the backend and directs results to proper function for processing
*
* @param  {string} method - Request method
* @param  {object} data - Todo object
* @param  {function} cb - Callback function for returned data
*/
export function api(method, data, cb, customUrl) {
  console.log('data in api is: ', typeof data);
  const promise = getApiPromise(method, data, customUrl);
  promise.then(json => {
    console.log('json in promise is: ', typeof json);
    if (typeof cb === 'function') {
      // if (typeof json === 'string') {
      //   cb(JSON.parse(json));
      // }
      // else if (typeof json === 'object') {
      //   cb(json);
      // }
      cb(json);
    }
  })
  .catch(err => {
    console.log('error:', err);
  });
}

/**
 * HTML request to the backend
 * @param  {string} method - Request method
 * @param  {object} data - Todo object
 *
 * @returns {promise} - Promise from the fetch request to the backend
 */
export function getApiPromise(method, data, customUrl) {  
  let url = 'http://localhost:3000/todos';
  if (customUrl) {
    url = customUrl;
  }
  if (['DELETE', 'PUT'].indexOf(method) !== -1 && data) {
    // if (typeof data === 'string') {
    //   let parsedData = JSON.parse(data);
    //   url += `/${parsedData.id}`;
    // }
    // if (typeof data === 'object') {
    //   url += `/${data.id}`;
    // }
    url += `/${data.id}`;
  }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  //converts a JavaScript data object into a string
  if (data) {
    options.body = JSON.stringify({
      data,
    });
  }

  return fetch(url, options)
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));
    }
    return response.json(); // parses JSON response into native Javascript objects
  });
}
