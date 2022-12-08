var events = require('events');

console.log(process.cwd());

// Initialise the parameters
var parameters = {}

// Initialise shnakkydoodle
var pingadoodle = {};
pingadoodle.parameters = {}
pingadoodle.shnakkydoodle = require('shnakkydoodle')(pingadoodle);

// Load the models
pingadoodle.models = {};
pingadoodle.models.users = require('./models/users'); 
pingadoodle.models.monitor = require('./models/monitors'); 
//pingadoodle.models.results = require('./models/results'); 

// Load the controllers
pingadoodle.controllers = {};
pingadoodle.controllers.users = require('./controllers/users/')(parameters); 
pingadoodle.controllers.monitor = require('./controllers/monitors/')(parameters); 
pingadoodle.controllers.results = require('./controllers/results/')(parameters); 

// Load the API routes exposed by the Shnakkydoodle framework
pingadoodle.routes = ((pingadoodle.routes != null) ? pingadoodle.routes : require('./routes')(pingadoodle));

// Load the views routes exposed by the Shnakkydoodle framework
pingadoodle.views = ((pingadoodle.views != null) ? pingadoodle.views :  require('./views')(pingadoodle));


// Schedule a heart beat
pingadoodle.shnakkydoodle.services.scheduling.schedule('Hearbeat', '1 * * * * *', function () {
    pingadoodle.shnakkydoodle.services.logging.log(pingadoodle.shnakkydoodle.services.configuration.get('application.name') + ' heartbeat')
});

// Launch a test server
pingadoodle.shnakkydoodle.services.interface.listen(process.env.PORT || pingadoodle.shnakkydoodle.services.configuration.get('server.port'), function (port) {
    pingadoodle.shnakkydoodle.services.logging.log(pingadoodle.shnakkydoodle.services.configuration.get('application.name') + ' running on ' + port + ' in ' + process.cwd());
});
