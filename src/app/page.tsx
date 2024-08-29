"use client";

import CheckIn from "@/components/CheckIn/CheckIn";
import OurMap from "@/components/OurMap/OurMap";
import { InitDataContext } from "@/contexts/InitData";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { APIProvider } from "@vis.gl/react-google-maps";
import { API_URL, MAP_KEY } from "./constants/api";
import { MarkersContext } from "@/contexts/Markers";
import { useEffect, useState } from "react";
import { Marker, MarkersPayload } from "./models/point";
import axios from "axios";

export default function Home() {
  const { initDataRaw } = retrieveLaunchParams();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [cursorLoading, setCursorLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get<MarkersPayload>(API_URL, {
        headers: { Authorization: initDataRaw },
      });
      setMarkers(result.data.payload);
    }
    fetchData();
  }, [initDataRaw]);

  return (
    <APIProvider apiKey={MAP_KEY}>
      <InitDataContext.Provider value={initDataRaw}>
        <MarkersContext.Provider value={markers || []}>
          <div className="grid h-screen w-screen grid-rows-[1fr_auto]">
            {/* <div className="absolute top-5 z-50 flex w-full items-center justify-center">
            <Search />
          </div> */}
            <OurMap cursorLoading={cursorLoading} />
            <div className="my-5 flex w-full justify-center px-5">
              <CheckIn
                setCursorLoading={setCursorLoading}
                setMarkers={setMarkers}
              />
            </div>
          </div>
        </MarkersContext.Provider>
      </InitDataContext.Provider>
    </APIProvider>
  );
}
