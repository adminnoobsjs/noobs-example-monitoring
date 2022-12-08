/**
 * @fileoverview The following file is used to test the use of the Shnakkydoodle framework
 * It can be used as a model of how to create a consuming application
 */
'use strict';
const noobscore = require('noobs-core');
const events = require('events');

var monitor = {};
monitor.events = new events.EventEmitter();
monitor.parameters = {};
monitor.noobs = noobscore(monitor);

monitor.models = {};
monitor.models.users = require('./models/users');
monitor.models.monitor = require('./models/monitors');
monitor.models.results = require('./models/results');

// Load the controllers
monitor.controllers = {};
monitor.controllers.users = require('./controllers/users/')(monitor);
monitor.controllers.monitor = require('./controllers/monitors/')(monitor);
monitor.controllers.results = require('./controllers/results/')(monitor);

// Load the API routes exposed by the Shnakkydoodle framework
monitor.routes = ((monitor.routes != null) ? monitor.routes : require('./routes')(monitor));

// Load the views routes exposed by the Shnakkydoodle framework
monitor.views = ((monitor.views != null) ? monitor.views : require('./views')(monitor));

/**
 * Initialise the server
 */
monitor.initialise = function () {

   // Add the event listener
   monitor.noobs.core.events.addListener('event', function (data) {
      noobs.core.services.logging.debug('Event: type: ' + data.type + ' message: ' + data.message);
   });

   // Indicate that the platform has started up
   monitor.noobs.core.services.caching.set('monitor-startup', Date());

   // Schedule the Shnakkydoodle heartbeat
   monitor.noobs.core.services.scheduling.schedule('monitor-core-hearbeat', '1 * * * * *', function () {
      monitor.noobs.core.services.logging.log('monitor heartbeat');
      monitor.noobs.core.services.caching.set('monitor-running', Date());
   });

   // Launch a test server
   monitor.noobs.core.services.interface.listen(process.env.PORT || monitor.noobs.core.configuration.get('server.port'), function (port) {
      monitor.noobs.core.services.logging.warn(monitor.noobs.core.configuration.get('application.name') + ': running on ' + port + ' in ' + process.cwd() + '\n');
   });

}();



