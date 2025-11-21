import * as SQLite from 'expo-sqlite';

export interface UserMarker {
    id: string;
    coordinate: {
        latitude: number;
        longitude: number;
    }
    title?: string;
    description?: string;
    images: string[];
}

export interface MarkerImage {
  id: number;
  uri: string;
}

export interface DatabaseContextType {
    markers: Marker[];
    database: SQLite.SQLiteDatabase | null;
    isLoading: boolean;
    error: string | null;
    addMarker: (marker: Marker) => Promise<void>;
    getMarkers: () => Promise<Marker[]>;
    updateMarker: (id: number, title: string | null, description: string | null) => Promise<void>;
    deleteMarker: (id: number) => Promise<void>;
    reloadMarkers: () => Promise<void>;
    getImages: (marker_id: number) => Promise<MarkerImage[]>;
    addImage: (marker_id: number, uri: string) => Promise<void>;
    deleteImage: (id: number) => Promise<void>;
}

export type Marker = {
    id?: number;
    title?: string;
    description?: string;
    latitude: number;
    longitude: number;
    created_at?: string;
}

export type Image = {
    id?: number;
    marker_id: number;
    uri: string;
    created_at?: string;
}