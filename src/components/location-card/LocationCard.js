import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./LocationCard.css"

export default function LocationCard() {
  return (
    <div className="location-card">
      <div className="container">
        <div className="row address-cards g-3 d-flex justify-content-around">
          <Card className="col col-sm-6 col-xl-4 text-center each-card">
            <Card.Body>
              <FaLocationDot className="location-icon" />
              <Card.Title>Our Location</Card.Title>
              <Card.Text>
                <p> The Queen's Walk, Bishop's, London SE1 </p>
                <p>7PB, United Kingdom.</p>
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="col col-sm-6 col-xl-4 text-center each-card">
            <Card.Body>
              <FaLocationDot className="location-icon" />
              <Card.Title>Our Location</Card.Title>
              <Card.Text>
                <p> The Queen's Walk, Bishop's, London SE1 </p>
                <p>7PB, United Kingdom.</p>
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="col col-sm-6 col-xl-4 text-center each-card">
            <Card.Body>
              <FaLocationDot className="location-icon" />
              <Card.Title>Our Location</Card.Title>
              <Card.Text>
                <p> The Queen's Walk, Bishop's, London SE1 </p>
                <p>7PB, United Kingdom.</p>
              </Card.Text>
            </Card.Body>
          </Card>
          
         
        </div>
      </div>
    </div>
  );
}
