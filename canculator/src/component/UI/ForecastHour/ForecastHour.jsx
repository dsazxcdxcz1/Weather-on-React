import React, {useEffect, useState} from 'react';
import style from "../../TimeWatcher/TimeWatcher.module.css";

const ForecastHour = ({ time, dayTime, imgSet, cloudy}) => {

    const [currentTemperature, setCurrentTemperature] = useState();
    const [currentHour, setCurrentHour] = useState(time);


    const [img, setImg] = useState();
    const [newDay, setNewDay] = useState(null);


    useEffect(() => {
        if(time >= 23){
            setCurrentHour(time - 23);
        } else {
            setCurrentHour(time);
        }
    }, [time]);




    useEffect(() => {
        if (!imgSet) return;

        if (imgSet.daily_chance_of_rain >= 1) {
            setImg('rain.png');
        } else if (time >= 20) {
            setImg('night.png');
        } else if (cloudy >= 1) {
            setImg('cloudy.png');
        } else if (imgSet.daily_chance_of_rain === 0 || cloudy === 0) {
            setImg('sun.png');
        }
    }, [imgSet, cloudy]);


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
