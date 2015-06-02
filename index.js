var db = require("./db");           //Local store to track what has been seen
var push = require("./push")(db);   //Pushbullet library

var searchOptions = require("./config/search.json");
var parser = require("./parser");   //Parses config/search.json into valid options
var bolig = require("./bolig");     //Makes the API request

function getThingToSend() {
    var opts = parser.parse(searchOptions);

    var alreadySentThis = function() {
        // console.log("already sent.");
    };

    var oops = function(mistake) {
        console.error(mistake);
    };

    bolig.request(opts, function(err, results) {
        if (err) {
            return oops(err);
        }
        if (!results.properties) {
            oops("Bad API response");
        }
        results.properties.forEach(function(property) {
            if(searchOptions.rent.maximum) {
                // The API treats any maximum over 14,000 as "no maximum".
                // manually remove anything over the maximum price
                var actualRent = parseInt(property.jqt_economy.rent.replace(/[^0-9]/,''), 10);
                if(actualRent > searchOptions.rent.maximum) {
                    // console.log("removing: " + property.jqt_headline + " ("+property.jqt_economy.rent+")")
                    return;
                }
            }
            var thingToSend = {
                type: "link",
                title: property.jqt_headline,
                body: "http://www.boligportal.dk" + property.jqt_adUrl
            };
            db.isInDB(thingToSend, push.sendThis, alreadySentThis, oops);
        });
    });

}

console.log("Searching (" + new Date() + ")");
getThingToSend();