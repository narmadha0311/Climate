const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeather(city);
    } else {
        showError("Please enter a city name.");
    }
});

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                showError("City not found. Please try again.");
            }
        })
        .catch(() => showError("Unable to fetch data. Check your connection."));
}

function displayWeather(data) {
    document.getElementById("weatherResult").style.display = "block";
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("weatherDescription").textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    document.getElementById("weatherIcon").style.display = "block";

    document.getElementById("errorMessage").textContent = "";
}

function showError(message) {
    document.getElementById("errorMessage").textContent = message;
    document.getElementById("weatherResult").style.display = "none";
    }
