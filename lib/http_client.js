'use strict';
var http = require('q-io/http');
var https = require('https');
var Promise = require('bluebird');

/**
 * Class to act as http client for spark job server.
 *
 * @param {object} sjsConfig - Ex: {server: {string}, port: {int}, ssl: {bool}}
 */
var HttpClient = function(sjsConfig, log) {
  this.sjsConfig = sjsConfig;
  this.log = log;
};
var httpsAgent = new https.Agent({ rejectUnauthorized: false});

module.exports = HttpClient;

var headers = {};
if (HttpClient.sjsConfig && HttpClient.sjsConfig.username && HttpClient.sjsConfig.password) {
  headers = {
    "authorization" : 'Basic ' + new Buffer(HttpClient.sjsConfig.username + ':' + HttpClient.sjsConfig.password).toString('base64')
  };
}

HttpClient.prototype.httpGet = function(path) {
  this.log.debug('Executing http get route: ...[%s]', path.substr(path.length-5, 5));
  return http.request({
    host: this.sjsConfig.server,
    port: this.sjsConfig.port,
    ssl: this.sjsConfig.ssl,
    scheme: this.sjsConfig.ssl ? 'https' : 'http',
    agent: this.sjsConfig.ssl ? httpsAgent : undefined,
    path: path,
    method: 'GET',
    headers: headers
  }).then(prepResponse)
    .then(parseResponse);
};

HttpClient.prototype.httpPut = function(path, body, logMessage) {
  logMessage = typeof logMessage !== 'undefined' ? logMessage : '';
  this.log.debug('%s Executing http put: [%s] body: %s', logMessage, path, body);
  return http.request({
    host: this.sjsConfig.server,
    port: this.sjsConfig.port,
    ssl: this.sjsConfig.ssl,
    scheme: this.sjsConfig.ssl ? 'https' : 'http',
    agent: this.sjsConfig.ssl ? httpsAgent : undefined,
    path: path,
    method: 'PUT',
    body: [body],
    headers: headers
  }).then(prepResponse)
    .then(parseResponse);
};

HttpClient.prototype.httpPost = function(path, body, logMessage) {
  logMessage = typeof logMessage !== 'undefined' ? logMessage : '';
  this.log.debug('%s Executing http post: [%s] body: %s', logMessage, path, body);
  return http.request({
    host: this.sjsConfig.server,
    port: this.sjsConfig.port,
    ssl: this.sjsConfig.ssl,
    scheme: this.sjsConfig.ssl ? 'https' : 'http',
    agent: this.sjsConfig.ssl ? httpsAgent : undefined,
    path: path,
    method: 'POST',
    body: [body],
    headers: headers
  }).then(prepResponse)
    .then(parseResponse);
};

HttpClient.prototype.httpDelete = function(path) {
  this.log.debug('Executing http delete route: ...[%s]', path.substr(path.length-5, 5));
  return http.request({
    host: this.sjsConfig.server,
    port: this.sjsConfig.port,
    ssl: this.sjsConfig.ssl,
    scheme: this.sjsConfig.ssl ? 'https' : 'http',
    agent: this.sjsConfig.ssl ? httpsAgent : undefined,
    path: path,
    method: 'DELETE',
    headers: headers
  }).then(prepResponse)
    .then(parseResponse);
};

function prepResponse(response) {
  var key = response.path + ':' + getHash(response.body);
  var message = '[spark_jobserver_client] sparkJob response message: ' + key;
  return [response, message];
}

function parseResponse(response, profileMessage) {
  if (profileMessage) {
    HttpClient.log.profile('READ ' + profileMessage);
  }
  return response.body.read()
  .then(function(body) {
    if (profileMessage) {
      HttpClient.log.profile('READ ' + profileMessage);
    }
    //NOTE: eval is only used here because we trust the source (Spark-Jobserver)
    var resp = eval('(' + body.toString('utf-8') + ')'); // jshint ignore:line
    if (profileMessage) {
      HttpClient.log.profile('PARSE ' + profileMessage);
    }
    return resp;
  });
}

function getHash(s) {
  var hash = 0,
    i, char;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}