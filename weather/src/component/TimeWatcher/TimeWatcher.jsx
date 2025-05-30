import React from 'react';
import style from './TimeWatcher.module.css'
import ForecastHour from "../UI/ForecastHour/ForecastHour.jsx";


const TimeWatcher = ({time, dayTime, imgSet, cloudy}) => {
    const leftArrow = '<<'
    const rightArrow = '>>'



    return (
        <div className={style.timeContainer}>
            <h1
                style={{
                    marginRight: '1vw',
                    cursor: 'pointer'}
            }>
                {leftArrow}
            </h1>
            <div className={style.timeNavigation}>
               <ForecastHour  temperature={time} time={time} dayTime={dayTime} imgSet={imgSet} cloudy={cloudy} />
               <ForecastHour  time={time + 2}  dayTime={dayTime}  imgSet={imgSet} cloudy={cloudy} />
               <ForecastHour  time={time + 4}  dayTime={dayTime}  imgSet={imgSet} cloudy={cloudy} />
               <ForecastHour  time={time + 6}  dayTime={dayTime}  imgSet={imgSet} cloudy={cloudy} />
               <ForecastHour  time={time + 8}  dayTime={dayTime}  imgSet={imgSet} cloudy={cloudy} />
               <ForecastHour  time={time + 10}  dayTime={dayTime} imgSet={imgSet} cloudy={cloudy} />
            </div>

            <h1
                style={{
                    marginLeft: '1vw',
                    cursor: 'pointer'}
            }>
                {rightArrow}
            </h1>
        </div>
    );
};

export default TimeWatcher;
