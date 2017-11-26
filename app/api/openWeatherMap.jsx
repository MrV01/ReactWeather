var axios = require('axios');

// Generate base URL
const OPEN_WEATHER_MAP_URL
= 'http://api.openweathermap.org/data/2.5/weather?appid=fdb9407308ed8e72f92e777c2583ba81&units=imperial'
;

//  Default API key :     fdb9407308ed8e72f92e777c2583ba81

module.exports = {
  getTemp: function (location)  {
      var encodedLocation=encodeURIComponent(location);
      // console.log(location, encodedLocation);
      var errorMessage = "Loaction Not Found or unknown...";
      var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
      // Call  Axios library. It returns Promise . And this function forwards it to the caller
      return axios.get(requestUrl).then( function (res) { // success
        // debugger;
        if(res.data.cod && res.message) { // error getting data
          if(res.message) { errorMessage = res.message;}
          throw new Error(errorMessage);
        } else {  // Got the temperatur
          return res.data.main.temp;
        }
      }, function(res) {  // failure
          // debugger;
          if(res.message) { errorMessage = res.message;}
          throw new Error(errorMessage);
      });
  }

}
