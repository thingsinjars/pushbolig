var searchOptions = require("./config/search.json");

var roomNumberMap = {
    1: 2,
    2: 3,
    3: 4,
    4: 9
};

function parseSearchOptions() {
    var defaultQuery = require("./defaults/search-default.json");
    if(searchOptions.rooms) {
        var minRooms = searchOptions.rooms.minimum || 1;
        var maxRooms = searchOptions.rooms.maximum || 9;
        if(maxRooms >= minRooms) {
            var roomArray = [];
            for(var i = minRooms, l=maxRooms; i<l; i++) {
                if(roomNumberMap[i] && roomArray.indexOf(roomNumberMap[i]) < 0) {
                    roomArray.push(roomNumberMap[i]);
                }
            }
            defaultQuery.boligTypeArr = roomArray;
        }
    }
    if(searchOptions.rent) {
        defaultQuery.huslejeMin = searchOptions.rent.minimum || 0;
        defaultQuery.huslejeMax = searchOptions.rent.maximum || 15000;
	}
    if(searchOptions.size) {
        defaultQuery.stoerrelseMin = searchOptions.size.minimum || 0;
        defaultQuery.stoerrelseMax = searchOptions.size.maximum || 0;
	}
    if(searchOptions.postcodes || searchOptions.zipcodes) {
        defaultQuery.postnrArr = searchOptions.postcodes || searchOptions.zipcodes;
	}
    if(searchOptions.furnished) {
    	defaultQuery.mobleret = 1;
    } else if(!searchOptions.furnished && typeof searchOptions.furnished === "boolean") {
    	defaultQuery.mobleret = 0;
    }
    if(searchOptions.length_of_rental) {
    	var period = [];
    	if(searchOptions.length_of_rental["2-12 months"]) {
    		period.push(1);
    	}
    	if(searchOptions.length_of_rental["1-2 years"]) {
    		period.push(2);
    	}
    	if(searchOptions.length_of_rental["2+ years"]) {
    		period.push(6);
    	}
    	if(searchOptions.length_of_rental.Unlimited) {
    		period.push(3);
    	}
    	if(searchOptions.length_of_rental.All) {
    		period = [4];
    	}
    	defaultQuery.lejeLaengdeArr = period;
    }

    return defaultQuery;
}

module.exports = {
	parse: parseSearchOptions
};