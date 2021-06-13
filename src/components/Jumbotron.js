import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import moment from "moment";

export default function Jumbotron() {
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [current, setCurrent] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [overlay, setOverlay] = useState("");

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
        setDescription(data.current.weather[0].description);
        setBackground();
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

  const setBackground = () => {
    switch (description) {
      case "clear sky":
        setOverlay(
          "https://images.unsplash.com/photo-1558418294-9da149757efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"
        );
        break;
      case "few clouds":
        setOverlay(
          "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
        );
        break;
      case "scattered clouds":
        setOverlay(
          "https://images.unsplash.com/photo-1511747779856-fd751a79aa22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        );
        break;
      case "broken clouds":
        setOverlay(
          "https://images.unsplash.com/photo-1606158207522-d9eb6de3ee87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        );
        break;
      case "shower rain":
        setOverlay(
          "https://images.unsplash.com/photo-1494007485290-ce668e189d92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        );
        break;
      case "rain":
        setOverlay(
          "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
        );
        break;
      case "thunderstorm":
        setOverlay(
          "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80"
        );
        break;
      case "snow":
        setOverlay(
          "https://images.unsplash.com/photo-1542601098-8fc114e148e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        );
        break;
      case "mist":
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
                  <MDBCol>
                    <h3 className="mb-3">{location.timezone}</h3>
                    <MDBRow>
                      <MDBCol>
                        <img
                          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                          height="150"
                        />
                      </MDBCol>
                      <MDBCol>
                        <h1 className="mb-3" style={{ fontSize: "5rem" }}>
                          {current.temp}&nbsp;°C
                        </h1>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol>

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
