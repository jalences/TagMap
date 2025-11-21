import { getDatabase, initDatabase } from '@/db/schema';
import { DatabaseContextType } from '@/types';
import * as SQLite from 'expo-sqlite';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  addImage as dbAddImage,
  addMarker as dbAddMarker,
  deleteImage as dbDeleteImage,
  deleteMarker as dbDeleteMarker,
  getImages as dbGetImages,
  getMarkers as dbGetMarkers,
  updateMarker as dbUpdateMarker
} from "../db/operations";
import { Marker, Image as MarkerImage } from "../types";

const DatabaseContext = createContext<DatabaseContextType | null>(null);



export const useDatabase = (): DatabaseContextType => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
}

interface DatabaseProviderProps {
    children: ReactNode
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
  const initializeDatabase = async () => {
    try {
      const db = await getDatabase();
      await initDatabase(); 
      setDb(db);
      setIsLoading(false);
    } catch (err: any) {
      setError(err?.message ?? "Failed to initialize database");
      setIsLoading(false);
    }
  };

  initializeDatabase();
}, []);

  useEffect(() => {
    if (!isLoading && db) {
      reloadMarkers(); 
    }
  }, [isLoading, db]);

    const addMarker = async (marker: Marker) => {
      if (!db) return;
        await dbAddMarker(db, marker);
        await reloadMarkers();
      };

    const getMarkers = async () => {
      if (!db) return [];
        return await dbGetMarkers(db);
      };
    const updateMarker = async (id: number, title: string | null, description: string | null) => {
      if (!db) return;
        await dbUpdateMarker(db, id, title, description);
        await reloadMarkers();
      };
    const deleteMarker = async (id: number) => {
      if (!db) return;
        await dbDeleteMarker(db, id);
        await reloadMarkers();
      };
    
    const reloadMarkers = async () => {
      if (!db) return;
      const dbMarkers = await dbGetMarkers(db);
      setMarkers(dbMarkers);
    };

  const getImages = async (marker_id: number): Promise<MarkerImage[]> => {
  if (!db) return [];
  const dbImages = await dbGetImages(db, marker_id); 
  return dbImages as MarkerImage[]; 
};

  const addImage = async (marker_id: number, uri: string) => {
    if (!db) return;
    await dbAddImage(db, marker_id, uri);
  };

  const deleteImage = async (id: number) => {
    if (!db) return;
    await dbDeleteImage(db, id);
  };


   const contextValue: DatabaseContextType = {
    database: db,
    isLoading,
    markers,
    error,
    updateMarker,
    addMarker,
    getMarkers,
    deleteMarker,
    reloadMarkers,
    getImages,
    addImage,
    deleteImage
    
  };
  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};
