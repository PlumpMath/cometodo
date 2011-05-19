module.exports = function (response) {
  return function (err, contents) {
    if (err) {
      response.writeHead(500);
      response.write(err.toString());
      response.end();
      return;
    }
    response.writeHead(200);
    response.write(contents, response.fileEncoding);
    response.end();
  };
};
