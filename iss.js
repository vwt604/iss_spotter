//contains most of the logic for fetching data from each API endpoints

const request = require("request");


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


/**
 * Makes a single API request to fetch the user's IP address.
 * Input:
 *   - takes in an IP address (string) and callback 
 * Returns (via Callback):
 *   - the latitude and longitude for it.
 *   - 
 */


const fetchCoordsByIP = function (ip, callback) {

  request("https://freegeoip.app/json/"), function (error, response, body) {
    
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
      const coord = JSON.parse(body); //grab ip
      callback(null, coord); 
      return;
    }
  } 
}

