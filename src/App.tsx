import { useCallback, useState } from "react";
import QuantumField from "./components/QuantumField";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import QuantumNodes from "./components/QuantumNodes";
import BlueprintDeck from "./components/BlueprintDeck";
import ReactorBay from "./components/ReactorBay";
import Network from "./components/Network";
import Contact from "./components/Contact";
import AIOrb from "./components/AIOrb";
import { useReveal, useScrollProgress } from "./hooks/useReveal";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [request, setRequest] = useState<string | null>(null);
  useReveal();
  useScrollProgress(useCallback((p: number) => setProgress(p), []));

  return (
    <div className="relative min-h-screen">
      <QuantumField />
      <Nav progress={progress} />
      <main>
        <Hero />
        <QuantumNodes onSelect={setRequest} />
        <BlueprintDeck />
        <ReactorBay />
        <Network />
        <Contact />
      </main>
      <AIOrb request={request} clearRequest={() => setRequest(null)} />
    </div>
  );
}
