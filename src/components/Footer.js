import React from "react";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBContainer>
      <MDBFooter backgroundColor="light" className="text-left">
        <div className="p-3">
          &copy; {new Date().getFullYear()}&nbsp;
          <a
            className="text-dark"
            href="https://smart-irrigation-dashboard.netlify.app"
          >
            Smart Irrigation System
          </a>
        </div>
      </MDBFooter>
    </MDBContainer>
  );
}
