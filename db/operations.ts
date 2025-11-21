import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import { Marker } from "../types";


export const getMarkers = async (db: SQLite.SQLiteDatabase): Promise<Marker[]> => {
  try {
    return await db.getAllAsync("SELECT * FROM markers");
  } catch (error) {
    console.error("Ошибка при получении маркеров:", error);
    Alert.alert("Ошибка", "Не удалось получить маркеры");
    return [];
  }
};

export const addMarker = async (db: SQLite.SQLiteDatabase, marker: Marker) => {
  try {
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
  } catch (error) {
    console.error("Ошибка при добавлении маркера:", error);
    Alert.alert("Ошибка", "Не удалось добавить маркер");
  }
};

export const updateMarker = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  title: string | null,
  description: string | null
) => {
  try {
    await db.runAsync(
      `UPDATE markers SET title = ?, description = ? WHERE id = ?`,
      [title, description, id]
    );
  } catch (error) {
    console.error("Ошибка при обновлении маркера:", error);
    Alert.alert("Ошибка", "Не удалось обновить маркер");
  }
};

export const deleteMarker = async (db: SQLite.SQLiteDatabase, id: number) => {
  try {
    await db.runAsync("DELETE FROM markers WHERE id = ?", [id]);
  } catch (error) {
    console.error("Ошибка при удалении маркера:", error);
    Alert.alert("Ошибка", "Не удалось удалить маркер");
  }
};

export const getImages = async (db: SQLite.SQLiteDatabase, marker_id: number) => {
  try {
    return await db.getAllAsync("SELECT * FROM marker_images WHERE marker_id = ?", [
      marker_id,
    ]);
  } catch (error) {
    console.error("Ошибка при получении изображений:", error);
    Alert.alert("Ошибка", "Не удалось получить изображения");
    return [];
  }
};

export const addImage = async (
  db: SQLite.SQLiteDatabase,
  marker_id: number,
  uri: string
) => {
  try {
    await db.runAsync("INSERT INTO marker_images (marker_id, uri) VALUES (?, ?)", [
      marker_id,
      uri,
    ]);
  } catch (error) {
    console.error("Ошибка при добавлении изображения:", error);
    Alert.alert("Ошибка", "Не удалось добавить изображение");
  }
};

export const deleteImage = async (db: SQLite.SQLiteDatabase, id: number) => {
  try {
    await db.runAsync("DELETE FROM marker_images WHERE id = ?", [id]);
  } catch (error) {
    console.error("Ошибка при удалении изображения:", error);
    Alert.alert("Ошибка", "Не удалось удалить изображение");
  }
};