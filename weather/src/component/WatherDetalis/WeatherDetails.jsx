import React from 'react';
import style from './WatherDetalis.module.css';

const WeatherDetails = ({city}) => {
    return (
        <div className={style.mainContainer}>
            <div className={style.mainItem}>
                <div className={style.Pressure}>
                    <p>Pressure</p>
                    <p>{city.pressure} mm Hg</p>
                    <p>The wind is coming from: {city.windDirection} {city.windSpeed} m/s</p>
                </div>
                <div className={style.Humidity}>
                    <p>Humidity</p>
                    <p>{city.humidity}%</p>
                    <p>Wind gusts up to {city.gust} м/с</p>
                </div>
                <div className={style.Humidity}>
                    <p>Cloudiness </p>
                    <p>{city.cloudy}%</p>
                </div>
                <div className={style.Humidity}>
                    <p>Visibility</p>
                    <p>{city.visibility} km</p>
                    <p>Sunrise: {city.sunrise}</p>
                </div>
            </div>

            <div className={style.CityWeather}>
                <div className={style.CityContainer}>
                    <h1 className={style.City}>{city.name ? city.name : <p style={{textAlign: 'center'}}>Restart page</p>}</h1>
                    <h1 className={style.City}>{city.temp_c} </h1>
                    <h2 className={style.City}>Cloudy: {city.cloudy}</h2>
                    <h2 className={style.City}>Feels like: {city.feelsLike}</h2>
                </div>

            </div>
        </div>
    );
};

export default WeatherDetails;
