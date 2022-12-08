/**
 * @fileoverview The following file is used to test the use of the Shnakkydoodle framework
 * It can be used as a model of how to create a consuming application
 */
 'use strict';
 const noobscore = require('noobs-core');
 const events = require('events');

 
 var application = {};
 application.events = new events.EventEmitter();
 application.parameters = {};
 
 // Instantiate the Shnakkydoodle Framework
 var noobs = noobscore(application);
 
 /**
  * Initialise the server
  */
  application.initialise = function () {

     // Add the event listener
     noobs.core.events.addListener('event', function (data) {
        noobs.core.services.logging.debug('Event: type: ' + data.type + ' message: ' + data.message);
     });
 
     // Indicate that the platform has started up
     noobs.core.services.caching.set('noobs-startup', Date());
 
     // Schedule the Shnakkydoodle heartbeat
     noobs.core.services.scheduling.schedule('noobs-core-hearbeat', '1 * * * * *', function () {
        noobs.core.services.logging.log('noobs core heartbeat');
        noobs.core.services.caching.set('noobs-core-running', Date());
     });
 
     // Launch a test server
     noobs.core.services.interface.listen(process.env.PORT || noobs.core.configuration.get('server.port'), function (port) {
        noobs.core.services.logging.warn(noobs.core.configuration.get('application.name') + ': running on ' + port + ' in ' + process.cwd() + '\n');
     });
 
 }();

 
 
 