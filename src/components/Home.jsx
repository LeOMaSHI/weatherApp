import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";

const api = {
  key: "a17a722da95fd64332ca1bf0fabbc3b7",
  geoBase: "http://api.openweathermap.org/geo/1.0/direct?",
  weatherBase: "https://api.openweathermap.org/data/2.5/forecast",
};

function HomePage() {
  const [search, setSearch] = useState("");
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const searchPressed = async () => {
    if (search.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    try {
      const geoRes = await fetch(`${api.geoBase}q=${search}&limit=1&appid=${api.key}`);
      const geoData = await geoRes.json();

      if (!geoData.length) {
        setError("City not found. Please try again.");
        setForecast(null);
        return;
      }

      const { lat, lon, name } = geoData[0];

      const weatherRes = await fetch(`${api.weatherBase}?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`);
      const weatherData = await weatherRes.json();

      setForecast({ city: name, list: weatherData.list });
      setError("");
    } catch (error) {
      //?
      setError("Something went wrong. Please try again.");
      setForecast(null);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center py-5 mx-0"
      style={{ backgroundColor: "#050063", minHeight: "100vh", overflowX: "hidden", color: "#fff0cb" }}
    >
      <h1 className="mb-4 text-center fw-bold ">Weather App</h1>

      <Row className="w-100 mb-4">
        <Col xs={12} md={6} className="mx-auto">
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Enter city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              style={{ backgroundColor: "#fff0cb", color: "#050063" }}
              onClick={searchPressed}
              className="ms-2  fw-bold"
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="w-100 text-center">
          {error}
        </Alert>
      )}

      {forecast && (
        <Card
          className="shadow-lg text-white rounded-3"
          style={{ height: "70vh", width: "90%", maxWidth: "800px", background: "#dbd9ff" }}
        >
          <Card.Body>
            <Card.Title className="text-uppercase text-center fs-3 fw-bold mb-3" style={{ color: "#050063" }}>
              {forecast.city}
            </Card.Title>
            <Row className="justify-content-center">
              {forecast.list.slice(0, 5).map((item, index) => (
                <Col key={index} xs={12} md={2} className="text-center p-2 ">
                  <Card
                    className="p-3 shadow-sm border-0 text-white d-flex flex-column justify-content-between"
                    style={{ height: "50vh", backgroundColor: "#7570FF" }}
                  >
                    <p className="fw-bold m-0">{new Date(item.dt_txt).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="my-2"
                    />
                    <p className="fs-5 fw-bold m-0 text-white">{item.main.temp}°C</p>
                    <p className="text-white m-0">{item.weather[0].main}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default HomePage;
