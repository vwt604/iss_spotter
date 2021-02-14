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


const fetchCoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    
    if (error) {
      console.log('Bad request');
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates Response: ${body}`;
      return msg;
    }
      
    const { latitude, longitude } = JSON.parse(body);  // ???
    callback(null, { latitude, longitude });
    
  });
};

module.exports = { fetchCoordsByIP };



/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
    
    if (error) {
      console.log('Bad request');
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching ISS Response: ${body}`;
      return msg;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  
  });

};

module.exports = { fetchISSFlyOverTimes };

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coord, (error, times) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, times);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation };