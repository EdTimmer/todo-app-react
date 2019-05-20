/**
* Fetches to the backend and directs results to proper function for processing
*
* @param  {string} method - Request method
* @param  {object} data - Todo object
* @param  {function} cb - Callback function for returned data
*/
export function api(method, data, cb) {
  const promise = getApiPromise(method, data);

  // console.log('after promise');

  promise.then(json => {
    console.log('promise got called');
    console.log('json in promise is: ', json);
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
  // console.log('I RUN RUN');
  if (['DELETE', 'PUT'].indexOf(method) !== -1 && data) {
    if (typeof data === 'string') {
      let parsedData = JSON.parse(data);
      url += `/${parsedData.id}`;
    }
    if (typeof data === 'object') {
      url += `/${data.id}`;
    }
  }
  // else if (method === 'PUT') {
  //   url = 'http://localhost:3000/all'
  // }

  

  // if(method === 'PUT' && data === null) {
  //   // console.log('got called')
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
  // console.log('GOT TO BEFORE FETCH');

  console.log('options: ', options);

  return fetch(url, options)
  // .then(response => console.log('response is: ', response))
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message)); 
    }

    return response.json();
  })
}
