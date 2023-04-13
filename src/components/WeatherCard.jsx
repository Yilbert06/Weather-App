import React, { useState } from 'react'

const WeatherCard = ({weather, temperature}) => {
const [isCelsius, setIsCelsius] = useState(true)
const handleTemp = () =>setIsCelsius(!isCelsius)

return (
<article className='home__card'>
        <h1><strong>Weather App</strong></h1>
        <h2>{weather?.name}, {weather?.sys.country}</h2>
    <section className='home__card2'>
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
        <div className='description'>
            <h3>{weather?.weather[0].description}</h3>
        <ul>
            <li><span><b>Wind Speed </b></span>{weather?.wind.speed} meter/sec</li>
            <li><span><b>Clouds </b></span>{weather?.clouds.all} %</li>
            <li><span><b>Pressure </b></span>{weather?.main.pressure} hPa</li>
        </ul>
        </div>
    </section>
<article>
    <footer>
    <h4>
        {
        isCelsius
        ? `${temperature?.celsius} °C`
        : `${temperature?.farenheit} °F`
        }
    </h4>
    <button className='btn' onClick={handleTemp}>Change {isCelsius ? '°F' : '°C'}</button>
    </footer>
</article>
    </article>
)
}

export default WeatherCard