//contains most of the logic for fetching data from each API endpoints

const request = require("request");

/**
 * Makes a single API request to fetch the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", function(error, response, body) {
    
    if (error) {
      console.log('Bad request');
      callback(error, null);
      return;
    }

    let data = JSON.parse(body);
    if (data.length < 1) {
      callback(null, "IP address not found :(");
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const ip = JSON.parse(body).ip; //grab ip
      callback(null, ip); 
      return;
    }
  });
};

module.exports = { fetchMyIP };

