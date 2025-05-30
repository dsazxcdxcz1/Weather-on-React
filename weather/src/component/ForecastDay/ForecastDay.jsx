import React from 'react';
import InfoForecastDay from "./InfoForecastDay/InfoForecastDay.jsx";
import './ForecastDay.css';

const ForecastDay = ({ weather, cloudy }) => {
    return (
        <div className="forecastDayContainer">
            {[0, 1, 2, 3].map((i) => {
                const dateObj = new Date();
                dateObj.setDate(dateObj.getDate() + i + 1); // +1, +2, +3, +4

                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');

                return (
                    <div className="forecastDay" key={i}>
                        <InfoForecastDay
                            forecastDay={i + 1}
                            weather={weather}
                            date={`${day}.${month}`}
                            cloudy={cloudy}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ForecastDay;
