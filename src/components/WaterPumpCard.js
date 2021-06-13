import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";

export default function WaterPumpCard(props) {
  return (
    <div>
      <MDBCard
        background={props.background}
        className="text-white mb-3"
        style={{ borderRadius: "15px" }}
      >
        <MDBCardBody className="p-5">
          <MDBCardText>Water pump 1</MDBCardText>
          <MDBCardTitle className="pump-reading">
            Water pump is currently: {props.state}
          </MDBCardTitle>
          <MDBCardText>
            {props.state === "Off"
              ? "Water pump 1 will automatically turn on once soil moisture levels reach below 55%"
              : "Water pump 1 will automatically turn off once soil moisture levels reach above 50%"}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
