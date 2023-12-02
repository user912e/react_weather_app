import { Container } from "react-bootstrap";
import SearchBar from "./components/searchbar/searchBar";
import Weather from "./components/weather/weather";
import Wallpeper from "./components/Wallpeper/Wallpeper";
import { useSelector } from "react-redux";
// import DefaultWeather from "./components/Svgs/DefaultWeather";

function App() {
  const isSetWeather = useSelector((state) => state.weather.isSetWeather);

  return (
    <>
      <Wallpeper></Wallpeper>
      <Container>
        <SearchBar />
        {isSetWeather ? (
          <Weather />
        ) : (
          <p className="border border-light border-1 text-light text-center">
            Please choose a place
          </p>
        )}
      </Container>
    </>
  );
}

export default App;
