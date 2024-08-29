import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import { FaMapMarkerAlt } from "react-icons/fa";

import { MarkersContext } from "@/contexts/Markers";
import { Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@telegram-apps/telegram-ui";

export default function OurMap({ cursorLoading }: { cursorLoading: boolean }) {
  const map = useMap("DEMO_MAP_ID");
  const [defaultPosition, setDefaultPosition] = useState({ lat: 0, lng: 0 });
  const [showNoGeoAccess, setShowNoGeoAccess] = useState(false);
  const makers = useContext(MarkersContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setDefaultPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        setShowNoGeoAccess(true);
        setTimeout(() => {
          setShowNoGeoAccess(false);
        }, 10000);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, [map]);

  useEffect(() => {
    map?.setCenter(defaultPosition);
  }, [defaultPosition, map]);

  return (
    <>
      <Map
        defaultCenter={defaultPosition}
        defaultZoom={10}
        id="DEMO_MAP_ID"
        mapId={"b1b1b1b1b1b1b1b1"}
        mapTypeControl={false}
        streetViewControl={false}
        zoomControl={true}
        scaleControl={true}
        disableDefaultUI={true}
        gestureHandling={"greedy"}
      >
        <div className="absolute left-1/2 top-1/2 z-50 rounded-full rounded-tl-none bg-blue-100 px-2 py-2 text-3xl shadow-lg">
          {cursorLoading ? <Spinner size="m" /> : "👏"}
        </div>
        {makers.map((point) => (
          <AdvancedMarker
            key={point.id}
            position={{
              lat: point.coordinate.latitude,
              lng: point.coordinate.longitude,
            }}
          >
            <FaMapMarkerAlt color="red" size="30px" />
          </AdvancedMarker>
        ))}
      </Map>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showNoGeoAccess}
        message="No Geo Access"
      />
    </>
  );
}
