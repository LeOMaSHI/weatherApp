import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FaSearch, FaTint, FaWind } from "react-icons/fa";

const api = {
  key: "a17a722da95fd64332ca1bf0fabbc3b7",
  base: "https://api.openweathermap.org/data/2.5/",
};

function HomePage() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to bottom, #1E3C72, #2A5298)",
        color: "white",
      }}
    >
      <Card className="p-4 text-center shadow-lg" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <h1 className="mb-3">Weather App</h1>

        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Enter city..."
            className="me-2 text-center"
            style={{ borderRadius: "25px", textTransform: "capitalize" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="primary" className="rounded-circle" onClick={searchPressed}>
            <FaSearch />
          </Button>
        </Form>

        {typeof weather.main !== "undefined" && (
          <Card.Body>
            <div className="text-center my-3">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="img-fluid"
              />
            </div>

            <h2 className="fw-bold">{weather.main.temp}°C</h2>
            <h4 className="text-uppercase">{weather.name}</h4>

            <Row className="mt-3">
              <Col className="text-center">
                <FaTint size={20} className="text-info" />
                <p className="mb-0">{weather.main.humidity}%</p>
                <small>Humidity</small>
              </Col>
              <Col className="text-center">
                <FaWind size={20} className="text-light" />
                <p className="mb-0">{weather.wind.speed} km/h</p>
                <small>Wind</small>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
}

export default HomePage;
