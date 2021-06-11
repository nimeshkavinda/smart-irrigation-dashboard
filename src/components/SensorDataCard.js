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

export default function SensorDataCard() {
  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      <MDBCol>
        <MDBCard className="h-100">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.jpg"
            alt="..."
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter>
            <small className="text-muted">Last updated 3 mins ago</small>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
