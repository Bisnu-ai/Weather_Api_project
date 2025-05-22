const textarea = document.querySelector("#textarea");
const btn = document.querySelector("#searchbtn");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity1");
const windspeed = document.querySelector("#windspeed");
const weatherimg = document.querySelector("#weather-img");
const description = document.querySelector("#description");
const weatherbody = document.querySelector("#weather-body");
const locationNotFound = document.querySelector("#location-notfound");

async function weather(city) {
    if (!city) {
        locationNotFound.style.display = "flex";
        weatherbody.style.display = "none";
        description.innerHTML = "Please enter a city name.";
        return;
    }
    const api_key = "85c6bf0510200cf30074a0c41794a32e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    try {
        const response = await fetch(url);
        const weatherdata = await response.json();
        console.log(weatherdata);

        if (weatherdata.cod == 404) {
            locationNotFound.style.display = "flex";
            weatherbody.style.display = "none";
            description.innerHTML = "City not found!";
            return;
        }

        locationNotFound.style.display = "none";
        weatherbody.style.display = "flex";
        temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}℃`;
        windspeed.innerHTML = `${weatherdata.wind.speed}Km/H`;
        humidity.innerHTML = `${weatherdata.main.humidity}%`;
        description.innerHTML = `${weatherdata.weather[0].description}`;

        switch (weatherdata.weather[0].main) {
            case 'Clouds':
                weatherimg.src = "asset/cloud.png";
                break;
            case 'Clear':
                weatherimg.src = "asset/clear.png";
                break;
            case 'Mist':
                weatherimg.src = "asset/mist.png";
                break;
            case 'Rain':
                weatherimg.src = "asset/rain.png";
                break;
            case 'Snow':
                weatherimg.src = "asset/snow.png";
                break;
            case 'Haze':
                weatherimg.src = "asset/haze.png";
                break;
            default:
                weatherimg.src = "";
        }
    } catch (error) {
        locationNotFound.style.display = "flex";
        weatherbody.style.display = "none";
        description.innerHTML = "Network error!";
        console.error(error);
    }
}

btn.addEventListener('click', () => {
    weather(textarea.value.trim());
});