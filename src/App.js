import React,{useState,useEffect} from 'react';
import './App.css';
import { usePosition } from 'use-position';
import axios from 'axios';
function App() {
  
   const [weather,setWeatner]=useState();
  const { latitude,longitude } = usePosition();
  
  const getWeatherData=async (lat,lon)=>{

    const lang=navigator.language.split("-")[0];//türkce için

    const key=process.env.REACT_APP_WEATHER_DATA
   try {
     const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`)
     console.log(data);
     setWeatner(data);
   } catch{
     alert("veriler çekilemedi.")
   }

  }
  
  useEffect(()=>{
//lati ve longi değerleri var ise hava verisini getir.
    latitude && longitude && getWeatherData(latitude,longitude)

  },[latitude,longitude])
  return (
    <div className="App">
     <h2>Hava Durumu</h2>
     <h3>Enlem Koordinat:{latitude} </h3>
     <h3>Boylam Koordinat:{longitude} </h3>
     <h3>Koordinat Bölgesi:{weather.name} </h3>
     <h3>Hava Sıcaklığı:{Math.ceil(weather.main.temp-273.15)} C</h3>
     <h3>Durumu:{weather.weather.map(data=>data.main)}</h3>
     <h3>Özelliği:{weather.weather.map(data=>data.description)} </h3>



    </div>
  );
}

export default App;
