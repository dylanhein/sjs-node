'use strict';
var Contexts = require('./lib/contexts/contexts.js');
var Data = require('./lib/data/data.js');
var Jars = require('./lib/jars/jars.js');
var Jobs = require('./lib/jobs/jobs.js');
var HttpClient = require('./lib/http_client.js');

var SjsClient = function(sjsConfig) {
  this.sjsConfig = sjsConfig;
  this.httpClient = new HttpClient(sjsConfig);
  this.contexts = new Contexts(this.httpClient);
  this.data = new Data(this.httpClient);
  this.jars = new Jars(this.httpClient);
  this.jobs = new Jobs(this.httpClient);
};

module.exports = SjsClient;