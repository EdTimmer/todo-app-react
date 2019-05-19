/**
* Fetches to the backend and directs results to proper function for processing
*
* @param  {string} method - Request method
* @param  {object} data - Todo object
* @param  {function} cb - Callback function for returned data
*/
export function api(method, data, cb) {
  const promise = getApiPromise(method, data);

  promise.then(json => {
    if (typeof cb === 'function') {
      // cb(json);
      // console.log('json is: ', typeof json)
      // console.log('json is: ', json);
      // console.log('json typeof is: ', typeof json);
      if (typeof json === 'string') {
        cb(JSON.parse(json));
      }
      else if (typeof json === 'object') {
        cb(json);
      }
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
export function getApiPromise(method, data) {
  let url = 'http://localhost:3000/todos';
  if (['DELETE', 'PUT'].indexOf(method) !== -1) {
    // console.log(JSON.parse(data))
    let parsedData = JSON.parse(data);
    // console.log(parsedData.id)
    // url += `/${data.id}`;
    url += `/${parsedData.id}`;
    // console.log(url)   
  }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (data) {
    // console.log('data 1 is: ', typeof data)
    data = JSON.parse(data)
    options.body = JSON.stringify({
      data,
    });
    // options.body = data;
    // console.log('data 2 is: ', typeof data)
  }
  // console.log('url before fetch is: ', url)
  return fetch(url, options)
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));  //.catch ?
    }

    return response.json();
  })
}
