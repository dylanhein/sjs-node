'use strict';

module.exports = {
  listDataFilesPath: listDataFilesPath,
  uploadDataFilePath: uploadDataFilePath,
  deleteDataFilePath: deleteDataFilePath
};

//GET /data
function listDataFilesPath() {
  return '/data';
}

//POST /data/<filename>
function uploadDataFilePath(prefix) {
  return '/data/' + prefix;
}

//DELETE /data/<filename>
function deleteDataFilePath(fileName) {
  return '/data/' + fileName;
}