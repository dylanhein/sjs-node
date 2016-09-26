'use strict';
var apiRoutes = require('./api_routes.js');

var Jobs = function(httpClient) {
  this.httpClient = httpClient;
};

module.exports = Jobs;

/**
 * Lists all running spark jobs.
 *
 * @returns {object} sparkJobs
 */
Jobs.prototype.listJobs = function() {
  return this.httpClient.httpGet(apiRoutes.listJobsPath);
};

/**
 * Starts the given spark job with the given message body.
 *
 * @param {object} sparkJob - Ex: { appName: {string}, classPath: {string}}
 * @param {object} messageBody - The POST body
 * @param {string} logMessage - An optional prefix to log messages
 * @returns {object} result
 */
Jobs.prototype.startJob = function(sparkJob, messageBody, logMessage) {
  var path = apiRoutes.startJobPath(sparkJob);
  var body = JSON.stringify(messageBody, null, 5);

  return this.httpClient.httpPost(path, body);
};

/**
 * Gets the current status of the spark job with the given job ID.
 *
 * @param {string} jobId - The spark job ID
 * @returns {object} jobStatus - Ex: { isComplete: {boolean}, percentComplete: {int}, isError: {boolean}, errorMessage: {string}}
 */
Jobs.prototype.getJobStatus = function(jobId) {
  return this.httpClient.httpGet(apiRoutes.getJobStatusPath(jobId));
};


/**
 * Deletes the spark job with the given job ID.
 *
 * @param {string} jobId - The spark job ID
 * @returns {object} result
 */
Jobs.prototype.deleteJob = function(jobId) {
  return this.httpClient.httpDelete(apiRoutes.deleteJobStatusPath(jobId));
};

/**
 * Gets the configuration of the spark job with the given job ID.
 *
 * @param {string} jobId - The spark job ID
 * @returns {object} jobConfig
 */
Jobs.prototype.getJobConfig = function(jobId) {
  return this.httpClient.httpGet(apiRoutes.getJobConfigPath(jobId));
};