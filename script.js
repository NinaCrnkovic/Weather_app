class Weather {
  constructor(...params) {
    this.button = document.querySelector(params[0]);
    this.inputValue = document.querySelector(params[1]);
    this.name = document.querySelector(params[2]);
    this.desc = document.querySelector(params[3]);
    this.temp = document.querySelector(params[4]);
    this.locationIcon = document.querySelector(params[5]);
    this.feels = document.querySelector(params[6]);
    this.minMax = document.querySelector(params[7]);
  }

  getApiResp =(event)=>{
    if(this.inputValue.value.length === 0){
        window.alert('You did not enter a city');
       
    } else {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.inputValue.value}&units=metric&appid=7195c5d4566a85c8f176c3d940ef05a5`
          )
            .then(response => response.json())
            .then(data => {
              let nameValue = data.name;
              let tempValue = Math.round(data.main.temp);
              let descValue = data.weather[0].description;
              let iconCode = data.weather[0].icon;
              let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
              let feelsValue = Math.round(data.main.feels_like);
              let minValue = Math.round(data.main.temp_min);
              let maxValue = Math.round(data.main.temp_max);
              this.name.innerHTML = nameValue;
              this.temp.innerHTML = tempValue + " °C";
              this.desc.innerHTML = descValue;
              this.locationIcon.setAttribute("src", iconUrl);
              this.feels.innerHTML = "Feels like: " + feelsValue + " °C";
              this.minMax.innerHTML =
                "Temp. min: " + minValue + " °C, Temp. max: " + maxValue + " °C";
            })
        
            .catch((err) => alert("You entered wrong city name!"));
        }

    }


resetInput(){
    this.inputValue.value='';
    this.inputValue.focus();

}
pressEnter=(event)=>{
    if(event.keyCode === 13){
        this.getApiResp();
       
    }
    
}
getCordinates=(event)=>{
  let lon;
  let lat;
  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
          lon = position.coords.longitude;
          lat= position.coords.latitude;
          console.log(lon);
          console.log(lat);
          
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=7195c5d4566a85c8f176c3d940ef05a5`
          )
            .then(response => response.json())
            .then(data => {
              let nameValue = data.timezone;
              let tempValue = Math.round(data.current.temp);
              let descValue = data.current.weather[0].description;
              let iconCode = data.current.weather[0].icon;
              let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
              let feelsValue = Math.round(data.current.feels_like);
              let minValue = Math.round(data.daily[0].temp.min);
              let maxValue = Math.round(data.daily[0].temp.max);
              this.name.innerHTML = nameValue;
              this.temp.innerHTML = tempValue + " °C";
              this.desc.innerHTML = descValue;
              this.locationIcon.setAttribute("src", iconUrl);
              this.feels.innerHTML = "Feels like: " + feelsValue + " °C";
              this.minMax.innerHTML =
                "Temp. min: " + minValue + " °C, Temp. max: " + maxValue + " °C";
            })
        
            .catch((err) => alert("Yoe!"));
        
        })
  }
}


addListeners(){
    this.button.addEventListener('click', this.getApiResp);
    this.inputValue.addEventListener('keydown', this.pressEnter);
    window.addEventListener('load', this.getCordinates)
}

init(){
      this.addListeners();
}

}



  




(function () {
  "use strict";

  const weather = new Weather(
    ".submitbtn",
    ".input-value",
    ".name",
    ".desc",
    ".temp",
    "#wicon",
    ".feels", ".min-max");

  window.addEventListener("load", weather.init());
})();


