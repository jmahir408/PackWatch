require("dotenv").config();
const shippo_key = process.env.SHIPPO_KEY;
const shippo = require('shippo')(shippo_key);

// example Tracking object for tracking a shipment
shippo.track.get_status('usps', '9102969010383081813033')
.then(function(status) {
	console.log("Tracking info: %s", JSON.stringify(status, null, 4));
}).catch(function(err) {
	console.log("There was an error retrieving tracking information: %s", err);
});
