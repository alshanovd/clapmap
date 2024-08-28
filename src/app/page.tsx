"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

import { Button, Input, Snackbar } from "@mui/material";
import { initBackButton, initMainButton } from "@telegram-apps/sdk-react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { MapPayload } from "./models/point";
import CheckIn from "@/components/CheckIn/CheckIn";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const checkInFetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location: {
        latitude: 0,
        longitude: 0,
      },
    }),
  });

  return response.json();
};

export default function Home() {
  const [mainButton] = initMainButton();
  const [bb] = initBackButton();
  const { data, error, isLoading } = useSWR<MapPayload>(
    "https://api.clapmap.com/api/v1/location",
    fetcher,
  );
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [defaultPosition, setDefaultPosition] = useState({ lat: 0, lng: 0 });
  const [showNoGeoAccess, setShowNoGeoAccess] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        console.log(position, "position");
        setDefaultPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error, "error");
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
  }, []);

  return (
    <APIProvider apiKey={"AIzaSyC_B70hcVabYizy0cj5jkSSSwChYOE3pMs"}>
      <div className="grid h-screen w-screen grid-rows-[1fr_auto]">
        <div className="absolute top-5 z-50 flex w-full items-center justify-center">
          <Input
            className="w-11/12 rounded-xl border-none bg-stone-50 px-2 py-2 before:hidden after:hidden"
            startAdornment={<IoIosSearch size="30px" className="ml-2 mr-2" />}
            placeholder="Search"
          />
        </div>
        <Map
          defaultCenter={defaultPosition}
          defaultZoom={10}
          mapId="DEMO_MAP_ID"
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={true}
          scaleControl={true}
        >
          <div className="absolute left-1/2 top-1/2 z-50 rounded-full rounded-tl-none bg-blue-300 px-2 py-2 text-3xl shadow-lg">
            👏
          </div>
          {data &&
            data.payload.map((point) => (
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

        <div className="my-5 flex w-full justify-center px-5">
          <CheckIn />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showNoGeoAccess}
          message="No Geo Access"
        />
      </div>
    </APIProvider>
  );
}
