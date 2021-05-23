import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function Dashboard() {
  const [weather, setWeather] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=6.848&lon=79.9265&appid=a9aee5f5a71fff1fa1a722f419473c4b",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //   useEffect(() => {
  //     fetch("https://api.thingspeak.com/channels/1389777/feeds.json?results=2")
  //       .then((response) => response.json())
  //       .then((json) => setData(json.feeds.slice(-1)[0]))
  //       .catch((error) => console.error(error))
  //       .finally(() => setLoading(false));
  //   }, []);

  return (
    <div>
      <MDBContainer>
        <MDBRow></MDBRow>
      </MDBContainer>
    </div>
  );
}
