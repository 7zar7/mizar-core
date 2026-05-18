import { SiteProvider } from "@/components/SiteProvider";
import { LaserSystem } from "@/components/LaserSystem";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Manifesto } from "@/components/screens/Manifesto";
import { Signal } from "@/components/screens/Signal";
import { Evidence } from "@/components/screens/Evidence";
import { Configurator } from "@/components/screens/Configurator";
import { Close } from "@/components/screens/Close";

export default function Home() {
  return (
    <SiteProvider>
      <span id="top" />
      <Cursor />
      <Nav />
      <LaserSystem />
      <main className="relative">
        <Manifesto />
        <Signal />
        <Evidence />
        <Configurator />
        <Close />
      </main>
      <Footer />
    </SiteProvider>
  );
}
