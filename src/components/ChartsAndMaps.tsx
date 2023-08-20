import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "tailwindcss/tailwind.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chart.js/auto'
import L from 'leaflet';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}

const Dashboard: React.FC = () => {
  const [casesData, setCasesData] = useState<number[]>([]);
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [position, setPosition] = useState<{ lat: number; long: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historicalResponse = await axios.get(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        const { cases } = historicalResponse.data;
        setCasesData(Object.values(cases));

        const countryResponse = await axios.get(
          "https://disease.sh/v3/covid-19/countries"
        );
        setCountryData(countryResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (geoPosition) => {
          const { latitude, longitude } = geoPosition.coords;
          setPosition({ lat: latitude, long: longitude });
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }

    L.Icon.Default.mergeOptions({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    fetchData();
  }, []);

  if (loading || !position || casesData.length === 0) {
    return <div>Loading...</div>;
  }

  const renderLineGraph = () => {
    const data = {
      labels: casesData.map((_, index) => index.toString()),
      datasets: [
        {
          label: "Total Cases",
          data: casesData,
          fill: false,
          borderColor: "rgb(255,99,132)",
          backgroudColor: "rgba(255, 99, 132, 0.5)"
        },
      ],
    };

    return (
      <div className="w-full md:w-1/2 p-4">
        <Line
          data={data}
          height="200px"
  width="200px"
          options={{
            responsive: true,
            interaction: {
              mode: 'index' as const,
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
                text: 'Covid-19 World-Wide data',
              },
            },
            scales: {
              y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
              },
              y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          }}
        />
      </div>
    );
  };

  const renderLeafletMap = () => {
    return (
      <div className="w-full md:w-1/2 p-4">
        <MapContainer center={[position.lat, position.long]} zoom={4} style={{ height: "50vh", width: "50vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countryData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <h3>{country.country}</h3>
                <p>
                  Active Cases: {country.active}<br />
                  Recovered Cases: {country.recovered}<br />
                  Deaths: {country.deaths}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        {renderLineGraph()}
        {renderLeafletMap()}
      </div>
    </div>
  );
};

export default Dashboard;
