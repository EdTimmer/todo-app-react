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
    console.log('promise got called')
    console.log('json in promise is: ', json)
    if (typeof cb === 'function') {

      if (typeof json === 'string') {
        cb(JSON.parse(json));
      }
      // else if (typeof json === 'undefined') {
      //   cb();
      // }
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
  if (['DELETE', 'PUT'].indexOf(method) !== -1 && data !== null) {
    if (typeof data === 'string') {
      let parsedData = JSON.parse(data);
      url += `/${parsedData.id}`;
    }
    if (typeof data === 'object') {
      url += `/${data.id}`;
    }
  }

  // if(method === 'PUT' && data === null) {
  //   url =`http://localhost:3000/todos`;
  // }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  console.log('data is: ', data)

  if (data) {
    if (typeof data === 'string') {
      // data = JSON.parse(data);
      // options.body = JSON.stringify({
      //   data,
      // });
      options.body = data;
    }
    if (typeof data === 'object') {
      // data = JSON.parse(data)
      options.body = JSON.stringify({
        data,
      });
    }
    // if (!data) {
    //   // data = JSON.parse(data)
    //   options.body = {};
    // }
  }

  // if (!data) {
  //   options.body = null;
  // }

  return fetch(url, options)
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));  //.catch ?
    }

    return response.json();
  })
}
