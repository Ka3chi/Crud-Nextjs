import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApi = () => {
  //variables for api
  const Apikey = '2675f5dc6be3f4048c06c7fd8c89f1b7';
    //useStates
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [date, setDate] = useState<string>('');


  useEffect(() => {
    //setup the data
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formattedDate);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  //error catch
  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    try {
        //api fetch
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=metric`
        );
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  return (
    //layout
    <div className="flex flex-col items-center p-5 justify-center space-y-4">
      <div className="mb-3">
        <span className="text-lg">Current Date: {date}</span>
      </div>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        required
        placeholder="Enter city name"
        className="text-black border border-gray-500 h-[30px] rounded-lg text-center"
      />
      <button
        onClick={fetchWeather}
        className="bg-gray-500 text-white h-[40px] w-[220px] rounded-lg"
      >
        Search Weather
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {weather && (
        <div className="mt-5 flex flex-col space-y-3 ">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApi;
