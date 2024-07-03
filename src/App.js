
import './App.css';
import drizzleIcon from "./Assests/drizzle.jpg";
import clearIcon from "./Assests/clear.jpg";
import humidityIcon from "./Assests/humidity.png";
import rainIcon from "./Assests/rain.jpg";
import searchIcon from "./Assests/search.jpg";
import snowIcon from "./Assests/snow.avif";
import windIcon from "./Assests/wind.jpg"
import cloudIcon from "./Assests/cloud.jpg"
import { useEffect, useState } from 'react';


const WeatherDetails=({icon,temp,city,country,lat,long,humidity,wind})=>{
  return(
  <>
    <div className='image'>
      <img className='weather-image' src={icon} alt='image'/>
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
    <div>
      <span>latitude:</span>
      <span>{lat}</span>
    </div>
    <div>
      <span>longitude:</span>
      <span>{long}</span>
    </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} className='icon'></img>
        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windIcon} className='icon'></img>
        <div className='data'>
          <div className='wind-percent'>{wind}km/h</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
     

    </div>

  </>
  );
}

function App() {
  const [icon,setIcon]=useState(snowIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("CityName");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [long,setLong]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  let apikey=`8acb337b677899ea0f482fa93f43cbe6`;
  const[text,setText]=useState("Chennai");
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  };
  const search = async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      // console.log(data);
      if(data.cod==="404"){
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
      }
      else{
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setTemp(data.main.temp);
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLong(data.coord.lon);
        const weatherIconCode=data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearIcon);
        setCityNotFound(false);
      }
    }catch(error){
        console.error("An error occured:",error.message);
        setError("An error occured while fetching weather data")
    }
    finally{
setLoading(false);
    }
  }
  const handleCity=(e)=>{
    setText(e.target.value);
  }

  const handleKeyDown=(e)=>{
    if(e.key=="Enter"){
      search();
    }
  }
  useEffect(function(){
    search();
  },[]);
  return (
    <div className="container">
      <div className='input-container'>
        <input type='text' className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
        <div className='search-icon' onClick={()=>search()}>
          <img className='search-img' src={searchIcon} alt="Search"/>
        </div>
      </div>
     {!loading && !cityNotFound && !error && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind}/>}
    {loading && <div className='loading-message'>Loading... </div>}
     {error &&<div className='error-message'>{error}</div>}
    {cityNotFound && <div className='city-not-found'>city not found</div>}
     
      <p className='copyright'>
        Designed by <span>Ranjith</span>
      </p>
    </div>
  );
}

export default App;
