import axios from 'axios';
import { useEffect, useState } from 'react';
import ApiKey from './ApiKey';
import style from "./weather.module.css"
import Clock from "react-live-clock"
function YourLoc(props) {
    const[lat,setLat]=useState("")
    const[lon,setLon]=useState("")
    const[city,setCity]=useState("")
    const[tempC,setTempC]=useState("")
    const[humidity,setHumidity]=useState("")
    const[country,setCountry]=useState("")
    const[errorMsg,setErrorMsg]=useState("");
    const[icon,setIcon]=useState("")
    const[main,setMain]=useState([])
    const [weath,setWeath]=useState("")
    const dataBuilder=(d)=>{
        let months=[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        
        ];
        let days=[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        let day=days[d.getDay()];
        let date=d.getDate();
        let month=months[d.getMonth()]
        let year=d.getFullYear();
        
        return `${day},${date}${month}${year}`
        }

     let  getPosition=(options)=>{
      return new Promise(function (resolve,reject) {
         navigator.geolocation.getCurrentPosition(resolve,reject,options)
      })
     };
     const getWeather=(lat,lon)=>{
        axios.get(`${ApiKey.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${ApiKey.key}`).then((response)=>{
             console.log(response.data);
              setCity(response.data.name);
              setCountry(response.data.sys.country)
              setTempC(Math.floor(response.data.main.temp))
              setHumidity(response.data.main.humidity)
              setMain(response.data.weather[0].main)
              setWeath(response.data.main)
              console.log(city,country,tempC,humidity,main,icon,weath);
              switch(main){
                case "Haze":
                  setIcon("CLEAR_DAY");
                  break;
                case "Clouds":
                  setIcon("CLOUDY");
                  break;
                case "Rain":
                  setIcon("RAIN");
                  break;
                case "Snow":
                  setIcon("SNOW");
                  break;
                case "Dust":
                  setIcon("WIND");
                  break;
                case "Drizzle":
                  setIcon("SLEET");
                  break;
                case "Fog":
                  setIcon("FOG");
                  break;
                case "Smoke":
                  setIcon("FOG");
                  break;
                case "Tornado":
                  setIcon("WIND");
                  break;
                default:
                  setIcon("CLEAR_DAY");
              }
           })
      }
      
     useEffect(()=>{
        try{
            if(navigator.geolocation){
          getPosition()
          .then((position)=>{
            getWeather(position.coords.latitude,position.coords.longitude);
          })
            }else{
                getWeather(28.67, 77.22);
                alert("allow your location service to get weather report")
            }
        }
        catch(err){
          alert("error in fetching location")
        }
     },[])
    useEffect(() => {
      const data = {
        icon: icon,
        weather:main,
      };
      props.onDataUpdate(data);
    }, []);
    return (
        <div className={style.yourloc}>
          <div className={style.loc}>
            
            <div className={style.loccity}>
                    {/* your current location */}
                <h2>{city}</h2>
                <h3>{country}</h3>
            </div>
            <div className={style.emptybox}>
                      {/*  empty box for middle space*/}
            </div>
            <div className={style.loctime}>
                <div className={style.time}>
                     {/* your current time */}
                    <div className={style.ttime}> <Clock format='HH:mm:ss' interval={1000} ticking={true}></Clock></div>
                    <div className={style.date}>{dataBuilder(new Date())}</div>
                </div>
                <div className={style.temp}>
                       {/* your current temprzture */}
                       <p>
                         {tempC}°<span>C</span>
                       </p>
                </div>
            </div>
          </div>
        </div>
      )
 }
 


export default YourLoc
