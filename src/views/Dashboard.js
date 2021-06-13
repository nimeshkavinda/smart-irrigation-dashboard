import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import WaterPumpCard from "../components/WaterPumpCard";
import SensorDataCard from "../components/SensorDataCard";

export default function Dashboard() {
  const [channel, setChannel] = useState("");
  const [soilMoist, setSoilMoist] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lightIntensity, setLightIntensity] = useState("");
  const [soilMoist2, setSoilMoist2] = useState("");
  const [temp2, setTemp2] = useState("");
  const [humidity2, setHumidity2] = useState("");
  const [lightIntensity2, setLightIntensity2] = useState("");
  const [pump, setPump] = useState("Off");
  const [updated, setUpdated] = useState("");

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
          // setSoilMoist2(res.feeds.slice(-1)[1].field1);
          // setTemp2(res.feeds.slice(-1)[1].field2);
          // setHumidity2(res.feeds.slice(-1)[1].field3);
          // setLightIntensity2(res.feeds.slice(-1)[1].field4);
          setUpdated(res.feeds.slice(-1)[0].created_at);
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
            <h2 className="mt-5 mb-4">Active Water Pumps</h2>
            <WaterPumpCard
              background={pump === "On" ? "success" : "danger"}
              state={pump}
            />
          </MDBRow>
          <MDBRow>
            <h2 className="my-4">Sensor Data</h2>
            <SensorDataCard
              title="Soil Moisture"
              type="soilMoist"
              unit="%"
              font="3.5em"
              reading={soilMoist}
              updated={updated}
              low="50"
              optimum="55"
              high="90"
              max="100"
            />
            <SensorDataCard
              title="Temperature"
              type="temp"
              unit="°C"
              font="3.5em"
              reading={temp}
              updated={updated}
              low="15"
              optimum="24"
              high="36"
              max="100"
            />
            <SensorDataCard
              title="Humidity"
              type="humidity"
              unit="%"
              font="3.5em"
              reading={humidity}
              updated={updated}
              low="40"
              optimum="50"
              high="80"
              max="100"
            />
            <SensorDataCard
              title="Light Intensity"
              type="lightIntensity"
              unit="Lux"
              font="2.5em"
              class="mb-4"
              reading={lightIntensity}
              updated={updated}
              low="10000"
              optimum="30000"
              high="50000"
              max="65535"
            />
          </MDBRow>
        </div>
      </MDBContainer>
    </div>
  );
}
