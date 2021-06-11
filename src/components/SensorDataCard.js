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

export default function SensorDataCard(props) {
  return (
    <MDBCol lg="3" className="mb-4">
      <MDBCard className="h-100" style={{ borderRadius: "15px" }}>
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter>
          <small className="text-muted">
            {moment(props.updated).format("YYYY-MM-DD h:mm:ss a")}
          </small>
        </MDBCardFooter>
      </MDBCard>
    </MDBCol>
  );
}
