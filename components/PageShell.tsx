"use client";

import { Close } from "@/components/Close";
import { LinkRows } from "@/components/LinkRows";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { PortalHero } from "@/components/PortalHero";
import { Statement } from "@/components/Statement";
import { useCallback, useState } from "react";

export function PageShell() {
  const [loaderDone, setLoaderDone] = useState(false);
  const onLoaderComplete = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      <Loader onComplete={onLoaderComplete} />
      <Nav />
      <main id="main-content" aria-busy={!loaderDone}>
        <PortalHero />
        <Statement />
        <LinkRows />
        <Close />
      </main>
    </>
  );
}
