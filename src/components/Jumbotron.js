import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import moment from "moment";

export default function Jumbotron() {
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [current, setCurrent] = useState("");

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
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
      return () => clearTimeout(timer);
    }, 1000);
  });

  return (
    <div>
      <MDBContainer>
        <div
          className="jumbotron p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://mdbcdn.b-cdn.net/img/new/slides/041.jpg')",
            height: 300,
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h5 className="mb-3">{time}</h5>
                <h3 className="mb-3">{location.timezone}</h3>
                <h1 className="mb-3">{current.temp}</h1>
                <h3 className="mb-3">{weather.main}</h3>
                <h3 className="mb-3">{weather.description}</h3>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
}
