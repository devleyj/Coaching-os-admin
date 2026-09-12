// app/data/store.ts

"use client";

export const APP_STORE_KEY = "coaching-os-app-store";
export const APP_STORE_EVENT = "coaching-os-app-store-updated";

export type StoreCollection =
  | "students"
  | "teachers"
  | "staff"
  | "courses"
  | "batches"
  | "fees"
  | "inquiries"
  | "attendance"
  | "exams"
  | "schedule"
  | "onlineClasses"
  | "notifications";

export type AppStoreData = Record<StoreCollection, unknown[]>;

const emptyStore: AppStoreData = {
  students: [],
  teachers: [],
  staff: [],
  courses: [],
  batches: [],
  fees: [],
  inquiries: [],
  attendance: [],
  exams: [],
  schedule: [],
  onlineClasses: [],
  notifications: [],
};

function isBrowser() {
  return typeof window !== "undefined";
}

function emitStoreUpdate() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(APP_STORE_EVENT));
}

export function readAppStore(): AppStoreData {
  if (!isBrowser()) return emptyStore;

  try {
    const raw = window.localStorage.getItem(APP_STORE_KEY);
    if (!raw) return emptyStore;

    const parsed = JSON.parse(raw) as Partial<AppStoreData>;

    return {
      ...emptyStore,
      ...parsed,
    };
  } catch {
    return emptyStore;
  }
}

export function writeAppStore(data: AppStoreData) {
  if (!isBrowser()) return;

  window.localStorage.setItem(APP_STORE_KEY, JSON.stringify(data));
  emitStoreUpdate();
}

export function getCollection<T>(
  collection: StoreCollection,
): T[] {
  return readAppStore()[collection] as T[];
}

export function setCollection<T>(
  collection: StoreCollection,
  records: T[],
) {
  const store = readAppStore();

  writeAppStore({
    ...store,
    [collection]: records,
  });
}

export function addRecord<T extends Record<string, unknown>>(
  collection: StoreCollection,
  record: T,
): T {
  const records = getCollection<T>(collection);

  setCollection(collection, [...records, record]);

  return record;
}

export function updateRecord<T extends Record<string, unknown>>(
  collection: StoreCollection,
  id: string,
  updates: Partial<T>,
): T | null {
  const records = getCollection<T>(collection);

  let updatedRecord: T | null = null;

  const nextRecords = records.map((record) => {
    if (String(record.id) !== String(id)) {
      return record;
    }

    updatedRecord = {
      ...record,
      ...updates,
    };

    return updatedRecord;
  });

  if (!updatedRecord) return null;

  setCollection(collection, nextRecords);

  return updatedRecord;
}

export function removeRecord<T extends Record<string, unknown>>(
  collection: StoreCollection,
  id: string,
) {
  const records = getCollection<T>(collection);

  setCollection(
    collection,
    records.filter(
      (record) => String(record.id) !== String(id),
    ),
  );
}

export function findRecord<T extends Record<string, unknown>>(
  collection: StoreCollection,
  id: string,
): T | undefined {
  return getCollection<T>(collection).find(
    (record) => String(record.id) === String(id),
  );
}

export function replaceOrAddRecord<T extends Record<string, unknown>>(
  collection: StoreCollection,
  record: T,
): T {
  const records = getCollection<T>(collection);

  const exists = records.some(
    (item) => String(item.id) === String(record.id),
  );

  const nextRecords = exists
    ? records.map((item) =>
        String(item.id) === String(record.id)
          ? record
          : item,
      )
    : [...records, record];

  setCollection(collection, nextRecords);

  return record;
}

export function clearAppStore() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(APP_STORE_KEY);
  emitStoreUpdate();
}

export function subscribeToStore(
  callback: () => void,
) {
  if (!isBrowser()) {
    return () => {};
  }

  const handleUpdate = () => callback();

  window.addEventListener(APP_STORE_EVENT, handleUpdate);
  window.addEventListener("storage", handleUpdate);

  return () => {
    window.removeEventListener(APP_STORE_EVENT, handleUpdate);
    window.removeEventListener("storage", handleUpdate);
  };
}
