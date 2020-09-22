const button = document.querySelector(".submitbtn");
const inputValue = document.querySelector(".input-value");
const name = document.querySelector(".name");
const desc = document.querySelector(".desc");
const temp = document.querySelector(".temp");
const locationIcon = document.querySelector('#wicon');
const feels = document.querySelector(".feels");
const minMax = document.querySelector(".min-max");
const getApiResp =()=>{
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        inputValue.value +
        "&units=metric&appid=7195c5d4566a85c8f176c3d940ef05a5"
    )
    .then(response=>response.json())
    .then(data => {
        let nameValue = data.name;
        let tempValue = Math.round(data.main.temp);
        let descValue = data.weather[0].description;
        let iconCode = data.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        let feelsValue = Math.round(data.main.feels_like);
        let minValue = Math.round(data.main.temp_min);
        let maxValue = Math.round(data.main.temp_max);
        name.innerHTML = nameValue;
        temp.innerHTML = tempValue + " °C";
        desc.innerHTML = descValue;
        locationIcon.setAttribute('src', iconUrl);
        feels.innerHTML = "Feels like: " + feelsValue + " °C";
        minMax.innerHTML = "Temp. min: " +minValue + " °C, Temp. max: "+maxValue + " °C";
    })
    
    .catch(err => alert('You entered wrong city name!'))
};
button.addEventListener('click', getApiResp);


//let iconUrl = 'http://openweathermap.org/img/wn/'+'iconValue'+'@2x.png';