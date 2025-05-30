import React, {useEffect, useState} from 'react';
import '../ForecastDay.css'
const InfoForecastDay = ({weather, forecastDay, date, cloudy}) => {

    const [tomorrowWeather,  setTomorrowWeather] = useState(weather);

    const [dayTime,  setDayTime] = useState();

    const [night, setNight] = useState();

    const [imgSet, setImgSet] = useState();

    useEffect(()=>{
        if (!weather || !forecastDay ) {
            return;
        }
        setTomorrowWeather(weather.forecast.forecastday[forecastDay])
    }, [ weather, forecastDay])

    useEffect(() => {
        if (!tomorrowWeather || !tomorrowWeather.day) return;

        setDayTime(tomorrowWeather.day.avgtemp_c);
        setNight(tomorrowWeather.day.mintemp_c);
    }, [tomorrowWeather]);

    useEffect(() => {
        if (!weather || !tomorrowWeather || !tomorrowWeather.day) return;

        if (tomorrowWeather.day.daily_chance_of_rain >= 1) {
            setImgSet('rain.png');
        } else if (cloudy >= 1) {
            setImgSet('cloudy.png');
        } else if (tomorrowWeather.day.daily_chance_of_rain === 0 || cloudy === 0) {
            setImgSet('sun.png');
        }
    }, [tomorrowWeather, cloudy])



    return (
        <div  className={"infoForecastDayContainer"}>
            <p>Ночь: {night}℃</p>
            <h4>День:</h4>
            <img src={`/img/${imgSet}`} alt="cloudy" style={{ width: "55px", height: "55px" }} />
            <h4>{dayTime}℃</h4>
            <h4>{date}</h4>
        </div>
    );
};

export default InfoForecastDay;
