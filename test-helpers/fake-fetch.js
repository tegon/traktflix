import fakeFetch from 'fake-fetch';

fakeFetch.withArgs = function (url) {
  return {
    respondWith: function (data, options) {
      return window.fetch.withArgs(url).returns(Promise.resolve(new Response(data, options)));
    },
  };
};

export default fakeFetch;