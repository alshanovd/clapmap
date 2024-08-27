export interface Point {
    id: string;
    coordinate: Coordinates;
}

export interface Coordinates {
    longitude: number;
    latitude: number;
}

export interface MapPayload {
    error: any;
    payload: Point[];
}
