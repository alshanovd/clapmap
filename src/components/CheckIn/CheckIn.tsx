import { Marker, MarkerPayload } from "@/app/models/point";
import { InitDataContext } from "@/contexts/InitData";
import Button from "@mui/material/Button";
import { useMap } from "@vis.gl/react-google-maps";
import axios from "axios";
import React, { useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const checkInRequest = async (
  initData: string,
  { lat, lng }: google.maps.LatLng,
) => {
  return axios
    .post<MarkerPayload>(
      "https://api.clapmap.com/api/v1/location",
      {
        latitude: lat(),
        longitude: lng(),
      },
      {
        headers: { Authorization: initData },
      },
    )
    .then((res) => res.data.payload);
};

export default function CheckIn({
  setMarkers,
  setCursorLoading,
}: {
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
  setCursorLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const map = useMap("DEMO_MAP_ID");
  const initData = useContext(InitDataContext);
  const checkIn = async () => {
    if (!initData) return;
    setCursorLoading(true);
    const newMarker = await checkInRequest(initData, map?.getCenter()!);
    setMarkers((markers) => [...markers, newMarker]);
    setCursorLoading(false);
  };

  return (
    initData && (
      <Button
        variant="contained"
        size="large"
        startIcon={<FaMapMarkerAlt />}
        fullWidth={true}
        onClick={() => map && checkIn()}
        autoFocus
      >
        Check-in
      </Button>
    )
  );
}
