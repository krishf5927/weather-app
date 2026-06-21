const getweather=document.querySelector(".i2");
const cityinput=document.querySelector(".i1");
const box2=document.querySelector(".box2");
const apikey="54b9b66f7b1844b5c90582eaee90178c";
getweather.addEventListener("click",async function(){
     const city=cityinput.value;
     if(city){
        try{
           const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
           const response=await fetch(apiurl);
           if(response.ok==false){
              throw new Error("Cannot fetch data");
           }
           const data=await response.json();
           console.log(data);
           let tempofcity=data.main.temp;
           tempofcity=(tempofcity-273.15);
           tempofcity=tempofcity.toFixed(1);
           let name=data.name;
           let humidity=data.main.humidity;
           let weatherofcity=data.weather[0].description;
           let weatherId=data.weather[0].id;
           box2.textContent="";
           box2.style.display="block";
           const citydisplay=document.createElement("h2");
           const tempdisplay=document.createElement("p");
           const humiditydisplay=document.createElement("p");
           const descofcity=document.createElement("p");
           const emojiforcity=document.createElement("p");
           let emoji=getemoji(weatherId);
           citydisplay.innerHTML=name;
           tempdisplay.innerHTML=`${tempofcity}°C`;
           humiditydisplay.innerHTML=`Humidity: ${humidity}%`;
           descofcity.innerHTML=weatherofcity;
           emojiforcity.innerHTML=emoji;
           citydisplay.classList.add("cityname");
           tempdisplay.classList.add("tempofcity");
           humiditydisplay.classList.add("humidityofcity");
           descofcity.classList.add("descofcity")
           emojiforcity.classList.add("emoji");
           box2.appendChild(citydisplay);
           box2.appendChild(tempdisplay);
           box2.appendChild(humiditydisplay);
           box2.appendChild(descofcity);
           box2.appendChild(emojiforcity);
        }
        catch(error){
           displayError(error);
        }
     }
     else{
        displayError("Please enter a city");
     }
});       

function displayError(message){
    const errordisplay=document.createElement("p");
    errordisplay.innerHTML=message;
    errordisplay.classList.add("errormessage");
    box2.textContent="";
    box2.style.display="block";
    box2.appendChild(errordisplay);
}

function getemoji(weatherId){
    switch(true){
       case (weatherId >=200 && weatherId <300):
          return "⛈️";
          break;
       case (weatherId >=300 && weatherId <400):
          return "🌧️";
          break;
       case (weatherId >=500 && weatherId <600):
          return "🌧️";
          break;
       case (weatherId >=600 && weatherId <700):
          return "❄️";
          break;
       case (weatherId >=700 && weatherId <800):
          return "🌫️";
          break;
       case (weatherId===800):
          return "☀️";
          break;
       case (weatherId>=801 && weatherId<810):
          return "☁️";
          break;
       default:
          return "?";
    }
}