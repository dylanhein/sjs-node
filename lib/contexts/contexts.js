'use strict';
var apiRoutes = require('./api_routes.js');

var Contexts = function(httpClient) {
  this.httpClient = httpClient;
};

module.exports = Contexts;

/**
 * Lists the running spark contexts.
 *
 * @returns {object} result
 */
Contexts.prototype.listContexts = function () {
  return this.httpClient.httpGet(apiRoutes.listContextsPath);
};

/**
 * Creates a new spark context with the properties in the given context object.
 *
 * @param {object} context - Ex: {numCpuCores: {int}, memoryPerNode: {string(Xmx Style)}, dependentJarUris: {string}}
 * @returns {object} result
 */
Contexts.prototype.createContext = function(context) {
  return this.httpClient.httpPost(apiRoutes.createContextPath(context));
};

/**
 * Deletes the spark context with the given context name.
 *
 * @param {string} contextName
 * @returns {object} result
 */
Contexts.prototype.deleteContext = function(contextName) {
  return this.httpClient.httpDelete(apiRoutes.deleteContextPath(contextName));
};

/**
 * Deletes all running spark contexts.
 *
 * @returns {object} result
 */
Contexts.prototype.deleteAllContexts = function() {
  return this.httpClient.httpPut(apiRoutes.deleteAllContextsPath);
};