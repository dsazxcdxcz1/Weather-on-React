import React, {useState, useEffect} from 'react'
import './App.css'
import axios from "axios";
import WeatherDetails from "./component/WatherDetalis/WeatherDetails.jsx";
import TimeWatcher from "./component/TimeWatcher/TimeWatcher.jsx";
import ForecastDay from "./component/ForecastDay/ForecastDay.jsx";

function App() {

    const apiKey = "1e97e996c1714a7888e183114250506"

    const [location, setLocation] = useState(null);

    const [cityInfo,  setCityInfo] = useState({});
    const [info,setInfo] = useState();
    const [sunrise,setSunrise] = useState();


    const [timeThisDay, setTimeThisDay] = useState();

    const [imgSet, setImgSet] = useState();
    const now = new Date();
    const hours = now.getHours();

    const [weather, setWeather] = useState();


    const [inputValue, setInputValue] = useState('');
    const [geo, setGeo] = useState(null);


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
        if (!location) return
         async function searchGeo(){
            try{
                if(inputValue === ''){
                    const responseGeo  = axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.lat},${location.lon}&days=7`)
                    setGeo(responseGeo)
                    console.log(responseGeo)
                } else{
                    setTimeout(() => {
                        const searchGeo = axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputValue}&days=7`)
                        setGeo(searchGeo)
                    }, 500)
                }
            } catch (error) {
                if (error.response || error.response.status === 400) {
                    console.debug('не верное название города!', error)
                }

            }
        }
        searchGeo()
    }, [inputValue, location]);


    useEffect(() => {
        if(!location || !info || !geo )return


             function nameCity() {
            const nameCity  = weather.location.name
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
    }, [location, info, sunrise, geo, weather]);

    useEffect(() => {
        if(!location || !geo) return

        async function locationGeo() {
                setInfo((await geo).data.current)
                setSunrise((await geo).data.forecast.forecastday[0].astro.sunrise)
                setTimeThisDay((await geo).data.forecast)
                setWeather((await geo).data)
                setImgSet((await  geo).data.forecast)
        }
            locationGeo();
    }, [location, geo]);
  return (
    <>
        <div className="backgraundImg">
            <img src="/img/sunRays.png" alt="Sun" className={'sun'}/>
            <img src="/img/cloudOne.png" alt="Cloud" className={'cloudOne'}/>
            <img src="/img/cloudTwo.png" alt="CloudTwo" className={'cloudTwo'}/>
        </div>
        <div className="inputContainer">
            <input type="text"
                   placeholder="Enter the name of the city"
                   value={inputValue}
                   onChange={(e)=>{setInputValue(e.target.value)}}
            />
            <button className="searchIconButton"  >
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
