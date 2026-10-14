"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  readSavedModels,
  writeSavedModels,
  type SavedModelItem,
} from "@/lib/savedItemsStorage";

type SavedItemsContextValue = {
  items: SavedModelItem[];
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string, colorHex?: string) => void;
  removeSaved: (slug: string) => void;
  clearSaved: () => void;
};

const SavedItemsContext = createContext<SavedItemsContextValue | null>(null);

const EMPTY: SavedModelItem[] = [];
let cachedItems: SavedModelItem[] = EMPTY;
let cachedRaw: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function getClientSnapshot(): SavedModelItem[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem("homehub-saved-models");
  if (raw === cachedRaw) return cachedItems;
  cachedRaw = raw;
  cachedItems = readSavedModels();
  return cachedItems;
}

function getServerSnapshot(): SavedModelItem[] {
  return EMPTY;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === "homehub-saved-models" || e.key === null) {
      cachedRaw = null;
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function commitItems(next: SavedModelItem[]) {
  writeSavedModels(next);
  cachedRaw = JSON.stringify(next);
  cachedItems = next;
  emit();
}

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const isSaved = useCallback(
    (slug: string) => items.some((item) => item.slug === slug),
    [items],
  );

  const toggleSaved = useCallback((slug: string, colorHex?: string) => {
    const prev = getClientSnapshot();
    const existing = prev.find((item) => item.slug === slug);
    const next = existing
      ? prev.filter((item) => item.slug !== slug)
      : [{ slug, colorHex, addedAt: Date.now() }, ...prev];
    commitItems(next);
  }, []);

  const removeSaved = useCallback((slug: string) => {
    commitItems(getClientSnapshot().filter((item) => item.slug !== slug));
  }, []);

  const clearSaved = useCallback(() => commitItems([]), []);

  const value = useMemo(
    () => ({ items, isSaved, toggleSaved, removeSaved, clearSaved }),
    [items, isSaved, toggleSaved, removeSaved, clearSaved],
  );

  return <SavedItemsContext.Provider value={value}>{children}</SavedItemsContext.Provider>;
}

export function useSavedItems() {
  const ctx = useContext(SavedItemsContext);
  if (!ctx) {
    throw new Error("useSavedItems must be used within SavedItemsProvider");
  }
  return ctx;
}
