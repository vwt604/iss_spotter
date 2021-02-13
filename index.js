//require and run function from iss.js

//starter code - to require IP address and check for error
// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

const { fetchCoordsByIP } = require('./iss');

fetchCoordsByIP('162.245.144.188', (error, coord) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , coord);
});