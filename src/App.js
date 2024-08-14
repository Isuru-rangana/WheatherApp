import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Typography, Card, CardContent, Box, Grid, IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const WeatherCard = styled(Card)({
  maxWidth: 900,
  margin: '40px auto',
  textAlign: 'center',
  backgroundColor: '#e3f2fd',
  padding: '20px',
  borderRadius: '15px',
});

const WeatherIcon = styled(Box)({
  fontSize: '80px',
  marginBottom: '10px',
});

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderWeatherIcon = () => {
    if (!weather) return null;

    const weatherMain = weather.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'clear':
        return <WbSunnyIcon color="warning" style={{ fontSize: 80 }} />;
      case 'clouds':
        return <CloudIcon color="primary" style={{ fontSize: 80 }} />;
      case 'snow':
        return <AcUnitIcon color="info" style={{ fontSize: 80 }} />;
      default:
        return <CloudIcon color="disabled" style={{ fontSize: 80 }} />;
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center" style={{ marginTop: '20px' }}>
        Weather Prediction App
      </Typography>

      <TextField
        fullWidth
        label="Enter city name"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={getWeather}
        style={{ marginBottom: '20px' }}
      >
        Get Weather
      </Button>

      {weather && (
        <WeatherCard>
          <CardContent>
            <WeatherIcon>{renderWeatherIcon()}</WeatherIcon>
            <Typography variant="h5" gutterBottom>
              {weather.name}, {weather.sys.country}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {weather.weather[0].description}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {Math.round(weather.main.temp - 273.15)}°C
            </Typography>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">Humidity: {weather.main.humidity}%</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Wind: {weather.wind.speed} m/s</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </WeatherCard>
      )}
    </Container>
  );
}

export default App;
