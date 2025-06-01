import { fetchWeatherApi } from 'openmeteo';

const params = {
    "latitude": 42.2057,
    "longitude": -121.7217,
    "daily": ["sunrise", "sunset", "uv_index_max", "uv_index_clear_sky_max", "daylight_duration", "sunshine_duration", "temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max", "wind_gusts_10m_max", "shortwave_radiation_sum"],
    "hourly": "uv_index",
    "current": ["temperature_2m", "is_day", "precipitation", "cloud_cover"],
    "timezone": "America/Los_Angeles",
    "wind_speed_unit": "mph",
    "temperature_unit": "fahrenheit",
    "precipitation_unit": "inch",
    "temporal_resolution": "hourly_3"
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

const sunrise = daily.variables(0)!;
const sunset = daily.variables(1)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
    current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        isDay: current.variables(1)!.value(),
        precipitation: current.variables(2)!.value(),
        cloudCover: current.variables(3)!.value(),
    },
    hourly: {
        time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
            (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
        ),
        uvIndex: hourly.variables(0)!.valuesArray()!,
    },
    daily: {
        time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
        ),
        sunrise: [...Array(sunrise.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        sunset: [...Array(sunset.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        uvIndexMax: daily.variables(2)!.valuesArray()!,
        uvIndexClearSkyMax: daily.variables(3)!.valuesArray()!,
        daylightDuration: daily.variables(4)!.valuesArray()!,
        sunshineDuration: daily.variables(5)!.valuesArray()!,
        temperature2mMax: daily.variables(6)!.valuesArray()!,
        temperature2mMin: daily.variables(7)!.valuesArray()!,
        windSpeed10mMax: daily.variables(8)!.valuesArray()!,
        windGusts10mMax: daily.variables(9)!.valuesArray()!,
        shortwaveRadiationSum: daily.variables(10)!.valuesArray()!,
    },
};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
        weatherData.hourly.time[i].toISOString(),
        weatherData.hourly.uvIndex[i]
    );
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
    console.log(
        weatherData.daily.time[i].toISOString(),
        weatherData.daily.sunrise[i].toISOString(),
        weatherData.daily.sunset[i].toISOString(),
        weatherData.daily.uvIndexMax[i],
        weatherData.daily.uvIndexClearSkyMax[i],
        weatherData.daily.daylightDuration[i],
        weatherData.daily.sunshineDuration[i],
        weatherData.daily.temperature2mMax[i],
        weatherData.daily.temperature2mMin[i],
        weatherData.daily.windSpeed10mMax[i],
        weatherData.daily.windGusts10mMax[i],
        weatherData.daily.shortwaveRadiationSum[i]
    );
}
