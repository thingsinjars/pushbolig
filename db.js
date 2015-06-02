var Datastore = require('nedb');
var path = require('path');

var db = new Datastore({
    filename: path.resolve(__dirname, 'db', 'message_store'),
    autoload: true
});

module.exports = {
    isInDB: function isInDB(thing, nope, yup, oops) {
        db.find(thing, function(err, docs) {
            if (err) {
                return oops("DB Error");
            }
            if (docs.length === 0) {
                return nope(thing);
            }
            return yup(thing);
        });
    },

    putInDB: function putInDB(thing, then) {
        db.insert(thing);
        then();
    }
};