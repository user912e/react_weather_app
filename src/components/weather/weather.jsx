import { Container, Row } from "react-bootstrap";
import style from "./style.module.scss";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Sunrize from "../Svgs/Sunrize";
import Position from "../Svgs/PositionSvg";
import Wind from "../Svgs/Wind";
import WetherCol from "../WetherCol/WetherCol";
import { useSelector } from "react-redux";

import Sunny from "../Svgs/Sunny";

const Weather = () => {
  const weatherr = useSelector(({ weather }) => weather.weather);
  const { clouds, main, name, sys, weather, wind } = weatherr;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // console.log(weatherr);
  // sunrize
  const currentTime =
    weekday[new Date().getDay()] +
    " " +
    new Date().toLocaleString().split(",")[1];

  // current time
  const sunrizeTime =
    new Date(sys?.sunrise * 1000)
      ?.toLocaleString()
      ?.split(",")[1]
      ?.split("")
      ?.reverse()
      ?.join("")
      ?.substring(6)
      ?.split("")
      ?.reverse()
      ?.join("") || "00:00";

  return (
    <>
      <Container
        className={`my-4 p-3 d-flex rounded justify-content-between align-items-center flex-column ${style.wraper}`}
      >
        
        <Row className={`${style.innerRow} m-1`}>
          <span>
            {name || "--"}, {sys?.country || "-- "}
            <Position height="20px" width="20px" />
          </span>
          <span className="">{currentTime || "00:00:00"}</span>
        </Row>
        <Row className={`${style.innerRow} m-1`}>
          <DefaultWeather width="220px" height="220px" />
        </Row>
        <Row className={`${style.innerRow} m-1`}>
          <h1>
            {main?.temp || "00"}° C<Thermometer />
          </h1>
          <hr />
        </Row>

        <div
          className={`${style.innerRow} m-1 flex-row no-wrap p-2 `}
          style={{ flexWrap: "nowrap" }}
        >
          <WetherCol
            svgComp={<Sunrize width="30px" height="30px" color="white" />}
            name={"Sunrise"}
            state={`${sunrizeTime}`}
          />
          <WetherCol
            svgComp={<Wind width="30px" height="30px" color="white" />}
            name={"Wind"}
            state={`${wind?.speed || "00"} m/s`}
          />
          <WetherCol
            svgComp={<Thermometer width="30px" height="30px" color="white" />}
            name={"Temp"}
            state={`${main?.temp_max || "00"} C`}
          />
        </div>
      </Container>
    </>
  );
};

export default Weather;
