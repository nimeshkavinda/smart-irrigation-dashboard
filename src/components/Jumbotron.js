import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import moment from "moment";
import { FaSun } from "react-icons/fa";
import { BiWind } from "react-icons/bi";
import { WiSunrise, WiSunset, WiHumidity } from "react-icons/wi";
import { BsSun } from "react-icons/bs";

export default function Jumbotron() {
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [current, setCurrent] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [overlay, setOverlay] = useState("");
  const [uvi, setUvi] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunriseTime, setSunriseTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  const [sunset, setSunset] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [feelsLike, setFeelsLike] = useState("");

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=6.848&lon=79.9265&appid=a9aee5f5a71fff1fa1a722f419473c4b&units=metric",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.current.weather[0]);
        setCurrent(data.current);
        setLocation(data);
        setIcon(data.current.weather[0].icon);
        setDescription(data.current.weather[0].main);
        setUvi(data.current.uvi);
        setSunrise(data.current.sunrise);
        setSunset(data.current.sunset);
        setWind(data.current.wind_speed);
        setHumidity(data.current.humidity);
        setFeelsLike(data.current.feels_like);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
      let sunriseTimeStamp = new Date(sunrise * 1000);
      let sunsetTimeStamp = new Date(sunset * 1000);
      setSunriseTime(moment(sunriseTimeStamp).format("h:mm a"));
      setSunsetTime(moment(sunsetTimeStamp).format("h:mm a"));
      setBackground();
      return () => clearTimeout(timer);
    }, 1000);
  });

  const setBackground = () => {
    switch (description) {
      case "Clear":
        setOverlay(
          "https://images.unsplash.com/photo-1558418294-9da149757efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"
        );
        break;
      case "Clouds":
        setOverlay(
          "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
        );
        break;
      case "Rain":
        setOverlay(
          "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
        );
        break;
      case "Thunderstorm":
        setOverlay(
          "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80"
        );
        break;
      case "Snow":
        setOverlay(
          "https://images.unsplash.com/photo-1542601098-8fc114e148e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        );
        break;
      case "Mist":
        setOverlay(
          "https://images.unsplash.com/photo-1585508889431-a1d0d9c5a324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        );
        break;
      default:
        setOverlay(
          "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
        );
    }
  };

  return (
    <div>
      <MDBContainer>
        <div
          className="jumbotron p-5 bg-image"
          style={{
            backgroundImage: `url(${overlay})`,
            height: 500,
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <MDBRow>
                  <h5 className="mb-3">{time}</h5>
                </MDBRow>
                <MDBRow>
                  <MDBCol className="col-md-8">
                    <h3 className="mb-3">{location.timezone}</h3>
                    <MDBRow>
                      <MDBCol>
                        <img
                          className="weather-ico"
                          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                          style={{
                            objectFit: "contain",
                            height: "150px",
                          }}
                        />
                      </MDBCol>
                      <MDBCol>
                        <h1 style={{ fontSize: "6rem" }}>
                          {current.temp}&nbsp;??C
                        </h1>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol className="col-md-4">
                    <h2 className="mb-3 ">
                      <FaSun />
                      &nbsp;&nbsp;
                      {feelsLike}&nbsp;??C
                    </h2>
                    <h2 className="mb-3 ">
                      <BsSun />
                      &nbsp;&nbsp;
                      {uvi}
                    </h2>
                    <h2 className="mb-3">
                      <WiSunrise />
                      &nbsp;&nbsp;
                      {sunriseTime}
                    </h2>
                    <h2 className="mb-3">
                      <WiSunset />
                      &nbsp;&nbsp;
                      {sunsetTime}
                    </h2>
                    <h2 className="mb-3">
                      <WiHumidity />
                      &nbsp;&nbsp;
                      {humidity}&nbsp;%
                    </h2>
                    <h2 className="mb-3">
                      <BiWind />
                      &nbsp;&nbsp;
                      {wind}&nbsp;km/h
                    </h2>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <h4 className="mb-3">{weather.description}</h4>
                </MDBRow>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
}
