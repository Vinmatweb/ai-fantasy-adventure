"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ExplorerShell } from "../../components/ExplorerShell";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { englishToCzechPath } from "../../language-routes";

export default function EnglishExplorerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/en/explorer";
  const [hash, setHash] = useState("");
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);
  return (
    <>
      <SiteHeader locale="en" languageHref={englishToCzechPath(pathname, hash)} />
      <ExplorerShell locale="en" currentPath={pathname}>{children}</ExplorerShell>
      <SiteFooter locale="en" />
    </>
  );
}
