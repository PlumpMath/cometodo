module.exports = function (request, callback) {
  var data = '';
  request.on('data', function (chunk) {
    data += chunk;
  })
  request.on('end', function () {
    callback(data);
  });
}