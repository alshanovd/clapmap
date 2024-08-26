"use client";

import { FaMapMarkerAlt } from "react-icons/fa";

import { Button } from "@mui/material";
import { initBackButton, initMainButton } from "@telegram-apps/sdk-react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export default function Home() {
  const [mainButton] = initMainButton();
  const [bb] = initBackButton();

  useEffect(() => {
    bb.hide();
  }, [bb]);

  return (
    <APIProvider apiKey="AIzaSyC_B70hcVabYizy0cj5jkSSSwChYOE3pMs">
      <Map
        style={{ width: "100vw", height: "80vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />

      <div className="w-full px-5 mt-5 flex justify-center">
        <Button
          variant="contained"
          onClick={() => mainButton.show()}
          size="large"
          startIcon={<FaMapMarkerAlt />}
          fullWidth={true}
          href="/newclap"
        >
          New Clap
        </Button>
      </div>
    </APIProvider>
  );
}
