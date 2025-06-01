import React, { useEffect, useState, useContext } from 'react';
import UserContext from "../context/UserContext";
import "../../src/index.css"

const SITES = [
  { name: "Tulelake", latitude: 41.8557, longitude: -121.4670 },
  { name: "Macdoel", latitude: 41.8426, longitude: -121.4178 },
  { name: "Susanville", latitude: 40.4165, longitude: -120.6490 },
];

const BASE_WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const WEATHER_QUERY_PARAMS =
  "&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max,daylight_duration,sunshine_duration,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,shortwave_radiation_sum" +
  "&hourly=uv_index" +
  "&current=temperature_2m,is_day,precipitation,cloud_cover" +
  "&timezone=America%2FLos_Angeles" +
  "&wind_speed_unit=mph" +
  "&temperature_unit=fahrenheit" +
  "&precipitation_unit=inch" +
  "&temporal_resolution=hourly_3";

const Dashboard = () => {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);

  useEffect(() => {
    async function fetchAll() {
      try {
        const results = await Promise.all(
          SITES.map(site =>
            fetch(
              `${BASE_WEATHER_URL}?latitude=${site.latitude}&longitude=${site.longitude}${WEATHER_QUERY_PARAMS}`
            ).then(res => res.json())
          )
        );
        setWeatherDataList(
          results.map((data, i) => ({ ...data, name: SITES[i].name }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <div>
      <h1 className="pt-4">Dashboard</h1>
      <h2 className="mb-4"> {user?.first}</h2>
      <h2 className="mb-4">Hello {useContext(UserContext)?.first}</h2>
      {loading && <p>Loading weather...</p>}
      {!loading && weatherDataList.length > 0 && (
        <div className="widget-container">
          {weatherDataList.map(weather => {
            const current = weather.current;
            const daily = weather.daily;
            const todayIdx = 0;
            return (
              <div
                key={weather.name}
                className="weather-widget"
                style={{
                  border: "1.5px solid #213547",
                  borderRadius: 8,
                  padding: 16,
                  maxWidth: 350,
                  margin: "1em 0",
                }}
              >
                <h2>{weather.name}</h2>
                {current ? (
                  <div>
                    <div style={{ fontSize: 32, fontWeight: "bold" }}>
                      {current.temperature_2m}°F
                    </div>
                    <div>Precipitation: {current.precipitation} in</div>
                    <div>Cloud Cover: {current.cloud_cover}%</div>
                    <div>Daytime: {current.is_day ? "Yes" : "No"}</div>
                  </div>
                ) : (
                  <div>No current weather data available.</div>
                )}
                {daily && (
                  <div style={{ marginTop: 16 }}>
                    <h3>Today's Highlights</h3>
                    <div>Sunrise: {daily.sunrise?.[todayIdx]}</div>
                    <div>Sunset: {daily.sunset?.[todayIdx]}</div>
                    <div>Max Temp: {daily.temperature_2m_max?.[todayIdx]}°F</div>
                    <div>Min Temp: {daily.temperature_2m_min?.[todayIdx]}°F</div>
                    <div>UV Index Max: {daily.uv_index_max?.[todayIdx]}</div>
                    <div>Wind Speed Max: {daily.wind_speed_10m_max?.[todayIdx]} mph</div>
                    <div>Wind Gusts Max: {daily.wind_gusts_10m_max?.[todayIdx]} mph</div>
                    <div>Sunshine Duration: {daily.sunshine_duration?.[todayIdx]} min</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;