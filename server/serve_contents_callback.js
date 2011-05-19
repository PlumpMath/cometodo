module.exports = function (response, headers) {
  return function (err, file) {
    if (err) {
      response.writeHead(500);
      response.write(err.toString());
      response.end();
      return;
    }
    response.writeHead(200, headers || {});
    response.write(file, 'binary');
    response.end();
  };
};
