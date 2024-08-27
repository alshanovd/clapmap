"use client";

import { FaMapMarkerAlt } from "react-icons/fa";

import { Button } from "@mui/material";
import { initBackButton, initMainButton } from "@telegram-apps/sdk-react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import useSWR from "swr";
import { MapPayload } from "./models/point";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const [mainButton] = initMainButton();
  const [bb] = initBackButton();
  const { data, error, isLoading } = useSWR<MapPayload>(
    "https://api.clapmap.com/api/v1/location",
    fetcher
  );

  useEffect(() => {
    bb.hide();
    console.log(data, "data");
  }, [bb, data]);

  const defaultProps = {
    center: {
      lat: 34.691977839110464,
      lng: 33.03920539753004,
    },
    zoom: 8,
  };

  return (
    <APIProvider apiKey={"AIzaSyC_B70hcVabYizy0cj5jkSSSwChYOE3pMs"}>
      <div className="h-screen grid grid-rows-[1fr_auto] w-screen">
        <Map
          defaultCenter={defaultProps.center}
          defaultZoom={10}
          mapId="DEMO_MAP_ID"
          className="focus:outline-none"
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={true}
          scaleControl={true}
        >
          {data &&
            data.payload.map((point) => (
              <AdvancedMarker
                key={point.id}
                position={{
                  lat: point.coordinate.latitude,
                  lng: point.coordinate.longitude,
                }}
              />
            ))}
        </Map>

        <div className="w-full px-5 my-5 flex justify-center">
          <Button
            variant="contained"
            onClick={() => mainButton.show()}
            size="large"
            startIcon={<FaMapMarkerAlt />}
            fullWidth={true}
            href="/newclap"
            autoFocus
          >
            Check-in
          </Button>
        </div>
      </div>
    </APIProvider>
  );
}
