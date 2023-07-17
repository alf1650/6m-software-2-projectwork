import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

function Map({ searchedCountry }) {
  const [isLoading, setIsLoading] = useState(false);
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    useEffect(() => {
      const apiGetCoords = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://geocode.maps.co/search?q=${searchedCountry}`
          );
          setLat(response.data[0].lat);
          setLon(response.data[0].lon);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      apiGetCoords();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lon]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [40, 40],
  });

  return (
    <div className={styles.container}>
      <h1>Location Map</h1>
      { isLoading ? <progress/> :
        <MapContainer center={[lat, lon]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]} icon={customIcon}>
            <Popup>{searchedCountry}</Popup>
          </Marker>
        </MapContainer>
      }
    </div>
  );
}

export default Map;
