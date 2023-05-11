var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/


function fetchModel(url) {
  return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("GET", url);
      xhr.onreadystatechange = function() {
          // Don’t do anything if not final state
          if (this.readyState !== 4) {
              return;
          }
// Final State but status not OK
          if (this.status !== 200) {
              console.log(this.statusText);
              reject(new Error({status: this.status, statusText: "Not Implemented"}));
          }
          resolve({ data: this.response});
      };
      xhr.send();
      console.log(url);
      // setTimeout(() => reject({status: 501, statusText: "Not Implemented"}),0);
      // // On Success return:
      // resolve({data: getResponseObject});
  });
}

export default fetchModel;
