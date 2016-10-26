'use strict';
var http = require('q-io/http');
var https = require('https');
var Promise = require('bluebird');

/**
 * Class to act as http client for spark job server.
 *
 * @param {object} sjsConfig - Ex: {server: {string}, port: {int}, ssl: {bool}}
 */
var HttpClient = function(sjsConfig) {
  this.sjsConfig = sjsConfig;
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

HttpClient.prototype.httpPut = function(path, body) {
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

HttpClient.prototype.httpPost = function(path, body) {
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
  return response;
}

function parseResponse(response) {
  return response.body.read()
  .then(function(body) {
    var resp = body.toString('utf-8');
    //The jobserver returns a simple 'OK' string for some calls, which blows up the eval function, hence the below check
    if (resp === 'OK') {
      return resp;
    }
    //NOTE: eval is only used here because we trust the source (Spark-Jobserver)
    resp = eval('(' + body.toString('utf-8') + ')'); // jshint ignore:line
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