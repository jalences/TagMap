import * as SQLite from "expo-sqlite";
import { Marker } from "../types";


export const getMarkers = async (db: SQLite.SQLiteDatabase): Promise<Marker[]> => {
  return await db.getAllAsync("SELECT * FROM markers");
};

export const addMarker = async (db: SQLite.SQLiteDatabase, marker: Marker) => {
  await db.runAsync(
    `INSERT INTO markers (latitude, longitude, title, description)
     VALUES (?, ?, ?, ?)`,
    [
      marker.latitude,
      marker.longitude,
      marker.title ?? null,
      marker.description ?? null,
    ]
  );
};

export const updateMarker = async (db: SQLite.SQLiteDatabase, id: number, title: string | null, description: string | null) => {
  await db.runAsync(
    `UPDATE markers SET title = ?, description = ? WHERE id = ?`,
    [title, description, id]
  );
};

export const deleteMarker = async (db: SQLite.SQLiteDatabase, id: number) => {
  await db.runAsync("DELETE FROM markers WHERE id = ?", [id]);
};

export const getImages = async (db: SQLite.SQLiteDatabase, marker_id: number) => {
  return await db.getAllAsync("SELECT * FROM marker_images WHERE marker_id = ?", [
    marker_id,
  ]);
};

export const addImage = async (
  db: SQLite.SQLiteDatabase,
  marker_id: number,
  uri: string
) => {
  await db.runAsync("INSERT INTO marker_images (marker_id, uri) VALUES (?, ?)", [
    marker_id,
    uri,
  ]);
};

export const deleteImage = async (db: SQLite.SQLiteDatabase, id: number) => {
  await db.runAsync("DELETE FROM marker_images WHERE id = ?", [id]);
};

