module.exports = function (url, response) {
  response.writeHead(302, {
    "Location": url
  });
  response.end();
};