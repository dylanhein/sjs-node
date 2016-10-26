'use strict';

module.exports = {
  listContextsPath: listContextsPath,
  createContextPath: createContextPath,
  deleteContextPath: deleteContextPath,
  deleteAllContextsPath: deleteAllContextsPath
};

//GET /contexts
function listContextsPath() {
  return '/contexts';
}

//POST /contexts/<name>
function createContextPath(context) {
  var path = '/contexts/' + context.name;
  if (typeof(context.numCpuCores) === undefined && typeof(context.memoryPerNode) === undefined && typeof(context.dependentJarUris) === undefined) return path;
  path = path + '?';
  if (context.numCpuCores) path = path + 'num-cpu-cores=' + context.numCpuCores + '&';
  if (context.memoryPerNode) path = path + 'memory-per-node=' + context.memoryPerNode + '&';
  if (context.dependentJarUris) path = path + 'dependent-jar-uris=' + context.dependentJarUris;
  if (path.substring(path.length - 1) === "&") path = path.substring(0, path.length - 1);
  return path;
}

//DELETE /contexts/<name>
function deleteContextPath(contextName) {
  return '/contexts/' + contextName;
}

//PUT /contexts?reload=reboot
function deleteAllContextsPath() {
  return '/contexts?reload=reboot';
}
