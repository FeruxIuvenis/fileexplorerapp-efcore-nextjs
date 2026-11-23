"use client";

import { useEffect, useRef, useState } from "react";

import { fetchExplorer } from "@/utils/api/explorer"; // keep whatever import you already have
import { getSegments } from "@/utils/path";
import type { ExplorerResponse } from "@/utils/types";

export type ExplorerState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: ExplorerResponse };

export function useExplorer(pathname: string) {
  const [state, setState] = useState<ExplorerState>({ status: "loading" });
  const [reloadKey, setReloadKey] = useState(0);
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    // Show "loading" only when the folder changes; on refresh keep the old data visible
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      setState({ status: "loading" });
    }

    fetchExplorer(getSegments(pathname), controller.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "An unexpected error occurred.",
        });
      });

    return () => controller.abort();
  }, [pathname, reloadKey]);

  const refresh = () => setReloadKey((k) => k + 1);

  return { state, refresh };
}