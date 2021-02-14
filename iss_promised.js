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

// //Exports functions
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

module.exports = { nextISSTimesForMyLocation };