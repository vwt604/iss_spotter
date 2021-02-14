const request = require('request-promise-native');


//Requests user's ip address from ipify.org and returns promise of request for ip data
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};



//Requests coordinates from freegeoip.com and returns promise of request for coordinates

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};


//Requests fly over times from open-notify.org and returns promise of request for times

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};



//Returns promise for flyover data for users location 

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


//Formats and prints pass times

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// //Exports functions
module.exports = { nextISSTimesForMyLocation, printPassTimes };