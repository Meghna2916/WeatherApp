import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";
import {FaSearchLocation} from 'react-icons/fa';
import {FaMapPin} from 'react-icons/fa';
import {FaLocationArrow} from 'react-icons/fa';

const Tempp = () => {
  const [searchValue, setSearchValue] = useState("chandigarh");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=d4564fc4e02b050ef7f0dbfe18a92b00`;
      

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
    <div className="container">
      <div className="wrap">
        <div className="search">
          <div className="locationPin"><FaLocationArrow/></div>
          <input
            type="text"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            <FaSearchLocation/>
          </button>
          
        </div>
      </div>
      </div>
      {/* our temp card  */}
      <Weathercard tempInfo={tempInfo} />
      
    </>
  );

};

export default Tempp;