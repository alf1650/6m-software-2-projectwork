import React from "react";
// import { render } from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
//import results from "./Results";

//ReactDOM.render(<results />, document.getElementById('root'));

// const position = [1.3521, 103.8198];

function Map({ position }) {
  console.log("Map Position:", position);
  console.log(position.lat)
  console.log(position.lon)
  const lat = Number(position.lat)
  const lon = Number(position.lon)
  console.log(lat)
  console.log(lon)
  return (
    <>
      <h1>Location Map</h1>
      <div className={styles.MapContainer}>
      <MapContainer center={[1.357107, 103.8194992]} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lon]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      </div>
    </>
  );
}

export default Map;
