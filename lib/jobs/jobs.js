'use strict';
var apiRoutes = require('./api_routes.js');

var Jobs = function(httpClient) {
  this.httpClient = httpClient;
};

module.exports = Jobs;

/**
 * Lists all running spark jobs.
 *
 * @returns {object} jobs - Ex:
 *  [{
 *    "duration": "Job not done yet",
 *    "classPath": "com.organization.application.Example",
 *    "startTime": "2016-09-26T19:50:17.720Z",
 *    "context": "011a3001-com.organization.application.Example",
 *    "status": "RUNNING",
 *    "jobId": "5c88afd4-2fb8-4fbe-b516-8516edf59088"
 *  }, {
 *    "duration": "30.735 secs",
 *    "classPath": "com.organization.application.Example",
 *    "startTime": "2016-09-23T19:45:56.239Z",
 *    "context": "fcac2ba3-com.organization.application.Example",
 *    "status": "FINISHED",
 *    "jobId": "504261a6-38fa-48a4-9efe-20e62793ec98"
 *  }]
 */
Jobs.prototype.listJobs = function() {
  return this.httpClient.httpGet(apiRoutes.listJobsPath);
};

/**
 * Starts the given spark job with the given message body.
 *
 * @param {object} sparkJob - Ex: { appName: {string}, classPath: {string}}
 * @param {object} messageBody - The POST body
 * @returns {object} result
 */
Jobs.prototype.startJob = function(sparkJob, messageBody) {
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
 * @returns {object} jobConfig - This returns the exact config that was passed in when starting the job.
 */
Jobs.prototype.getJobConfig = function(jobId) {
  return this.httpClient.httpGet(apiRoutes.getJobConfigPath(jobId));
};