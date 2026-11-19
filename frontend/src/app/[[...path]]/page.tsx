"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import ExplorerError from "@/components/sections/explorer/ExplorerError";
import ExplorerView from "@/components/sections/explorer/ExplorerView";
import { useExplorer } from "@/utils/hooks/useExplorer";
import { getSegments } from "@/utils/path";

function ExplorerPage() {
  const pathname = usePathname();
  const state = useExplorer(pathname);
  const currentPath = getSegments(pathname).join("/");

  switch (state.status) {
    case "loading":
      return <p className="p-4">Loading files and folders...</p>;

    case "error":
      return <ExplorerError message={state.message} path={currentPath} />;

    case "success":
      return <ExplorerView data={state.data} currentPath={currentPath} />;
  }
}

export default function Page() {
  return (
    <Suspense fallback={<p className="p-4">Loading...</p>}>
      <ExplorerPage />
    </Suspense>
  );
}