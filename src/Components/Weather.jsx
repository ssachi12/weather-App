import React,{useState} from 'react'
import style from "./weather.module.css"
import YourLoc from './YourLoc'
import Forecast from './Forecast'
function Weather() {
  const [receivedData, setReceivedData] = useState('');

  const handleDataUpdate = (data) => {
    setReceivedData(data);
  };
  return (
    <section>
       <div className={style.body}>
       <div className={style.home}>
            {/* weather section */}
            <div className={style.weather}>
            <YourLoc onDataUpdate={handleDataUpdate}></YourLoc>
            </div>
            {/* forcast section */}
            <div className={style.forecast}>
             <Forecast icon={receivedData.icon} weather={receivedData.weather}></Forecast>
            </div>
        </div>
       </div>
       <div className={style.footer}>
       <div className={style.footercontent}>
       <a href="https://github.com/ssachi12/weather-App">
         Download Source Code
        </a>{" "}
        | Developed By{" "}
        <a href="">
        Sachin Naik
        </a>{" "}
        | Powered by{" "}
        <a href="">
        HTML HINTS
        </a>
       </div>
       </div>
    </section>
  )
}

export default Weather
