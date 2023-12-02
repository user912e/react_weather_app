import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./style.module.scss";
import { GEO_API_KEY, WEATHER_API_KEY } from "../../utils/constantants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/weatherSlice";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [option, setOptions] = useState([]);
  const state = useSelector(({ weather }) => weather);
  const [geoLocation, setGeoLocation] = useState({ lat: "", lon: "" });
  const handleAutoComplete = (e) => {
    const { value } = e.currentTarget;
    // console.log(value);
    if (value && value.length >= 3) {
      const baseUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`;
      fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
          setOptions(
            data.results?.length > 0
              ? data.results.map((r) => {
                  const { lat, lon, country, city, formatted } = r;
                  return { lat, lon, country, city, formatted };
                })
              : []
          );
        });
    }
  };

  function getUserGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        const lat = res.coords.latitude;
        const lon = res.coords.longitude;
        // console.log({ uLat: lat, uLon: lon });
        setGeoLocation({ lat, lon });
      });
    }
  }

  useEffect(() => {
    getUserGeoLocation();
  }, []);
  function fetchWeather() {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${geoLocation?.lat}&lon=${geoLocation?.lon}&appid=${WEATHER_API_KEY}`;
    // console.log(baseUrl);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        const { clouds, main, name, sys, weather, wind } = data;
        dispatch(
          setData({
            weather: {
              weather: {
                clouds,
                main,
                name,
                sys,
                weather,
                wind,
              },
              isSetWeather: true,
            },
          })
        );
      });
  }
  useEffect(() => {
    if (!geoLocation.lat || !geoLocation.lon) return;
    fetchWeather();
  }, [geoLocation]);

  const handleSearch = (e, value) => {
    if (value) {
      // console.log(value);
      setGeoLocation({ lat: value.lat, lon: value.lon });
    } else {
      dispatch(
        setData({
          weather: {
            weather: {
              clouds: undefined,
              main: undefined,
              name: undefined,
              sys: undefined,
              weather: undefined,
              wind: undefined,
            },
            isSetWeather: false,
          },
        })
      );
    }
  };

  return (
    <>
      <div className={`${styles.form} text-light mt-3`}>
        <Autocomplete
          disablePortal
          clearOnBlur={false}
          getOptionLabel={(op) => op.formatted}
          id="combo-box-demo"
          options={option}
          onChange={handleSearch}
          sx={{ width: "100%", color: "red" }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={handleAutoComplete}
              label="Movie"
            />
          )}
        />
        <button className="btn btn-dark " onClick={getUserGeoLocation}>
          local weather
        </button>
      </div>
    </>
  );
};

export default SearchBar;
