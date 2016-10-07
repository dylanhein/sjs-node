'use strict';
var apiRoutes = require('./api_routes.js');

var Jars = function(httpClient) {
  this.httpClient = httpClient;
};

module.exports = Jars;

Jars.prototype.listJars = function() {
  return this.httpClient.httpGet(apiRoutes.listJarsPath());
};

Jars.prototype.uploadJar = function(appName) {
  var path = apiRoutes.uploadJarPath(appName);
  //TODO: Implement
};