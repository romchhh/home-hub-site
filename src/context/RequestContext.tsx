"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Dictionary } from "@/dictionaries";
import { RequestDialog } from "@/components/RequestDialog";
import {
  normalizeRequestOpen,
  type RequestOpenOptions,
} from "@/lib/requestOpen";

type RequestContextValue = {
  openRequest: (input?: string | RequestOpenOptions) => void;
};

const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({
  children,
  dict,
}: {
  children: ReactNode;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(() => normalizeRequestOpen());

  const openRequest = useCallback((input?: string | RequestOpenOptions) => {
    setOptions(normalizeRequestOpen(input));
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openRequest }), [openRequest]);

  return (
    <RequestContext.Provider value={value}>
      {children}
      <RequestDialog
        dict={dict}
        open={open}
        options={options}
        onClose={() => setOpen(false)}
      />
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const ctx = useContext(RequestContext);
  if (!ctx) {
    throw new Error("useRequest must be used within RequestProvider");
  }
  return ctx;
}
