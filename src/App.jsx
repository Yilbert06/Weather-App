import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'


function App() {

  const [latLon, setLatLon] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  useEffect(() => {
    
  const success = pos =>{
        const obj ={
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setLatLon(obj)
  }
  const error = () => {}

  navigator.geolocation.getCurrentPosition(success, error) 

  }, [])
  
useEffect(() => {
if (latLon) {
  const apiKey='4e61d69984b76f77996b597271f9f3da'
  const url =`https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${apiKey}`
  axios.get(url)
  .then(res => {
    const celsius = (res.data.main.temp -273.15).toFixed(1)
    const farenheit= (celsius * 9 / 5 + 32).toFixed(1)

    setTemperature ({celsius, farenheit})
    setWeather(res.data)
  })
  .catch((err) => console.log(err))
}
}, [latLon])


const weatherByCountry = async (value) => {
  const apiKey='4e61d69984b76f77996b597271f9f3da'
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`);
  setWeather(res.data)
  
};
const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  weatherByCountry(form.placeNameInput.value);
  form.reset();
};



  return (
    <div className="App">
      <div className='submit'>
        <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Search" id="placeNameInput" />
                <button>Submit</button>
              </form>
             <div className="box">
                  <p>
                    {weather?.name},{weather?.sys.country} {' '}
                  </p>
                </div> 
      </div>
  
       {!weather ? <Loading />

      :  
      <WeatherCard 
      weather={weather}
      temperature={temperature}/>
      
    
      
      
      
}
    </div>
  );
};

export default App
