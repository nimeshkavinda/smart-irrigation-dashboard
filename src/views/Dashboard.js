import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import moment from "moment";

export default function Dashboard() {
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [current, setCurrent] = useState("");
  const [channel, setChannel] = useState("");
  const [soilMoist, setSoilMoist] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lightIntensity, setLightIntensity] = useState("");
  const [pump, setPump] = useState("Off");

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

  useEffect(
    () => {
      fetch("https://api.thingspeak.com/channels/1389777/feeds.json?results=2")
        .then((response) => response.json())
        .then((json) => {
          setChannel(json.channel);
          setSoilMoist(json.feeds.slice(-1)[0].field1);
          setTemp(json.feeds.slice(-1)[0].field2);
          setHumidity(json.feeds.slice(-1)[0].field3);
          setLightIntensity(json.feeds.slice(-1)[0].field4);
        })
        .catch((error) => console.error(error));
    },
    [],
    1000
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
      return () => clearTimeout(timer);
    }, 1000);
  });

  useEffect(() => {
    soilMoist < "50" ? setPump("On") : setPump("Off");
  }, [soilMoist]);

  return (
    <div>
      <MDBContainer>
        <div
          className="jumbtron p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://mdbcdn.b-cdn.net/img/new/slides/041.jpg')",
            height: 600,
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
        <div className="reports">
          <MDBRow>
            <h1 className="mb-3">{pump}</h1>
            <h3>{soilMoist}</h3>
            <h3>{channel.field1}</h3>
          </MDBRow>
        </div>
      </MDBContainer>
    </div>
  );
}
