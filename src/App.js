import "./App.css";

import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import baroviaMap from "./maps/baroviaMap.png";
import { CRS } from "leaflet";
import { markers } from "./data/markers";

const markerComponents = [];
markers.forEach((marker) =>
  markerComponents.push(
    <Marker position={marker.position}>
      <Tooltip>{marker.label}</Tooltip>
      {marker.info.npcs.length > 0 || marker.info.locations.length > 0 ? (
        <Popup>
          {marker.info.locations.length > 0 ? (
            <div>
              <h1>Locations</h1>
              <ul>
                {marker.info.locations.map((location) => (
                  <li>{location}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {marker.info.npcs.length > 0 ? (
            <div>
              <h1>NPCs</h1>
              <ul>
                {marker.info.npcs.map((npc) => (
                  <li>{npc}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </Popup>
      ) : null}
    </Marker>
  )
);

const App = () => {
  return (
    <div className="App">
      <MapContainer
        center={[579, 1723]}
        zoom={1}
        scrollWheelZoom={true}
        crs={CRS.Simple}
        style={{ height: "1000px" }}
        minZoom={-2}
      >
        <ImageOverlay
          url={baroviaMap}
          bounds={[
            [3325, 5025],
            [0, 0],
          ]}
          opacity={1}
          zIndex={10}
        />
        {markerComponents}
        <EventComponent />
      </MapContainer>
    </div>
  );
};

export default App;

const EventComponent = () => {
  const map = useMapEvents({
    click: (e) => {
      console.log(e.latlng);
    },
  });
  return null;
};
