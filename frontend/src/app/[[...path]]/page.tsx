"use client";

import ExplorerError from "@/components/sections/explorer/ExplorerError";
import ExplorerView from "@/components/sections/explorer/ExplorerView";
import { useExplorerContext } from "@/components/providers/ExplorerProvider";

export default function Page() {
  const { state, currentPath } = useExplorerContext();

  switch (state.status) {
    case "loading":
      return <p className="p-4">Loading files and folders...</p>;
    case "error":
      return <ExplorerError message={state.message} path={currentPath} />;
    case "success":
      return <ExplorerView data={state.data} currentPath={currentPath} />;
  }
}