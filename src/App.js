import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '5964b7a16537fcdae8de2800a4446574'; // Substitua pela sua chave de API

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('Cidade não encontrada.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-4 text-center">Previsão do Tempo</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite o nome da cidade"
            className="w-full px-3 py-2 mb-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">
            Buscar
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {weather && (
          <div className="text-center">
            <h2 className="text-xl font-bold">{weather.name}</h2>
            <p>Temperatura: {weather.main.temp}°C</p>
            <p>Umidade: {weather.main.humidity}%</p>
            <p>Descrição: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
