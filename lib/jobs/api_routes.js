'use strict';

module.exports = {
  listJobsPath: listJobsPath,
  startJobPath: startJobPath,
  getJobStatusPath: getJobStatusPath,
  deleteJobPath: deleteJobPath,
  getJobConfigPath: getJobConfigPath
};

//GET /jobs
function listJobsPath() {
  return '/jobs';
}

//POST /jobs
function startJobPath(sparkJob) {
  var path = '/jobs?appName=' + sparkJob.appName + '&classPath=' + sparkJob.classPath;
  if (sparkJob.context) path = path + '&' + sparkJob.context;
  if (sparkJob.sync) path = path + '&' + sparkJob.sync.toString;
  return path;
}

//GET /jobs/<jobId>
function getJobStatusPath(jobId) {
  return '/jobs/' + jobId;
}

//DELETE /jobs/<jobId>
function deleteJobPath(jobId) {
  return '/jobs/' + jobId;
}

//GET /jobs/<jobId>/config
function getJobConfigPath(jobId) {
  return '/jobs/' + jobId + '/config';
}