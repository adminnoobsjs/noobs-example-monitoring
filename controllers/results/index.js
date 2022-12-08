'use strict';
const events = require('events');
const express = require('express');

/**
 * File Manager class
 */
module.exports = function (parameters) {

    /** local parameters */
    var parameters = (parameters != null ? parameters : {})

    /** Initiate the object */
    var _serviceManager = {};
    _serviceManager.events = new events.EventEmitter();

    /**
     * Load the API endpoints of the service
     * @param {object} app
    */
    _serviceManager.registerAPIs = function (app) {
        app.use(express.json())
        app.route('/application/controllers/results').post(function (req, res) {
            res.sendStatus(200);
        });
        app.route('/application/controllers/results').get(function (req, res) {
            res.status(200);
            res.send('Pong');
        });
    }

    return _serviceManager;
};
