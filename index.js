var db = require("./db");           //Local store to track what has been seen
var push = require("./push")(db);   //Pushbullet library

var parser = require("./parser");   //Parses config/search.json into valid options
var bolig = require("./bolig");     //Makes the API request

function getThingToSend() {
    var opts = parser.parse();

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
            oops("No Properties");
        }
        results.properties.forEach(function(property) {
            var thingToSend = {
                type: "link",
                title: property.jqt_headline,
                body: "http://www.boligportal.dk" + property.jqt_adUrl
            };
            // console.log("Found: " + thingToSend.title + " (" + thingToSend.body + ")");
            db.isInDB(thingToSend, push.sendThis, alreadySentThis, oops);
        });
    });

}

console.log("Searching (" + new Date() + ")");
getThingToSend();
