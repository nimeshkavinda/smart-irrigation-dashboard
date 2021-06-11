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
        <MDBCardBody>
          <MDBCardTitle className="pump-reading">{props.state}</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
