import React, {useState, useEffect} from 'react'
import './App.css'
import axios from "axios";
import WeatherDetails from "./component/WatherDetalis/WeatherDetails.jsx";
import TimeWatcher from "./component/TimeWatcher/TimeWatcher.jsx";
import ForecastDay from "./component/ForecastDay/ForecastDay.jsx";

function App() {
    const [cityWeather,  setCityWeather] = useState('')

    const apiKey = "60a216ed0a8342d39ce100030252205"

    const [location, setLocation] = useState(null);

    const [cityInfo,  setCityInfo] = useState({});
    const [info,setInfo] = useState();
    const [sunrise,setSunrise] = useState();


    const [timeThisDay, setTimeThisDay] = useState();

    const [imgSet, setImgSet] = useState();
    const now = new Date();
    const hours = now.getHours();

    const [weather, setWeather] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
            }
        );

    }, []);

    useEffect(() => {
        if(!location || !info)return


        async function nameCity() {
            const cityName = axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`)

            const nameCity  = cityName ? (await cityName).data.address.city : null
            setCityInfo(
                {
                    name: nameCity,
                    temp_c:  info.temp_c + "℃",
                    cloudy: info.cloud,
                    feelsLike: info.feelslike_c + "℃",
                    pressure: (info.pressure_mb * 0.75006).toFixed(0),
                    humidity: info.humidity,
                    visibility: info.vis_km,
                    sunrise: sunrise,
                    gust: info.gust_kph,
                    windDirection: info.wind_dir,
                    windSpeed:(info.wind_kph / 3.6).toFixed(1),

                }
            )
        }
        nameCity()
    }, [location, info, sunrise]);

    useEffect(() => {
        if(!location) return

        async function locationGeo() {
                const geo = axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.lat},${location.lon}&days=5`)
                setInfo((await geo).data.current)
                setSunrise((await geo).data.forecast.forecastday[0].astro.sunrise)
                setTimeThisDay((await geo).data.forecast)
                setWeather((await geo).data)
                setImgSet((await  geo).data.forecast.forecastday[0].day)
        }
            locationGeo();
    }, [location]);
  return (
    <>
        <div className="backgraundImg">
            <img src="/img/sunRays.png" alt="Sun" className={'sun'}/>
            <img src="/img/cloudOne.png" alt="Cloud" className={'cloudOne'}/>
            <img src="/img/cloudTwo.png" alt="CloudTwo" className={'cloudTwo'}/>
        </div>
        <div className="inputContainer">
            <input type="text"
                   placeholder="Ведите название города"
                   value={cityWeather}
                   onChange={(e)=>{setCityWeather(e.target.value)}}
            />
            <button className="searchIconButton" >
                <img src="/img/search.png" alt="search" className="searchIconImg"/>
            </button>
        </div>
        {location ?(
            <>
                <WeatherDetails city={cityInfo}/>
                {info && imgSet && (
                    <TimeWatcher
                        time={hours}
                        dayTime={timeThisDay}
                        imgSet={imgSet}
                        cloudy={info.cloud}
                    />
                )}
                {info && weather && <ForecastDay weather={weather} cloudy={info.cloud}/>}
            </>
            )
            : (<h1 style={{textAlign: 'center', color: 'white'}}>Идет загрузка...</h1>)
        }
    </>
  )
}

export default App
