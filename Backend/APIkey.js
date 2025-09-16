const API_Key = "c35e1d0ef3824042a7285b3b829a4084";
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const DateNow = document.querySelector("#date");
const timeNow = document.querySelector("#time");
const cityName = document.querySelector("#city-name");
// const icon = document.querySelector("#weather-icon");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity-div");
const setThemeButton = document.querySelector("#switch-mode");
const body = document.body;
const theme = localStorage.getItem("theme");

if (theme === "dark-mode") {
    setTheme("dark-mode");
} else {
    setTheme("light-mode");
}
function setTheme(mode) {
    if (mode === "dark-mode") {
        body.classList.remove("light-mode");    
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light-mode");
    }
}

setThemeButton.addEventListener("click", () => {
    if (localStorage.getItem("theme") === "light-mode") {
        setTheme("dark-mode");
    } else {
        setTheme("light-mode");
    }
});

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keypress", EnterPressed);

function EnterPressed(event){
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}
function findWeatherDetails(){
    if (searchInput.value === "") {

    } else{
        const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + API_Key;
        httpRequestAsync(searchLink, theResponse);
    }
}
function updateTime() {
  DateNow.innerHTML = new Date().toLocaleDateString();
  timeNow.innerHTML = new Date().toLocaleTimeString();
}

setInterval(updateTime, 60000);

updateTime();

function theResponse(response){
    const jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    // icon.src = "https://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = Math.round(jsonObject.main.temp - 273.15) + "°C";
    humidity.innerHTML = "Humidity: " + jsonObject.main.humidity + "%";

}
function httpRequestAsync(url, callback){
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4 && httpRequest.status === 200){
            callback(httpRequest.responseText);
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
