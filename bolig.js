/**
 * Search the boligportal.dk API using the criteria
 * specified in config/search.json
 * 
 */
var requestLib = require("request");

function request(opts, callback) {
    var formData = {
        serviceName: "getProperties",
        data: JSON.stringify(opts)
    };

    requestLib.post({
        url: "http://www.boligportal.dk/api/soeg_leje_bolig.php",
        form: formData
    }, function(err, response, body) {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(body));
        }
    });
}

module.exports = {
	request: request
};