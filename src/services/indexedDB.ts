import { openDB } from "idb";

const DB_NAME = "onboarding-db";
const STORE_NAME = "files";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

// Save file
export const saveFile = async (id: string, file: File) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, file, id);
};

// Get file
export const getFile = async (id: string) => {
  const db = await dbPromise;
  return db.get(STORE_NAME, id);
};

// Delete file
export const deleteFile = async (id: string) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
};
