
// Define a function to initialize the DOM element references
function initializeElements() {
    const cityName = document.getElementById('city-name');
    const weatherType = document.getElementById('weather-type');
    const temp = document.getElementById('temp');
    const minTemp = document.getElementById('min-temp');
    const maxTemp = document.getElementById('max-temp');

    // Return the references or store them globally for later use
    return { cityName, weatherType, temp, minTemp, maxTemp };
}



//Fetch weather api
async function fetchWeather(city) {
    const url = `https://open-weather13.p.rapidapi.com/city/${city}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f3d74146aemshe1f27029ad3d7cap1a1e9ejsn166183d54323',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  //fetchWeather(cityInput.value.then(value => console.log(value)));

  const showWeatherData  = (value,cityInput) => 
  {
    const { cityName, weatherType, temp, minTemp, maxTemp } = initializeElements();
    cityName.innerHTML = "----";
    weatherType.innerHTML = "----";
    temp.innerHTML = "--";
    minTemp.innerHTML = "--";
    maxTemp.innerHTML = "--";

    //parse it to JSON
    const data = JSON.parse(value);
    
    // Setting values in the fields
    if (data.message != "city not found")
    {
        console.log(data.message);
        cityName.innerHTML = cityInput.value;
        weatherType.innerHTML = data.weather[0].main;
        temp.innerHTML = data.main.temp;
        minTemp.innerHTML = data.main.temp_min;
        maxTemp.innerHTML  = data.main.temp_max;
    }
    else
    {
        cityName.innerHTML = data.message;
    }

  }

  const searchCity = () =>
  {

        const cityInput = document.getElementById('city-input');
        fetchWeather(cityInput.value).then(response => response.text()).then(value => {
            showWeatherData(value , cityInput);
        })
  }

  searchCity();


  

