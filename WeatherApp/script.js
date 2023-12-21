const apiKey = '998734dcc0ea00bcbe01d010eda4dda8';
const weatherInfo = document.getElementById('weatherInfo');

function getWeather() {
    const locationInput = document.getElementById('locationInput').value;

    if (locationInput) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = 'Error fetching weather data. Please try again.';
            });
    } else {
        weatherInfo.innerHTML = 'Please enter a location.';
    }
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;

    const weatherHtml = `
        <h2>${city}, ${country}</h2>
        <p>${description}</p>
        <p>Temperature: ${temperature}°C</p>
    `;

    weatherInfo.innerHTML = weatherHtml;
}
