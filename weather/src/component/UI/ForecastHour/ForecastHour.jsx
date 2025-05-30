import React, {useEffect, useState} from 'react';
import style from "../../TimeWatcher/TimeWatcher.module.css";

const ForecastHour = ({ time, dayTime, imgSet, cloudy}) => {

    const [currentTemperature, setCurrentTemperature] = useState();
    const [currentHour, setCurrentHour] = useState(time);


    const [img, setImg] = useState();
    const [newDay, setNewDay] = useState(null);


    useEffect(() => {
        if (!imgSet) return;

        if (time >= 23) {
            setCurrentHour(time - 23);

            const chanceOfRain = imgSet.forecastday?.[1]?.hour?.[time]?.chance_of_rain ?? 0;
            const chanceOfSnow = imgSet.forecastday?.[1].hour?.[time]?.chance_of_snow ?? 0;


            if (chanceOfRain >= 40) {
                setImg('rain.png');
            } else if (time >= 20) {
                setImg('night.png');
            } else if(chanceOfSnow >= 1){
                setImg('snow.png')
            } else if (chanceOfRain === 0 || cloudy === 0) {
                setImg('sun.png');
            } else if (cloudy >= 1) {
                setImg('cloudy.png');
            }
        } else {
            setCurrentHour(time);

            const chanceOfRain = imgSet.forecastday?.[0].hour?.[time]?.chance_of_rain ?? 0;
            const chanceOfSnow = imgSet.forecastday?.[0].hour?.[time]?.chance_of_snow ?? 0;


            if (chanceOfRain >= 40) {
                setImg('rain.png');
            } else if(chanceOfSnow >= 1){
                setImg('snow.png')
            } else if (time >= 22) {
                setImg('night.png');
            } else if (chanceOfRain === 0 || cloudy === 0) {
                setImg('sun.png');
            }
            else if (cloudy >= 1) {
                setImg('cloudy.png');
            }
        }
    }, [time, imgSet, cloudy]);



    useEffect(() => {

        if (!dayTime || currentHour === undefined || !dayTime.forecastday?.[0]?.hour?.[currentHour]) {
            return;
        }

        async function TimeWatcher() {
            setCurrentTemperature(await dayTime.forecastday[0].hour[currentHour].temp_c);
        }

        async function WeatherWatcher() {
            const temp = dayTime.forecastday[1].hour[currentHour].temp_c;
            setNewDay(temp);
        }

        TimeWatcher();
        WeatherWatcher();
    }, [dayTime, currentHour]);


    return (
        <div className={style.timeItem}>
            <p className={style.time}>{currentHour}:00</p>
            <img src={`/img/${img}`} alt="cloudy" style={{width: '45px', height: '45px'}}/>
            {time >= 23 && newDay !== null ?
                <p style={{paddingTop: '10px'}}>{newDay}℃</p>
                :
                <p style={{paddingTop: '10px'}}>{currentTemperature}℃</p>
            }
        </div>
    );
};

export default ForecastHour;
