import { useState } from "react";

const api = {
  key: "a17a722da95fd64332ca1bf0fabbc3b7",
  base: "https://api.openweathermap.org/data/2.5/",
};

function HomePage() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="container-fluid text-center">
      <h1>Weather App</h1>
      <div className="search-box">
        <input type="text" placeholder="Enter city/town..." onChange={(e) => setSearch(e.target.value)} />
        <button onClick={searchPressed}>Search</button>
      </div>

      {typeof weather.main !== "undefined" ? (
        <div>
          <p>{weather.name}</p>

          <p>{weather.main.temp}°C</p>

          <p>{weather.weather[0].main}</p>
          <p>({weather.weather[0].description})</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HomePage;
