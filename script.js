document.getElementById('location-btn').addEventListener('click', function() {
    var loadingMessage = document.getElementById('loading-message');
    var coordinates = document.getElementById('coordinates');
    var address = document.getElementById('address');
    
    loadingMessage.style.display = 'block';
    coordinates.innerText = '';
    address.innerText = '';
  
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      loadingMessage.style.display = 'none';
      coordinates.innerText = "Geolocation is not supported by this browser.";
    }
  
    function showPosition(position) {
      loadingMessage.style.display = 'none';
  
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      coordinates.innerText = "Latitude: " + lat + " | Longitude: " + lon;
  
      // Fetch address using a Geocoding API (like OpenCage, Google Maps API, etc.)
      var apiKey = 'YOUR_API_KEY'; // Replace with a valid API key for reverse geocoding
      var geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
  
      fetch(geocodeURL)
        .then(response => response.json())
        .then(data => {
          if (data && data.results && data.results.length > 0) {
            var locationDetails = data.results[0].formatted;
            address.innerText = "Your approximate address: " + locationDetails;
          } else {
            address.innerText = "Unable to retrieve address details.";
          }
        })
        .catch(error => {
          address.innerText = "Error fetching address: " + error;
        });
    }
  
    function showError(error) {
      loadingMessage.style.display = 'none';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          coordinates.innerText = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          coordinates.innerText = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          coordinates.innerText = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          coordinates.innerText = "An unknown error occurred.";
          break;
      }
    }
  });
  