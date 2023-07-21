import styles from "../css-modules/Map.module.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import useUserState from "../store/userStateContext";

function Map() {
  const { selectedCountry } = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  useEffect(() => { //fetch co-ordinates of selected country
    const apiGetCoords = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          `https://geocode.maps.co/search?q=${selectedCountry.name}`
        );
        if (!response.data[0].lat || !selectedCountry.name) {
          setError(true);
        } else {
          setLat(response.data[0].lat);
          setLon(response.data[0].lon);
        }
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    apiGetCoords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [40, 40],
  });
  ///////////////// error is not working
  return (
    <div className={styles.container}>
      <h1>Location Map</h1>
      {error && <h2>No map info found</h2>}
      {isLoading ? (
        <progress />
      ) : (
        <MapContainer center={[lat, lon]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]} icon={customIcon}>
            <Popup>{selectedCountry.name}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
