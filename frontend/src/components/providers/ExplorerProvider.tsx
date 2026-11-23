"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { useExplorer, type ExplorerState } from "@/utils/hooks/useExplorer";
import { getSegments } from "@/utils/path";

type ExplorerContextValue = {
  state: ExplorerState;
  currentPath: string;            // "programming/c/types"
  currentFolderId: number | null; // null = root (or not loaded yet, see isReady)
  isReady: boolean;               // true once the current folder has loaded
  refresh: () => void;            // refetch after creating/editing/deleting
};

const ExplorerContext = createContext<ExplorerContextValue | null>(null);

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { state, refresh } = useExplorer(pathname);

  const value: ExplorerContextValue = {
    state,
    refresh,
    currentPath: getSegments(pathname).join("/"),
    isReady: state.status === "success",
    // data.parentId is the folder being viewed. Verify this against your backend.
    currentFolderId: state.status === "success" ? state.data.parentId : null,
  };

  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
}

export function useExplorerContext() {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error("useExplorerContext must be used inside <ExplorerProvider>");
  }
  return context;
}