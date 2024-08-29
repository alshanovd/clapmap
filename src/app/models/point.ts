export interface Marker {
    id: string;
    coordinate: Coordinates;
}

export interface Coordinates {
    longitude: number;
    latitude: number;
}

export interface MarkersPayload {
    error: any;
    payload: Marker[];
}

export interface MarkerPayload {
    error: any;
    payload: Marker;
}