import * as SQLite from "expo-sqlite";

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
    return await SQLite.openDatabaseAsync("markers.db");
}


export const initDatabase = async () => {
    const db = await getDatabase();
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS markers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP

            );

            CREATE TABLE IF NOT EXISTS marker_images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                marker_id INTEGER NOT NULL,
                uri TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (marker_id) REFERENCES markers (id) ON DELETE CASCADE
            );
        `);
        console.log("Database initialized");
    } catch (error) {
        console.error('Database not initialized:', error);
    }
}