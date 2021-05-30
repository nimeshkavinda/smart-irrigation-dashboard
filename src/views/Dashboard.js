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
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://mdbcdn.b-cdn.net/img/new/slides/041.jpg')",
            height: 400,
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">Heading</h1>
                <h4 className="mb-3">Subheading</h4>
                <a
                  className="btn btn-outline-light btn-lg"
                  href="#!"
                  role="button"
                >
                  Call to action
                </a>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
}
