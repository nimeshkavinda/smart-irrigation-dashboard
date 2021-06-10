import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function Dashboard() {
  const [channel, setChannel] = useState("");
  const [soilMoist, setSoilMoist] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lightIntensity, setLightIntensity] = useState("");
  const [pump, setPump] = useState("Off");

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://api.thingspeak.com/channels/1389777/feeds.json?results=2"
      )
        .then((res) => res.json())
        .then((res) => {
          setChannel(res.channel);
          setSoilMoist(res.feeds.slice(-1)[0].field1);
          setTemp(res.feeds.slice(-1)[0].field2);
          setHumidity(res.feeds.slice(-1)[0].field3);
          setLightIntensity(res.feeds.slice(-1)[0].field4);
        })
        .catch((e) => console.error(e));
    };
    fetchData();
    const interval = setInterval(() => fetchData(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    soilMoist <= "55" && soilMoist !== "100.00"
      ? setPump("On")
      : setPump("Off");
  }, [soilMoist]);

  return (
    <div>
      <MDBContainer>
        <div id="reports" className="reports">
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
