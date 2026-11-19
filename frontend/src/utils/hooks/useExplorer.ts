"use client";

import { useEffect, useState } from "react";

import { fetchExplorer } from "@/utils/api/explorer";
import { getSegments } from "@/utils/path";
import type { ExplorerResponse } from "@/utils/types";

export type ExplorerState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: ExplorerResponse };

export function useExplorer(pathname: string): ExplorerState {
  const [state, setState] = useState<ExplorerState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    setState({ status: "loading" });

    fetchExplorer(getSegments(pathname), controller.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;

        setState({
          status: "error",
          message:
            err instanceof Error ? err.message : "An unexpected error occurred.",
        });
      });

    return () => controller.abort();
  }, [pathname]);

  return state;
}