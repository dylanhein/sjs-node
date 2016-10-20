sjs-node
========

Description
-----------
A node.js wrapper of the spark-jobserver API.

Usage
-----

Add sjs-node as a dependency to your package.json:
```
"sjs-node": "git+ssh://git@github.com:dylanhein/sjs-node.git"
```

Import sjs-node to your js file where it will be consumed by requiring it:
```
var SjsClient = require('sjs-node');
```

Create a new instance of the sjs-node client by passing an object to it's constructor that contains
the properties 'server' (string), 'port' (int), and 'ssl' (bool) like so:

```
var sjsClient = new SjsClient({
  server: 'localhost',
  port: '8090',
  ssl: false
});
```

To use the client instance to communicate with the jobserver, call the function you wish to use.  Example:
```
var allJobs = sjsClient.jobs.listJobs();
```

API Reference
-------------

**Jobs**

```
/**
 * Lists all spark jobs.
 *
 * @returns {array} jobs
 */
listJobs()

/**
 * Starts the given spark job with the given message body.
 *
 * @param {object} sparkJob - Ex: { appName: {string}, classPath: {string}}
 * @param {object} messageBody - The POST body
 * @returns {object} result
 */
startJob(sparkJob, messageBody)

/**
 * Gets the current status of the spark job with the given job ID.
 *
 * @param {string} jobId - The spark job ID
 * @returns {object} jobStatus - Ex: { isComplete: {boolean}, percentComplete: {int}, isError: {boolean}, errorMessage: {string}}
 */
getJobStatus(jobId)

/**
 * Deletes the spark job with the given job ID.
 *
 * @param {string} jobId - The spark job ID
 * @returns {object} result
 */
deleteJob(jobId)

/**
 * Gets the configuration of the spark job with the given job ID.
 *
 * @param {string} jobId - The spark job ID
 * @returns {object} jobConfig - This returns the exact config that was passed in when starting the job.
 */
getJobConfig(jobId)
```

**Jars**

```
/**
 * Lists all jars submitted to the jobserver.
 *
 * @returns {array} jars
 */
listJars()

/**
 * TODO: Implement.
 */
uploadJar(jarPath, appName)
```

**Data**

```
/**
 * Lists the data files currently controlled by the job server.
 *
 * @returns {object} result
 */
listDataFiles()

/**
 * Uploads the file at the given path to the spark job server.  The job server stores the file in a
 * temp directory with a filename that is prefixed with the given prefix and a timestamp postfix for uniqueness.
 *
 * @param {string} fileName - The name of the file to be uploaded to the job server.
 * @param {string} filePath - The full file path of the file to be uploaded to the job server.
 * @param {string} prefix - A prefix to prepend to the jobserver generated file name.
 * @returns {string} serverFilePath - The full file path of the uploaded file in the job server's temp directory.
 */
uploadDataFile(fileName, filePath, prefix)

/**
 * Deletes the file with the given name from the job server's temp directory (only if the file is under control of the job server).
 *
 * @param {string} fileName - The fileName of the file in the job server's temp directory to be deleted.
 * @returns {object} result
 */
deleteDataFile(fileName)

```

**Contexts**

```
/**
 * Lists the running spark contexts.
 *
 * @returns {object} result
 */
listContexts()

/**
 * Creates a new spark context with the properties in the given context object.
 *
 * @param {object} context - Ex: {numCpuCores: {int}, memoryPerNode: {string(Xmx Style)}, dependentJarUris: {string}}
 * @returns {object} result
 */
createContext(context)

/**
 * Deletes the spark context with the given context name.
 *
 * @param {string} contextName
 * @returns {object} result
 */
deleteContext(contextName)

/**
 * Deletes all running spark contexts.
 *
 * @returns {object} result
 */
deleteAllContexts()
```