/**
 * Sends the provided message to a set of specified 
 * device types and email addresses.
 *
 * Uses Keyring to store the Access Token.
 *
 * Do this to save your token:
 * node_modules/.bin/keyring store -k pushbullet.accessToken -v YOUR_ACCESS_TOKEN
 *
 */
var PushBullet = require('pushbullet');
var keyring = require('keyring');
var keyringApi = keyring.instance().load();

var pusher = new PushBullet(keyringApi.retrieve('pushbullet.accessToken'));

var typesToSendTo = require("./config/types_to_send_to.json");
var additionalToSendTo = require("./config/emails.json");

module.exports = function(db) {
    return {
        sendThis: function sendThis(thingToSend) {
            pusher.devices(function(error, response) {
                // console.log(JSON.stringify(response, null, 4));
                var destinations = [];
                response.devices.forEach(function(device) {
                    if (typesToSendTo.indexOf(device.type) > -1) {
                        destinations.push(device.iden);
                    }
                });
                destinations = destinations.concat(additionalToSendTo);

                destinations.forEach(function(destination) {
                    pusher[thingToSend.type](destination, thingToSend.title, thingToSend.body, function(error, response) {
                        if (response.active) {
                            db.putInDB(thingToSend, function() {
                                console.log("Sent: ", thingToSend);
                            });
                        }
                    });
                });
            });
        }
    };
};
