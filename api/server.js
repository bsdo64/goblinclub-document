/**
 * Created by dobyeongsu on 2015. 11. 15..
 */
var static = require('node-static');

var fileServer = new static.Server(__dirname + '/build');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(3004);