import { Button } from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function CheckIn() {
  const map = useMap("DEMO_MAP_ID");

  useEffect(() => {
    // bb.hide();
    // console.log(data, "data");
    console.log(map?.getCenter(), "map?.getCenter()");
  }, [map]);

  const checkIn = async () => {
    console.log(map?.getCenter(), "map?.getCenter()");
  };

  return (
    <Button
      variant="contained"
      size="large"
      startIcon={<FaMapMarkerAlt />}
      fullWidth={true}
      onClick={() => checkIn()}
      autoFocus
    >
      Check-in
    </Button>
  );
}
