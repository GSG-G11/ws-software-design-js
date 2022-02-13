/*
 * Exercise: Create some modules!
 *
 * When you think you have finished, run the command:
 *   npm run s2.modules
 * This will run a series of tests which should all pass.
 */
'use strict';

/*
 * Create a single module (using an IIFE) which contains functionality to parse
 * URLs.
 *
 * We have started you off with the basic structure.
 *
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */
let UrlParser = (function () {
  let urlRegEx = /^([a-z]+):\/\/([a-z\.]+)\/([^\?]+)\?(.+)$/i;

  function getMatch (string) {
    return string.match(urlRegEx);
  }

  function numberBasicStructure (n, array) {
    return (array || [])[n];
  }

  return {
    // a function that takes a URL and returns its protocol
    protocol: function (url) {
      return numberBasicStructure(1, getMatch(url));
    },

    // a function that takes a URL and returns its domain
    domain: function (url) {
      return numberBasicStructure(2, getMatch(url));
    },

    // a function that takes a URL and returns its path
    path: function (url) {
      return numberBasicStructure(3, getMatch(url));
    },

    // a function that takes a URL and returns its query string
    querystring: function (url) {
      return numberBasicStructure(4, getMatch(url));
    },
  };
})();


/*
 * Create a module that can support multiple instances (like in our example).
 * The module should be a function with several additional methods attached as
 * attributes.
 *
 * Example:
 * let exampleBuilder = createUrlBuilder('https://example.com');
 *
 * let url = exampleBuilder({ query: { foo: 1, bar: 2 }, path: 'hello' });
 *
 * console.log(url); // https://example.com/hello?foo=1&bar=2
 *
 * exampleBuilder.
 */

let createUrlBuilder = function (host) {

  function queryObjectToString (query) {
    return Object.keys(query)
      .map(function (key) {
        return key + '=' + query[key];
      })
      .join('&');
  }

  function appendPath (base, path) {
    return base + '/' + path;
  }

  function appendQueryString (base, query) {
    return base + '?' + queryObjectToString(query);
  }

  let builder = function (config) {
    let url = host;

    if (config.path) {
      url = appendPath(url, config.path);
    }

    if (config.query) {
      url = appendQueryString(url, config.query);
    }

    return url;
  };

  builder.path = function (path) {
    return appendPath(host, path);
  };

  builder.query = function (query) {
    return appendQueryString(host, query);
  };

  return builder;
};



module.exports = {
  UrlParser,
  createUrlBuilder,
};
