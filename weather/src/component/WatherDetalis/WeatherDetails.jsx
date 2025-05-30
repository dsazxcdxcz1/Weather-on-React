import React from 'react';
import style from './WatherDetalis.module.css';

const WeatherDetails = ({city}) => {
    return (
        <div className={style.mainContainer}>
            <div className={style.mainItem}>
                <div className={style.Pressure}>
                    <p>Давление</p>
                    <p>{city.pressure} мм рт.ст.</p>
                    <p>Ветер идет с: {city.windDirection} {city.windSpeed} м/с</p>
                </div>
                <div className={style.Humidity}>
                    <p>Влажность</p>
                    <p>{city.humidity}%</p>
                    <p>Порывы ветра до {city.gust} м/с</p>
                </div>
                <div className={style.Humidity}>
                    <p>Облачность </p>
                    <p>{city.cloudy}%</p>
                </div>
                <div className={style.Humidity}>
                    <p>Видимость</p>
                    <p>{city.visibility} км</p>
                    <p>Восход: {city.sunrise}</p>
                </div>
            </div>

            <div className={style.CityWeather}>
                <div className={style.CityContainer}>
                    <h1 className={style.City}>{city.name ? city.name : <p style={{textAlign: 'center'}}>Перезагрузите страницу</p>}</h1>
                    <h1 className={style.City}>{city.temp_c} </h1>
                    <h2 className={style.City}>Облачно: {city.cloudy}</h2>
                    <h2 className={style.City}>Ощущается как: {city.feelsLike}</h2>
                </div>

            </div>
        </div>
    );
};

export default WeatherDetails;
