import { Marker } from "@/app/models/point";
import { createContext } from "react";

export const MarkersContext = createContext<Marker[]>([]);
