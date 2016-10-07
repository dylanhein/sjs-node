'use strict';
var Promise = require('bluebird');
var fs = require('fs');
var apiRoutes = require('./api_routes.js');

var Data = function(httpClient) {
  this.httpClient = httpClient;
};

module.exports = Data;

/**
 * Lists the data files currently controlled by the job server.
 *
 * @returns {object} result
 */
Data.prototype.listDataFiles = function() {
  return this.httpClient.httpGet(apiRoutes.listDataFilesPath());
};

/**
 * Uploads the file at the given path to the spark job server.  The job server stores the file in a
 * temp directory with a filename that is prefixed with the given prefix and a timestamp postfix for uniqueness.
 *
 * @param {string} fileName - The name of the file to be uploaded to the job server.
 * @param {string} filePath - The full file path of the file to be uploaded to the job server.
 * @param {string} prefix - A prefix to prepend to the jobserver generated file name.
 * @returns {string} serverFilePath - The full file path of the uploaded file in the job server's temp directory.
 */
Data.prototype.uploadDataFile = function(fileName, filePath, prefix) {
  var path = apiRoutes.uploadDataFilePath(prefix);

  return getUploadDataFileBody(fileName, filePath)
    .then(function(body) {
      return this.httpClient.httpPost(path, body);
    });
};

/**
 * Deletes the file with the given name from the job server's temp directory (only if the file is under control of the job server).
 *
 * @param {string} fileName - The fileName of the file in the job server's temp directory to be deleted.
 * @returns {object} result
 */
Data.prototype.deleteDataFile = function(fileName) {
  var path = apiRoutes.deleteDataFilePath(fileName);

  return this.httpClient.httpDelete(path);
};

function getUploadDataFileBody(fileName, filePath) {
  return getDataFile(filePath)
    .then(function(fileData) {
      return fileData;
    });
}

function getDataFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}