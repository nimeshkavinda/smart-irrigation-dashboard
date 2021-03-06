import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import moment from "moment";
import { FaWater, FaTemperatureHigh, FaRegLightbulb } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

export default function SensorDataCard(props) {
  const iconType = props.type;
  let icon;
  if (iconType === "soilMoist") {
    icon = <FaWater />;
  }
  if (iconType === "temp") {
    icon = <FaTemperatureHigh />;
  }
  if (iconType === "humidity") {
    icon = <WiHumidity />;
  }
  if (iconType === "lightIntensity") {
    icon = <FaRegLightbulb />;
  }

  return (
    <MDBCol lg="3" className="mb-5">
      <MDBCard className="h-100" style={{ borderRadius: "15px" }}>
        <MDBCardBody>
          <MDBCardTitle style={{ fontSize: `${props.font}` }} className={`${props.class}`}>
            {props.reading}&nbsp;{props.unit}
          </MDBCardTitle>
          <MDBCardTitle className="h3">
            {props.title}&nbsp;&nbsp;
            {icon}
          </MDBCardTitle>
          <MDBCardText>
            <meter
              className="sensor-meter"
              min="0"
              low={props.low}
              optimum={props.optimum}
              high={props.high}
              max={props.max}
              value={props.reading}
            ></meter>
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter>
          <small className="text-muted">
            Last updated:&nbsp;
            {moment(props.updated).format("YYYY-MM-DD h:mm:ss a")}
          </small>
        </MDBCardFooter>
      </MDBCard>
    </MDBCol>
  );
}
