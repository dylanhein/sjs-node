'use strict';

module.exports = {
  listJarsPath: listJarsPath,
  uploadJarPath: uploadJarPath
};

//GET /jars
function listJarsPath() {
  return '/jars';
}

//POST /jars/<appName>
function uploadJarPath(appName) {
  return '/jars/' + appName;
}