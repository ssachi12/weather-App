import React, { useState } from 'react'
import style from "./weather.module.css"
import ReactAnimateWeather from "react-animated-weather"
import axios from 'axios'
import ApiKey from './ApiKey'
function Forecast(props) {
   const[query,setQuery]=useState("")
   const[error,setError]=useState("")
   const[weather,setWeather]=useState("")
   const search=(city)=>{
   axios.get(
      `${ApiKey.base}weather?q=${
         city != "[object Object]" ? city : query
       }&units=metric&APPID=${ApiKey.key}`)
       .then((response)=>{
         setWeather(response.data);
         setQuery("");
       }).catch(function(error){
         console.log(error)
         setWeather("")
         setQuery("")
         setError({message:"Not found",query:query})
       })
       function checkTime(i){
         if(i<10){
            i="0"+i
         }
         return i;
       }
   }
   const defaults={
      color: '#fff',
      size:112,
      animate:true,
   }
  return (
    <div className={style.forecasthome}>
<div className={style.upper}>
     <div className={style.icon}>
        {/* weather icon */}
        <ReactAnimateWeather icon={props.icon}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
        />
     </div>
     <div className={style.weathername}>
           {/* HAZE */}
           <h3>{props.weather}</h3>
     </div>
     <div className={style.search}>
  <input type="text" placeholder='Search any city' value={query} onChange={(e)=>{setQuery(e.target.value)}}/>
  <button><i class="fa-solid fa-magnifying-glass" onClick={search}></i></button>
     </div>
 </div>
     <div className={style.lower}>
        <ul className={style.list}>
    {typeof weather.main != "undefined" ?(
      <div className={style.cont}>
      <li className={style.cityhead}>
      <p>
      {weather.name},{weather.sys.country}
      </p>
      {/* <img className='temp' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" /> */}
      </li>
      <li> 
         Temprature{" : "}
         <span>{
            Math.round(weather.main.temp)
            }°c({weather.weather[0].main})</span>
      </li>
      <li>
         Humidity{" : "}
         <span>
         {Math.round(weather.main.humidity)}%
         </span>
      </li>
      <li>
         Visibility{" : "}
         <span>
         {Math.round(weather.visibility)} mi
         </span>
      </li>
      <li>
         Wind speed{" : "}
         <span>
         {Math.round(weather.wind.speed)} Km/h  
         </span>
      </li>
    </div>
    ):(
      <li>
         {error.query}{error.message}
      </li>
    )}
        </ul>
     </div>
    </div>
  )
}

export default Forecast
